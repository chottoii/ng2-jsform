import { OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsfService } from '../service/jsf.service';
export declare class JsfBaseComponent implements OnInit, OnDestroy {
    jsf: JsfService;
    widgets: {};
    debug: boolean;
    innerOption: any;
    parentGroup: FormGroup;
    page: any;
    schema: any;
    master: any;
    data: any;
    option: any;
    direction: string;
    dimension: number;
    index: number;
    num: number;
    shared: any;
    buttonClick: EventEmitter<any>;
    formErrors: {};
    parentService: any[];
    services: any[];
    constructor(jsf: JsfService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onValueChanged(event: any): void;
    focusOutFunction(key: any): void;
    /**
     * スキーマ構造化対応のためにベースを変更
     * 2017/12/30 スキーマ階層構造サポート
     */
    changeBase(): void;
}
