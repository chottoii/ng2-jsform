import { OnInit, OnDestroy, ElementRef } from '@angular/core';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
export declare class Material2DateComponent extends JsfBaseComponent implements OnInit, OnDestroy {
    jsf: JsfService;
    dateUtcRef: ElementRef;
    idDimension: string;
    constructor(jsf: JsfService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onDateChange(d: any, option: any): void;
    /**
     * 日付をフォーマットする
     * この関数は使用しないことになった
     * @param  {Date}   date     日付
     * @param  {String} [format] フォーマット
     * @return {String}          フォーマット済み日付
     */
    formatDate(date: Date, format: string): string;
}
