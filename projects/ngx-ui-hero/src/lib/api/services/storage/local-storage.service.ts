import { Inject, Injectable } from '@angular/core';

import { ApiSettings } from '../../api.settings';
import { API_SETTINGS } from '../../api.settings.constants';

declare var localStorage: any;

@Injectable()
export class LocalStorageService {
    private _prefix = 'uiHero_';

    constructor(
        @Inject(API_SETTINGS) public settings: ApiSettings,
    ) {
        if (this.settings.localStoragePrefix) {
            this._prefix = this.settings.localStoragePrefix
        }
    }

    Get(key: string): any {
        const result = localStorage.getItem(`${this._prefix}${key}`);

        if (typeof result === 'string') {
            return result;
        } else {
            return JSON.parse(result);
        }
    }
    Set(key: string, value: any): void {
        if (typeof value === 'string') {
            localStorage.setItem(`${this._prefix}${key}`, value);
        } else {
            localStorage.setItem(`${this._prefix}${key}`, JSON.stringify(value));
        }
    }
    Remove(key: string): void {
        localStorage.removeItem(`${this._prefix}${key}`);
    }
}
