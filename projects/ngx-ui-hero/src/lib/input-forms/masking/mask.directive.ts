import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, PipeTransform } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { KEYS, MaskHelper } from './mask-helper';
import { isIE } from './utils';

const noop = () => { };

@Directive({
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: MaskDirective, multi: true }],
    selector: '[mask]'
})
export class MaskDirective implements OnInit, ControlValueAccessor {
    @Input('mask')
    public mask: string;

    @Input()
    public promptChar: string;

    @Input()
    public includeLiterals: boolean;

    @Input()
    public set placeholder(val: string) {
        this._placeholder = val;
        this.nativeElement.setAttribute('placeholder', this._placeholder);
    }

    public get placeholder(): string {
        return this._placeholder;
    }

    @Input()
    public displayValuePipe: PipeTransform;

    @Input()
    public focusedValuePipe: PipeTransform;

    @Input()
    private dataValue: string;

    @Output()
    public onValueChange = new EventEmitter<IMaskEventArgs>();

    private get value() {
        return this.nativeElement.value;
    }

    private set value(val) {
        this.nativeElement.value = val;
    }

    private get nativeElement() {
        return this.elementRef.nativeElement;
    }

    private get selectionStart() {
        return this.nativeElement.selectionStart;
    }

    private get selectionEnd() {
        return this.nativeElement.selectionEnd;
    }

    private _ctrlDown: boolean;

    private _paste: boolean;

    private _selection: number;

    private _placeholder: string;

    private _maskOptions = {
        format: '',
        promptChar: ''
    };

    private _key;

    private _cursorOnPaste;

    private _valOnPaste;

    private _stopPropagation: boolean;

    private maskHelper: MaskHelper;

    private _onTouchedCallback: () => void = noop;

    private _onChangeCallback: (_: any) => void = noop;

    constructor(private elementRef: ElementRef) {
        this.maskHelper = new MaskHelper();
    }

    public ngOnInit(): void {
        if (this.promptChar && this.promptChar.length > 1) {
            this._maskOptions.promptChar = this.promptChar = this.promptChar.substring(0, 1);
        }

        this._maskOptions.format = this.mask ? this.mask : 'CCCCCCCCCC';
        this._maskOptions.promptChar = this.promptChar ? this.promptChar : '_';
        this.nativeElement.setAttribute('placeholder', this.placeholder ? this.placeholder : this._maskOptions.format);
    }

    @HostListener('keydown', ['$event'])
    public onKeydown(event): void {
        const key = event.keyCode || event.charCode;

        if (isIE() && this._stopPropagation) {
            this._stopPropagation = false;
        }

        if (key === KEYS.Ctrl) {
            this._ctrlDown = true;
        }

        if ((this._ctrlDown && key === KEYS.Z) || (this._ctrlDown && key === KEYS.Y)) {
            event.preventDefault();
        }

        this._key = key;
        this._selection = Math.abs(this.selectionEnd - this.selectionStart);
    }

    @HostListener('keyup', ['$event'])
    public onKeyup(event): void {
        const key = event.keyCode || event.charCode;

        if (key === KEYS.Ctrl) {
            this._ctrlDown = false;
        }
    }

    @HostListener('paste', ['$event'])
    public onPaste(event): void {
        this._paste = true;

        this._valOnPaste = this.value;
        this._cursorOnPaste = this.getCursorPosition();
    }

    @HostListener('input', ['$event'])
    public onInputChanged(event): void {
        if (isIE() && this._stopPropagation) {
            this._stopPropagation = false;
            return;
        }

        if (this._paste) {
            this._paste = false;

            const clipboardData = this.value.substring(this._cursorOnPaste, this.getCursorPosition());
            this.value = this.maskHelper.parseValueByMaskUponCopyPaste(
                this._valOnPaste, this._maskOptions, this._cursorOnPaste, clipboardData, this._selection);

            this.setCursorPosition(this.maskHelper.cursor);
        } else {
            const currentCursorPos = this.getCursorPosition();

            this.maskHelper.data = (this._key === KEYS.BACKSPACE) || (this._key === KEYS.DELETE);

            this.value = this._selection && this._selection !== 0 ?
                this.maskHelper.parseValueByMaskUponSelection(this.value, this._maskOptions, currentCursorPos - 1, this._selection) :
                this.maskHelper.parseValueByMask(this.value, this._maskOptions, currentCursorPos - 1);

            this.setCursorPosition(this.maskHelper.cursor);
        }

        const rawVal = this.maskHelper.restoreValueFromMask(this.value, this._maskOptions);

        this.dataValue = this.includeLiterals ? this.value : rawVal;
        this._onChangeCallback(this.dataValue);

        this.onValueChange.emit({ rawValue: rawVal, formattedValue: this.value });
    }

    @HostListener('focus', ['$event.target.value'])
    public onFocus(value) {
        if (this.focusedValuePipe) {
            if (isIE()) {
                this._stopPropagation = true;
            }
            this.value = this.focusedValuePipe.transform(value);
        } else {
            this.value = this.maskHelper.parseValueByMaskOnInit(this.value, this._maskOptions);
        }
    }

    @HostListener('blur', ['$event.target.value'])
    public onBlur(value) {
        if (this.displayValuePipe) {
            this.value = this.displayValuePipe.transform(value);
        } else if (value === this.maskHelper.parseMask(this._maskOptions)) {
            this.value = '';
        }
    }

    private getCursorPosition(): number {
        return this.nativeElement.selectionStart;
    }

    private setCursorPosition(start: number, end: number = start): void {
        this.nativeElement.setSelectionRange(start, end);
    }

    public writeValue(value) {
        if (this.promptChar && this.promptChar.length > 1) {
            this._maskOptions.promptChar = this.promptChar.substring(0, 1);
        }

        this.value = value ? this.maskHelper.parseValueByMaskOnInit(value, this._maskOptions) : '';
        if (this.displayValuePipe) {
            this.value = this.displayValuePipe.transform(this.value);
        }

        this.dataValue = this.includeLiterals ? this.value : value;
        this._onChangeCallback(this.dataValue);

        this.onValueChange.emit({ rawValue: value, formattedValue: this.value });
    }

    public registerOnChange(fn: (_: any) => void) { this._onChangeCallback = fn; }

    public registerOnTouched(fn: () => void) { this._onTouchedCallback = fn; }
}

export interface IMaskEventArgs {
    rawValue: string;
    formattedValue: string;
}