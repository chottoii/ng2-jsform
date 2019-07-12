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
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
var Material2RadioComponent = (function (_super) {
    __extends(Material2RadioComponent, _super);
    function Material2RadioComponent(jsf) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        _this.selectList = null;
        // idの次元数
        _this.idDimension = '';
        return _this;
    }
    Material2RadioComponent.prototype.ngOnInit = function () {
        // ベースの変更
        this.changeBase();
        // idの次元数設定
        this.idDimension = '';
        if (this.dimension > 0) {
            this.idDimension = '_' + this.dimension.toString();
        }
        // 選択肢取得
        this.selectList = this.jsf.getMaster(this.master, this.schema.properties, this.option.master);
    };
    Material2RadioComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    Material2RadioComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-radio',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<div class=\"mk-radio-wrap\"\n  [formGroup]=\"parentGroup\"\n  [style.flex-direction]=\"option.direction\">\n  <label\n    fxFlex=\"{{option.labelFlex}}\"\n    [attr.for]=\"option.key\"\n    [style.display]=\"option.title !== undefined ? '' : 'none'\"\n    [innerHTML]=\"option.title | mk_ng2_i18n: page.pageID\">\n  </label>\n  <mat-radio-group class=\"mk-radio-group-wrap\"\n    id=\"{{option.key}}\"\n    [style.flex-direction]=\"option.itemDirection\"\n    [align]=\"option.labelPosition !== undefined ? option.labelPosition : 'start'\"\n    [formControlName]=\"option.key\">\n    <ng-container *ngFor=\"let selectItem of selectList\">\n      <mat-radio-button\n        fxFlex=\"{{option.itemFlex}}\"\n        [name]=\"selectItem.key\"\n        [color]=\"option.color\"\n        [value]=\"selectItem.value\">\n        <span [innerHTML]=\"selectItem.key  | mk_ng2_i18n: page.pageID\"></span>\n        <span *ngIf=\"option.viewNote\" [innerHTML]=\"selectItem.note  | mk_ng2_i18n: page.pageID\"></span>\n      </mat-radio-button>\n    </ng-container>\n  </mat-radio-group>\n  <mat-error>{{ formErrors[option.key] }}</mat-error>\n</div>\n",
                    styles: ["\n  .mk-radio-wrap {\n    display: flex;\n    flex-wrap: wrap;\n    margin-right: 8px;\n    margin-bottom: 8px;\n  }\n  .mk-radio-group-wrap {\n    display: flex;\n    flex-wrap: wrap;\n  }\n"]
                },] },
    ];
    /** @nocollapse */
    Material2RadioComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    return Material2RadioComponent;
}(JsfBaseComponent));
export { Material2RadioComponent };
