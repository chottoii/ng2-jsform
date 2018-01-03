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
import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
var Material2CheckboxComponent = /** @class */ (function (_super) {
    __extends(Material2CheckboxComponent, _super);
    function Material2CheckboxComponent(jsf) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        // 条件付き表示制御用変数
        _this.dispConditionTarget = '';
        _this.dispConditionValue = null;
        _this.selectList = null;
        _this.currentValue = false;
        _this.busy = false;
        _this.badges = '';
        // idの次元数
        _this.idDimension = '';
        return _this;
    }
    Material2CheckboxComponent.prototype.ngOnInit = function () {
        var _this = this;
        // ベースの変更
        this.changeBase();
        // idの次元数設定
        this.idDimension = '';
        if (this.dimension > 0) {
            this.idDimension = '_' + this.dimension.toString();
        }
        // 表示条件取得
        if (this.option.dispCondition !== undefined) {
            var condition = this.option.dispCondition.split('=');
            this.dispConditionTarget = condition[0];
            this.dispConditionValue = condition[1];
        }
        // スキーマがarrayの場合、選択肢取得
        if (this.schema.properties[this.option.key] !== undefined &&
            this.schema.properties[this.option.key].type === 'array') {
            this.selectList = this.jsf.getMaster(this.master, this.schema.properties, this.option.master);
        }
        if (this.option.direction === undefined) {
            this.option.direction = 'row';
        }
        // バッチ機能
        if (this.option.linkedItems !== undefined) {
            // 初期値を取得
            if (this.parentGroup.controls[this.option.key] !== null) {
                this.currentValue = this.parentGroup.controls[this.option.key].value;
            }
            var badgesCount = 0;
            for (var i = 0; i < this.option.linkedItems.length; i++) {
                if (this.parentGroup.controls[this.option.linkedItems[i]].value === true) {
                    badgesCount++;
                }
            }
            if (this.option.linkedItems.length === badgesCount) {
                this.badges = 'all';
            }
            else if (badgesCount === 0) {
                this.badges = '';
            }
            else {
                this.badges = badgesCount.toString();
            }
            // 値変更の監視
            this.services[0] = this.parentGroup.valueChanges.subscribe(function (form) {
                if (_this.option.linkedItems !== undefined && _this.busy === false) {
                    _this.checkboxChange();
                }
            });
        }
    };
    Material2CheckboxComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    /**
     * 条件付き表示制御
     */
    /**
       * 条件付き表示制御
       */
    Material2CheckboxComponent.prototype.viewCondition = /**
       * 条件付き表示制御
       */
    function () {
        var ret = this.jsf.viewCondition(this.parentGroup, this.option);
        // 親要素の表示切替処理
        if (ret) {
            $('#' + this.option.title).show();
        }
        else {
            $('#' + this.option.title).hide();
        }
        return ret;
    };
    Material2CheckboxComponent.prototype.checkboxChange = function () {
        this.busy = true;
        if (this.option.linkedItems !== undefined) {
            // 自身の変更をチェック
            var selectFlag = false;
            if (this.parentGroup.controls[this.option.key] !== null) {
                selectFlag = this.parentGroup.controls[this.option.key].value;
            }
            if (this.currentValue !== selectFlag) {
                // 関連フラグの設定
                for (var i = 0; i < this.option.linkedItems.length; i++) {
                    this.parentGroup.controls[this.option.linkedItems[i]].setValue(selectFlag);
                }
                if (selectFlag === true) {
                    this.badges = 'all';
                }
                else {
                    this.badges = '';
                }
                this.currentValue = selectFlag;
            }
            else {
                var badgesCount = 0;
                for (var i = 0; i < this.option.linkedItems.length; i++) {
                    if (this.parentGroup.controls[this.option.linkedItems[i]].value === true) {
                        badgesCount++;
                    }
                }
                if (this.option.linkedItems.length === badgesCount) {
                    this.badges = 'all';
                    this.parentGroup.controls[this.option.key].setValue(true);
                    this.currentValue = true;
                }
                else if (badgesCount === 0) {
                    this.badges = '';
                    this.parentGroup.controls[this.option.key].setValue(false);
                    this.currentValue = false;
                }
                else {
                    this.badges = badgesCount.toString();
                    this.parentGroup.controls[this.option.key].setValue(false);
                    this.currentValue = false;
                }
            }
        }
        this.busy = false;
    };
    Material2CheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-checkbox',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<div class=\"mk-checkbox-wrap\"\n  *ngIf=\"dispConditionTarget === '' || viewCondition()\"\n  id=\"{{option.key}}{{idDimension}}\"\n  [formGroup]=\"parentGroup\"\n  [style.flex-direction]=\"option.direction\"\n  [style.width]=\"option.width\">\n  <label [attr.for]=\"option.key\"\n    [style.display]=\"option.notitle ? 'none' : ''\"\n    [style.width]=\"option.labelWidth\"\n    [innerHTML]=\"option?.title | mk_ng2_i18n: page.pageID\">\n  </label>\n  <mat-checkbox class=\"mk-checkbox-group-wrap\"\n    type=\"checkbox\"\n    [color]=\"option?.color || 'primary'\"\n    [formControlName]=\"option.key\"\n    [name]=\"option.key\">\n    <span class=\"checkbox-name\">\n      {{option.title | mk_ng2_i18n: page.pageID}}\n    </span>\n    <span class=\"badge\" *ngIf=\"badges !== ''\">{{ badges}}</span>\n  </mat-checkbox>\n  <mat-error>{{ formErrors[option.key] }}</mat-error>\n</div>\n",
                    styles: ["\n  .mk-checkbox-wrap {\n    display: flex;\n    flex-wrap: wrap;\n    margin-right: 8px;\n    margin-bottom: 8px;\n  }\n  .mk-checkbox-group-wrap {\n    display: flex;\n    flex-wrap: wrap;\n  }\n  ul, menu, dir {\n    display: block;\n    list-style-type: disc;\n    -webkit-margin-before: 1em;\n    -webkit-margin-after: 1em;\n    -webkit-margin-start: 0px;\n    -webkit-margin-end: 0px;\n    -webkit-padding-start: 0px!important;\n  }\n  .checkbox-list { list-style-type: none; }\n  .horizontal-list > li,\n  .horizontal > li {\n    display: inline-block;\n    margin-right: 10px;\n    zoom: 1;\n  }\n  .checkbox-name { white-space: nowrap; }\n  .badge {\n    display: inline-block;\n    min-width: 10px;\n    padding: 3px 7px;\n    font-size: 12px;\n    font-weight: bold;\n    line-height: 1;\n    color: #fff;\n    text-align: center;\n    white-space: nowrap;\n    vertical-align: baseline;\n    background-color: #232890;\n    border-radius: 10px;\n  }\n"]
                },] },
    ];
    /** @nocollapse */
    Material2CheckboxComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    return Material2CheckboxComponent;
}(JsfBaseComponent));
export { Material2CheckboxComponent };
