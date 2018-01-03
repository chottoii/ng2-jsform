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
/**
 * history
 *  2017/12/21 動的バリデーション機能
 */
import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
var Material2InputComponent = /** @class */ (function (_super) {
    __extends(Material2InputComponent, _super);
    function Material2InputComponent(jsf) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        _this.hintPosition = 'end';
        _this.hint = '';
        // idの次元数
        _this.idDimension = '';
        return _this;
    }
    Material2InputComponent.prototype.ngOnInit = function () {
        var _this = this;
        // ベースの変更
        this.changeBase();
        // idの次元数設定
        this.idDimension = '';
        if (this.dimension > 0) {
            this.idDimension = '_' + this.dimension.toString();
        }
        this.hint = this.option.hint;
        if (this.option.hintPosition !== undefined) {
            this.hintPosition = this.option.hintPosition;
        }
        // 初期設定＆共有データ監視(ヒントデータ)
        if (this.option.hintMaster !== undefined) {
            var filterValue = '';
            if (this.option.filterKey !== undefined) {
                filterValue = this.parentGroup.controls[this.option.filterKey].value;
            }
            var selectValue = this.parentGroup.controls[this.option.hintKey].value;
            var hintObj = this.jsf.getHint(this.master, this.option.hintMaster, selectValue, filterValue);
            this.hint = hintObj.hint;
            // 動的バリデーション用変数追加
            if (hintObj.pattern !== undefined && hintObj.pattern !== '') {
                var dynamicPattern = 'dynamicPattern';
                this.parentGroup.controls[this.option.key][dynamicPattern] = hintObj.pattern;
            }
            if (this.option.hintId !== undefined) {
                var hints = this.hint.split(',');
                this.hint = hints[this.option.hintId];
            }
            this.services[0] = this.shared.sharedPara$.subscribe(function (data) {
                if (data.key === _this.option.key && data.kind === 'setHint' && data.dimension === _this.dimension) {
                    if (_this.option.hintId !== undefined) {
                        var hints = data.hint.split(',');
                        _this.hint = hints[_this.option.hintId];
                    }
                    else {
                        _this.hint = data.hint;
                    }
                    // 動的バリデーション用変数追加
                    if (data.pattern !== undefined && data.pattern !== '') {
                        var dynamicPattern = 'dynamicPattern';
                        _this.parentGroup.controls[_this.option.key][dynamicPattern] = data.pattern;
                    }
                    // 現在の値をクリア
                    // 現在の値をクリア
                    _this.parentGroup.controls[_this.option.key].setValue('');
                }
            });
        }
    };
    Material2InputComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    Material2InputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-input',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<ng-container>\n  <div [formGroup]=\"parentGroup\">\n    <p *ngIf=\"option.previousLabel !== undefined\">{{ option.previousLabel | mk_ng2_i18n: page.pageID }}</p>\n    <mat-input-container>\n      <span matPrefix *ngIf=\"option.prefix !== undefined\">{{option.prefix}}</span>\n      <input matInput\n         placeholder=\"{{option.title | mk_ng2_i18n: page.pageID}}\"\n         maxlength=\"{{option.maxLength}}\"\n         id=\"{{option.key}}{{idDimension}}\"\n         (focusout)=\"focusOutFunction(option.key)\"\n         [formControlName]=\"option.key\"/>\n      <span matSuffix *ngIf=\"option.suffix !== undefined\">{{option.suffix}}</span>\n      <mat-hint *ngIf=\"option.hint !== undefined && hintPosition !== 'start'\" align=\"end\">\n        {{ hint | mk_ng2_i18n: page.pageID }}\n      </mat-hint>\n      <mat-hint *ngIf=\"option.hint !== undefined && hintPosition === 'start'\" align=\"start\">\n        {{ hint | mk_ng2_i18n: page.pageID }}\n      </mat-hint>\n      <mat-hint *ngIf=\"option.viewRemaining !== undefined && option.viewRemaining === true\" align=\"end\">\n        {{ option.remainingLabel | mk_ng2_i18n: page.pageID }} {{ parentGroup.controls[option.key].value?.length }} / {{option.maxLength}}\n      </mat-hint>\n      <mat-hint *ngIf=\"option.startHint !== undefined\" align=\"start\">\n        {{ option.startHint | mk_ng2_i18n: page.pageID }}\n      </mat-hint>\n      <mat-error>{{ formErrors[option.key] }}</mat-error>\n    </mat-input-container>\n    <p *ngIf=\"option.postLabel !== undefined\">{{ option.postLabel | mk_ng2_i18n: page.pageID }}</p>\n  </div>\n</ng-container>\n",
                    styles: ["\n  material2-input {\n    display: flex;\n    flex-wrap: wrap;\n    flex-direction: row;\n  }\n  :host ::ng-deep .mat-form-field-wrapper {\n    margin-right: 8px;\n  }\n  .mat-form-field {\n    width: 100%;\n  }\n"]
                },] },
    ];
    /** @nocollapse */
    Material2InputComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    return Material2InputComponent;
}(JsfBaseComponent));
export { Material2InputComponent };
