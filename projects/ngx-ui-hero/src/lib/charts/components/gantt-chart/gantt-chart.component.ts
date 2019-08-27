import * as momentImported from 'moment';

import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';

import { ChartsConfig } from '../../config/charts-config';
import { CHARTS_CONFIG } from '../../config/charts-config.contants';
import { GanttInternalItemModel, GanttInternalSerieModel, GanttItemModel, GanttSerieModel } from './models/gantt-item.model';

declare var $: any;
const moment = momentImported;

let identifier = 0;

@Component({
  selector: 'gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss'],
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class GanttChartComponent implements OnInit {
  @Input('data') externalData: Array<GanttItemModel>;
  @Input() caption: string;
  @Input() maxHeight: number = 0;
  @Output() onSelect = new EventEmitter<any>();

  public identifier = `gantt-chart-${identifier++}`;  
  
  locale?: string = 'en-us';
  emptyMessage?: string = 'No results found at this moment.';
  internalData: Array<GanttInternalItemModel>;
  months: Array<string>;
  dayLabel: string;
  monthLabel: string;
  yearLabel: string;
  currentYear: number;
  currentMonth: number;
  colors: Array<string> = [
    '#8270fa', 
    '#4d5b66', 
    '#4fd1a1', 
    '#fe3cae', 
    '#ffca22', 
    '#ff9f41', 
    '#5aaaff', 
    '#498acb', 
    '#27cfc2', 
    '#ff6982', 
    '#f44336', 
    '#cddc39', 
    '#607d8b', 
    '#795548'];

  constructor(
    @Inject(CHARTS_CONFIG) @Optional() config: ChartsConfig,
  ) {
    Object.assign(this, config);
  }

  ngOnInit() {
    this.initData();
    this.initMonths();
    this.initTimelineSizes();
  }

  onResize(){
    this.handleTimelineSizes();
  }
  onSerieSelected(item: GanttInternalItemModel, serie: GanttInternalSerieModel): void {
    this.onSelect.emit({
      item,
      serie
    });
  }

  private initData(): void {
    if (!this.externalData || this.externalData.length == 0) return;
    this.internalData = new Array<GanttInternalItemModel>();

    for (let i = 0; i < this.externalData.length; i++) {
      let colorIndex = Math.round(Math.random() * (this.colors.length - 1));

      this.internalData.push({
        label: this.externalData[i].label,
        series: this.externalData[i].series.map(s => {
          return {
            color: s.color || this.colors[colorIndex],
            startDate: s.startDate,
            endDate: s.endDate,
            left: 0,
            width: 0,
            daysDiff: this.daysDiffFromSerie(s)
          };
        })
      });
    }
  }
  private daysDiffFromSerie(serie: GanttSerieModel): number {
    var start = moment(serie.startDate);
    var end = moment(serie.endDate);

    return end.diff(start, 'days') + 1;
  }
  private initMonths(): void {
    moment.locale(this.locale);
    let today = new Date();    
    
    this.dayLabel = moment.localeData().relativeTime(1, false, 'd', false).split(' ')[1];
    this.monthLabel = moment.localeData().relativeTime(1, false, 'M', false).split(' ')[1];
    this.yearLabel = moment.localeData().relativeTime(1, false, 'y', false).split(' ')[1];
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();    

    this.months = moment.monthsShort('-MMM-');
  }
  private initTimelineSizes(): void {
    setTimeout(() => {
      this.handleTimelineSizes();
    }, 0);
  }
  private handleTimelineSizes(): void {
    if (!this.internalData || this.internalData.length == 0) return;
    
    let monthWidth: number = $(`#${this.identifier} .gantt-timeline .timeline .item`).eq(0).children('.box').width();
    let dayWidth: number = monthWidth / 30;
    
    for (let i = 0; i < this.internalData.length; i++) {
      if (!this.internalData[i].series || this.internalData[i].series.length == 0) continue;

      for (let s = 0; s < this.internalData[i].series.length; s++) {
        let day = this.internalData[i].series[s].startDate.getDate();
        let month = this.internalData[i].series[s].startDate.getMonth();

        this.internalData[i].series[s].left = ((month - 1) * monthWidth) + ((day - 1) * dayWidth) + ((month - 1) * 2);
        this.internalData[i].series[s].width = this.internalData[i].series[s].daysDiff * dayWidth;
      }
    }
  }

}
