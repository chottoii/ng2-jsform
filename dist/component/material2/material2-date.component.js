var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
var Material2DateComponent = (function (_super) {
    __extends(Material2DateComponent, _super);
    function Material2DateComponent(jsf) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        // idの次元数
        _this.idDimension = '';
        return _this;
    }
    Material2DateComponent.prototype.ngOnInit = function () {
        // ベースの変更
        this.changeBase();
        // idの次元数設定
        this.idDimension = '';
        if (this.dimension > 0) {
            this.idDimension = '_' + this.dimension.toString();
        }
    };
    Material2DateComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    Material2DateComponent.prototype.onDateChange = function (d, option) {
        if (d instanceof Date && !isNaN(d.valueOf())) {
            // 大小チェック(this < max)
            if (option.maxTarget !== undefined && this.parentGroup.get(option.maxTarget).value !== null) {
                var targetValue = this.parentGroup.get(option.maxTarget).value;
                if (d.getTime() > targetValue.getTime()) {
                    this.parentGroup.get(option.key).setValue(targetValue);
                    this.parentGroup.get(option.maxTarget).setValue(d);
                }
            }
            // 大小チェック(this > min)
            if (option.minTarget !== undefined && this.parentGroup.get(option.minTarget).value !== null) {
                var targetValue = this.parentGroup.get(option.minTarget).value;
                if (d.getTime() < targetValue.getTime()) {
                    this.parentGroup.get(option.key).setValue(targetValue);
                    this.parentGroup.get(option.minTarget).setValue(d);
                }
            }
        }
    };
    /**
     * 日付をフォーマットする
     * この関数は使用しないことになった
     * @param  {Date}   date     日付
     * @param  {String} [format] フォーマット
     * @return {String}          フォーマット済み日付
     */
    /**
       * 日付をフォーマットする
       * この関数は使用しないことになった
       * @param  {Date}   date     日付
       * @param  {String} [format] フォーマット
       * @return {String}          フォーマット済み日付
       */
    Material2DateComponent.prototype.formatDate = /**
       * 日付をフォーマットする
       * この関数は使用しないことになった
       * @param  {Date}   date     日付
       * @param  {String} [format] フォーマット
       * @return {String}          フォーマット済み日付
       */
    function (date, format) {
        if (!format) {
            format = 'YYYY-MM-DD hh:mm:ss.SSS';
        }
        format = format.replace(/YYYY/g, '' + date.getFullYear());
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
        format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
        if (format.match(/S/g)) {
            var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
            var length_1 = format.match(/S/g).length;
            for (var i = 0; i < length_1; i++) {
                format = format.replace(/S/, milliSeconds.substring(i, i + 1));
            }
        }
        return format;
    };
    ;
    Material2DateComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-date',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<div class=\"mk-date-wrap\">\n  <span class=\"mk-date-previousLabel\" *ngIf=\"option.previousLabel !== undefined\">\n    {{option.previousLabel | mk_ng2_i18n: page.pageID}}\n  </span>\n  <mat-form-field [formGroup]=\"parentGroup\">\n    <input id=\"{{option.key}}{{idDimension}}\" matInput\n      [matDatepicker]=\"picker\"\n      [formControlName]=\"option.key\"\n      (ngModelChange)=\"onDateChange($event, option)\"\n      placeholder=\"{{option.title | mk_ng2_i18n: page.pageID}}\">\n    <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n    <mat-datepicker touchUi=\"true\" #picker></mat-datepicker>\n    <mat-error>{{ formErrors[option.key] }}</mat-error>\n  </mat-form-field>\n  <span class=\"mk-date-postLabel\" *ngIf=\"option.postLabel !== undefined\">\n    {{option.postLabel | mk_ng2_i18n: page.pageID}}\n  </span>\n</div>\n",
                    styles: ["\n  .mk-date-wrap {\n    display: flex;\n    flex-wrap: wrap;\n    margin-right: 8px;\n  }\n\n  .mk-date-previousLabel {\n    margin-right: 8px;\n    margin-top: 20px;\n  }\n\n  .mk-date-postLabel {\n    margin-left: 8px;\n    margin-right: 8px;\n    margin-top: 20px;\n  }\n"]
                },] },
    ];
    /** @nocollapse */
    Material2DateComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    Material2DateComponent.propDecorators = {
        "dateUtcRef": [{ type: ViewChild, args: ['dateUtc',] },],
    };
    return Material2DateComponent;
}(JsfBaseComponent));
export { Material2DateComponent };
