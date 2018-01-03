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
import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
var Material2WrapperComponent = /** @class */ (function (_super) {
    __extends(Material2WrapperComponent, _super);
    function Material2WrapperComponent(jsf) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        _this.sectionkind = 'normal';
        // 条件付き表示制御用変数
        // dispConditionTarget = '';
        // dispConditionValue  = null;
        // ボタンによる表示制御用変数
        _this.wrapperOpened = true;
        // idの次元数
        _this.idDimension = '';
        return _this;
    }
    Material2WrapperComponent.prototype.ngOnInit = function () {
        // ベースの変更
        this.changeBase();
        // idの次元数設定
        this.idDimension = '';
        if (this.dimension > 0) {
            this.idDimension = '_' + this.dimension.toString();
        }
        // 表示条件取得
        /*
            if ( this.option.dispCondition !== undefined ) {
              const condition = this.option.dispCondition.split('=');
              this.dispConditionTarget = condition[0];
              this.dispConditionValue = condition[1];
            }
            */
        // セッションオープン/クローズ初期設定
        if (this.option.open !== undefined) {
            this.wrapperOpened = this.option.open;
        }
        // 構文チェック
        if (this.option.items === null || this.option.items === undefined) {
            throw new Error('wrapperのitems要素が未定義です。');
        }
    };
    Material2WrapperComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    /**
     * ボタン制御による表示制御
     * @param flag
     */
    /**
       * ボタン制御による表示制御
       * @param flag
       */
    Material2WrapperComponent.prototype.opened = /**
       * ボタン制御による表示制御
       * @param flag
       */
    function (flag) {
        this.wrapperOpened = flag;
    };
    Material2WrapperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-wrapper',
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<div class=\"mk-wrapper-wrap\" id=\"{{option.id}}{{idDimension}}\" *ngIf=\"option.dispCondition === undefined || jsf.viewCondition(parentGroup, option)\">\n  <div class=\"mk-wrapper-title\"\n    [style.display]=\"option.title === undefined ? 'none' : ''\">\n      {{option.title | mk_ng2_i18n: page.pageID}}\n      <span class=\"mk-wrapper-open\" *ngIf=\"!wrapperOpened\">\n        <button mat-button=\"mat-button\" (click)=\"opened(true)\">\n          {{ option.openLabel | mk_ng2_i18n: 'button' }}\n        </button>\n      </span>\n      <span class=\"mk-wrapper-close\" *ngIf=\"wrapperOpened\">\n        <button mat-button=\"mat-button\" (click)=\"opened(false)\">\n          {{ option.closeLabel | mk_ng2_i18n: 'button' }}\n        </button>\n      </span>\n  </div>\n  <div class=\"mk-wrapper-body\" *ngIf=\"wrapperOpened\">\n    <div class=\"mk-wrapper-note\"\n      [style.display]=\"option.note === undefined ? 'none' : ''\">\n      {{ option.note | mk_ng2_i18n: page.pageID }}\n    </div>\n    <ng-container *ngFor=\"let widget of option.items\">\n      <jsf-root *ngIf=\"widget.closedView === undefined || widget.closedView !== true\"\n        fxFlex=\"{{widget.flex}}\"\n        [widgets]=\"widgets\"\n        [debug]=\"debug\"\n        [innerOption]=\"innerOption\"\n        [parentGroup]=\"parentGroup\"\n        [page]=\"page\"\n        [schema]=\"schema\"\n        [master]=\"master\"\n        [data]=\"data\"\n        [option]=\"widget\"\n        [direction]=\"direction\"\n        [num]=\"num\"\n        [index]=\"index\"\n        [dimension]=\"dimension\">\n      </jsf-root>\n    </ng-container>\n  </div>\n  <div class=\"mk-wrapper-body\" *ngIf=\"!wrapperOpened\">\n    <ng-container *ngFor=\"let widget of option.items\">\n      <jsf-root *ngIf=\"widget.closedView !== undefined && widget.closedView === true\"\n        fxFlex=\"{{widget.flex}}\"\n        [widgets]=\"widgets\"\n        [debug]=\"debug\"\n        [innerOption]=\"innerOption\"\n        [parentGroup]=\"parentGroup\"\n        [page]=\"page\"\n        [schema]=\"schema\"\n        [master]=\"master\"\n        [data]=\"data\"\n        [option]=\"widget\"\n        [direction]=\"direction\"\n        [num]=\"num\"\n        [index]=\"index\"\n        [dimension]=\"dimension\">\n      </jsf-root>\n    </ng-container>\n  </div>\n</div>\n",
                    styles: ["\n  .mk-wrapper-wrap {\n    padding: 0px 0px 0px 0px;\n    margin:  8px 0px 8px 0px;\n    border: 1px solid #eee;\n  }\n  .mk-wrapper-title {\n    background-color: #eee;\n    display: block;\n    margin: 0px 0px;\n    padding: 10px;\n    text-align: center;\n  }\n  .mk-wrapper-open,\n  .mk-wrapper-close {\n    float: right;\n    vertical-align: middle;\n    cursor: pointer;\n  }\n  .mk-wrapper-body {\n    padding: 8px;\n    margin:  0px;\n  }\n  .mat-button {\n    margin-top: -14px;\n    height: 32px;\n  }\n"]
                },] },
    ];
    /** @nocollapse */
    Material2WrapperComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    return Material2WrapperComponent;
}(JsfBaseComponent));
export { Material2WrapperComponent };
