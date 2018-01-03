/**
 * 修正履歴
 *  2017/11/10 clearが効かない不具合に対応
 *  2017/11/25 refサポート
 *  2017/11/27 ngOnChangesの初期化手順による不具合対応
 *  2017/12/09 clear処理の自動化
 */
import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { I18nService } from './service/i18n.service';
import { JsfService } from './service/jsf.service';
import { deepCopy } from './utility';
import { MATERIAL2_DESIGN_COMPONENTS_LIST } from './component/material2/';
var AutoFormMainComponent = /** @class */ (function () {
    function AutoFormMainComponent(i18n, jsf) {
        this.i18n = i18n;
        this.jsf = jsf;
        this.combine = null;
        this.debug = false;
        this.widgets = {};
        this.innerOption = null;
        this.master = null;
        this.data = {};
        this.message = null;
        this.onClick = new EventEmitter();
        this.first = true;
        this.formReady = false;
        this.currentLayout = null;
    }
    AutoFormMainComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.formReady = false;
        this.jsf.setDebugMode(this.debug);
        this.setCombine();
        // $ref処理
        $RefParser.dereference(this.schema, function (err, schema) {
            if (err) {
                console.error('$Ref Parser error: ' + err);
            }
            else {
                _this.schema = schema;
                _this.initForm();
                _this.formReady = true;
            }
        });
    };
    AutoFormMainComponent.prototype.ngOnInit = function () {
        // 初回は、ngOnChangesで初期化されるので、不要
        // this.initForm();
    };
    AutoFormMainComponent.prototype.initForm = function () {
        var _this = this;
        // widgetリストの初期化　TODO 実際は、デザインによって変更される
        this.widgetList = {};
        Object.keys(MATERIAL2_DESIGN_COMPONENTS_LIST).forEach(function (key) {
            _this.widgetList[key] = MATERIAL2_DESIGN_COMPONENTS_LIST[key];
        });
        // カスタムコンポネントの追加
        Object.keys(this.widgets).forEach(function (key) {
            _this.widgetList[key] = _this.widgets[key];
        });
        // 国際化辞書の初期化
        if (this.message !== null) {
            this.i18n.setDictionary(this.message);
        }
        // form group 生成
        // this.form = this.jsf.schemaToFormGroup(this.schema, this.data);
        this.group = this.jsf.schemaToGroup(this.schema, this.data);
        this.form = this.jsf.groupToFormGroup(this.group, this.schema, this.data);
        this.currentLayout = this.layout;
        // カスタムWidgetsのためにtopフォームを保持する
        this.jsf.setForm(this.form, this.schema, this.data);
    };
    AutoFormMainComponent.prototype.setCombine = function () {
        if (this.combine !== null) {
            this.widgets = this.combine.widgets !== undefined ? this.combine.widgets : {};
            this.page = this.combine.page;
            this.schema = this.combine.schema;
            this.layout = this.combine.layout;
            this.master = this.combine.master;
            this.data = this.combine.data;
            this.message = this.combine.message;
        }
    };
    /**
     * submit処理を転送
     */
    /**
       * submit処理を転送
       */
    AutoFormMainComponent.prototype.onSubmit = /**
       * submit処理を転送
       */
    function (form) {
        this.onClick.next({
            'obj': this.form.value,
            'kind': 'submit'
        });
    };
    /**
     * submit以外の処理を転送
     * @param event
     */
    /**
       * submit以外の処理を転送
       * @param event
       */
    AutoFormMainComponent.prototype.buttonClick = /**
       * submit以外の処理を転送
       * @param event
       */
    function (event) {
        if (event.kind === 'clear') {
            // clear 処理
            this.jsf.resetForm();
        }
        else if (event.kind !== 'submit') {
            this.onClick.next(event);
        }
    };
    AutoFormMainComponent.prototype.remove = function () {
        if (this.form !== null && this.form !== undefined) {
            this.form.reset();
        }
    };
    AutoFormMainComponent.decorators = [
        { type: Component, args: [{
                    selector: 'js-form',
                    template: "\n<form [formGroup]=\"form\" *ngIf=\"formReady\" (ngSubmit)=\"onSubmit(form)\">\n  <div *ngFor=\"let widget of layout\">\n    <jsf-root\n      [widgets]=\"widgetList\"\n      [debug]=\"debug\"\n      [innerOption]=\"innerOption\"\n      [parentGroup]=\"form\"\n      [page]=\"page\"\n      [schema]=\"schema\"\n      [master]=\"master\"\n      [data]=\"data\"\n      [option]=\"widget\"\n      (buttonClick)=\"buttonClick($event)\"></jsf-root>\n  </div>\n</form>\n"
                },] },
    ];
    /** @nocollapse */
    AutoFormMainComponent.ctorParameters = function () { return [
        { type: I18nService, },
        { type: JsfService, },
    ]; };
    AutoFormMainComponent.propDecorators = {
        "combine": [{ type: Input },],
        "debug": [{ type: Input },],
        "widgets": [{ type: Input },],
        "innerOption": [{ type: Input },],
        "page": [{ type: Input },],
        "schema": [{ type: Input },],
        "layout": [{ type: Input },],
        "master": [{ type: Input },],
        "data": [{ type: Input },],
        "message": [{ type: Input },],
        "onClick": [{ type: Output },],
    };
    return AutoFormMainComponent;
}());
export { AutoFormMainComponent };
