/**
 * 修正履歴
 *  2017/11/10 clearが効かない不具合に対応
 *  2017/11/25 refサポート
 *  2017/11/27 ngOnChangesの初期化手順による不具合対応
 *  2017/12/09 clear処理の自動化
 */
import { EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { I18nService } from './service/i18n.service';
import { JsfService } from './service/jsf.service';
export declare class AutoFormMainComponent implements OnInit, OnChanges {
    private i18n;
    private jsf;
    combine: any;
    debug: boolean;
    widgets: {};
    innerOption: any;
    page: any;
    schema: any;
    layout: any;
    master: any;
    data: {};
    message: any;
    onClick: EventEmitter<any>;
    group: any;
    form: FormGroup;
    first: boolean;
    formReady: boolean;
    widgetList: any;
    currentLayout: any;
    constructor(i18n: I18nService, jsf: JsfService);
    ngOnChanges(): void;
    ngOnInit(): void;
    initForm(): void;
    setCombine(): void;
    /**
     * submit処理を転送
     */
    onSubmit(form: any): void;
    /**
     * submit以外の処理を転送
     * @param event
     */
    buttonClick(event: any): void;
    remove(): void;
}
