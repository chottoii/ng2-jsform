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
var Material2SectionComponent = /** @class */ (function (_super) {
    __extends(Material2SectionComponent, _super);
    function Material2SectionComponent(jsf) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        _this.sectionkind = 'normal';
        // ボタンによる表示制御用変数
        _this.sectionOpened = true;
        // idの次元数
        _this.idDimension = '';
        return _this;
    }
    Material2SectionComponent.prototype.ngOnInit = function () {
        // ベースの変更
        this.changeBase();
        // idの次元数設定
        this.idDimension = '';
        if (this.dimension > 0) {
            this.idDimension = '_' + this.dimension.toString();
        }
        // セッションオープン/クローズ初期設定
        if (this.option.open !== undefined) {
            this.sectionOpened = this.option.open;
        }
        if (this.schema.properties[this.option.key] !== undefined &&
            this.schema.properties[this.option.key].type === 'object') {
            this.sectionkind = 'object';
            var cName = 'controls';
            this.pGroup = this.parentGroup.controls[this.option.key][cName][0];
        }
        else {
            this.sectionkind = 'normal';
            this.pGroup = this.parentGroup;
        }
    };
    Material2SectionComponent.prototype.ngOnDestroy = function () {
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
    Material2SectionComponent.prototype.opened = /**
       * ボタン制御による表示制御
       * @param flag
       */
    function (flag) {
        this.sectionOpened = flag;
    };
    /**
     * child widgetのイベントをparentに転送する
     * @param event
     */
    /**
       * child widgetのイベントをparentに転送する
       * @param event
       */
    Material2SectionComponent.prototype.buttonClicked = /**
       * child widgetのイベントをparentに転送する
       * @param event
       */
    function (event) {
        this.buttonClick.next(event);
    };
    Material2SectionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-section',
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<div class=\"mk-section-wrap\" id=\"{{option.id}}{{idDimension}}\" *ngIf=\"option.dispCondition === undefined || jsf.viewCondition(parentGroup, option)\" [style.width]=\"option.width\">\n  <div class=\"mk-section-title-wrap\"\n    [style.display]=\"option.title === undefined ? 'none' : ''\">\n      {{option.title | mk_ng2_i18n: page.pageID}}\n    <span class=\"mk-titleNote\" *ngIf=\"option.titleNote !== undefined\">\n      {{option.titleNote | mk_ng2_i18n: page.pageID}}\n    </span>\n    <span *ngIf=\"option.viewDimension === true\">\n      {{dimension+1}}\n    </span>\n    <span class=\"mk-section-allSelect\"\n      [style.display]=\"option.allSelect === undefined ? 'none' : ''\">\n      <button mat-button type=\"button\" (click)=\"jsf.allSelect(pGroup, option.items, true)\">\n        {{ option.allSelect | mk_ng2_i18n: 'button' }}\n      </button>\n    </span>\n    <span class=\"mk-section-allClear\"\n      [style.display]=\"option.allClear === undefined ? 'none' : ''\">\n      <button mat-button type=\"button\" (click)=\"jsf.allSelect(pGroup, option.items, false)\">\n        {{ option.allClear | mk_ng2_i18n: 'button' }}\n      </button>\n    </span>\n    <ng-container *ngIf=\"option.openLabel !== undefined\">\n      <span class=\"mk-section-open\" *ngIf=\"!sectionOpened\">\n        <button mat-button (click)=\"opened(true)\">\n          {{ option.openLabel | mk_ng2_i18n: 'button' }}\n        </button>\n      </span>\n      <span class=\"mk-section-close\" *ngIf=\"sectionOpened\">\n        <button mat-button (click)=\"opened(false)\">\n          {{ option.closeLabel | mk_ng2_i18n: 'button' }}\n        </button>\n      </span>\n    </ng-container>\n  </div>\n  <div class=\"mk-section-note\"\n    [style.display]=\"option.note === undefined ? 'none' : ''\"\n    [innerHTML]=\"option.note | mk_ng2_i18n: page.pageID\">\n  </div>\n  <div *ngIf=\"option.previousLabel !== undefined\">\n    {{ option.previousLabel | mk_ng2_i18n: page.pageID }}\n  </div>\n  <div *ngIf=\"sectionOpened\"\n    id=\"{{option.id}}{{idDimension}}\"\n    [ngClass]=\"option.direction === 'column' ? 'mk-section-content-wrap-column ' : 'mk-section-content-wrap-row'\"\n    [style.justify-content]=\"option.justifyContent\">\n    <jsf-root *ngFor=\"let widget of option.items; let i=index;\"\n      id=\"{{widget.title}}\"\n      [fxFlex]=\"widget.flex === undefined ? '1 1 auto' : widget.flex\"\n      [widgets]=\"widgets\"\n      [debug]=\"debug\"\n      [innerOption]=\"innerOption\"\n      [parentGroup]=\"pGroup\"\n      [page]=\"page\"\n      [schema]=\"schema\"\n      [master]=\"master\"\n      [data]=\"data\"\n      [option]=\"widget\"\n      [direction]=\"direction\"\n      [dimension]=\"dimension\"\n      [index]=\"i\"\n      [num]=\"num\"\n      (buttonClick)=\"buttonClicked($event)\">\n    </jsf-root>\n  </div>\n  <div *ngIf=\"option.postLabel !== undefined\">\n    {{ option.postLabel | mk_ng2_i18n: page.pageID }}\n  </div>\n</div>\n",
                    styles: ["\n  .mk-section-wrap {\n    padding: 0px;\n    margin: 0px;\n  }\n  .mk-section-title-wrap {\n    display: flex;\n    flex-wrap: wrap;\n    flex-direction: row;\n    align-items: center;\n    margin: 0px 0px;\n    padding: 0px;\n  }\n  .mk-section-open,\n  .mk-section-close {\n    float: right;\n    vertical-align: middle;\n    cursor: pointer;\n  }\n  .mk-section-content-wrap-row {\n    width: 100%;\n    display: flex;\n    flex-wrap: wrap;\n    flex-direction: row;\n  }\n  .mk-section-content-wrap-column {\n    width: 100%;\n    display: flex;\n    flex-wrap: wrap;\n    flex-direction: column;\n  }\n  .margin-left {\n    margin-left: auto;\n  }\n  .margin-right {\n    margin-right: auto;\n  }\n  .mk-titleNote {\n    margin-left: 20px;\n    font-size: small;\n    font-weight: 550;\n  }\n"]
                },] },
    ];
    /** @nocollapse */
    Material2SectionComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    return Material2SectionComponent;
}(JsfBaseComponent));
export { Material2SectionComponent };
