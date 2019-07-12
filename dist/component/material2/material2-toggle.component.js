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
var Material2ToggleComponent = (function (_super) {
    __extends(Material2ToggleComponent, _super);
    function Material2ToggleComponent(jsf) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        _this.selectList = null;
        // idの次元数
        _this.idDimension = '';
        return _this;
    }
    Material2ToggleComponent.prototype.ngOnInit = function () {
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
    Material2ToggleComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    Material2ToggleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-toggle',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<div id=\"{{option.key}}{{idDimension}}\" class=\"mk-toggle-wrap\" [formGroup]=\"parentGroup\">\n  <mat-button-toggle-group [formControlName]=\"option.key\">\n    <ng-container *ngFor=\"let selectItem of selectList\">\n      <mat-button-toggle class=\"mk-toggle-button-wrap\"\n        [value]=\"selectItem.value\"\n        [style.width]=\"option.width\"\n        [style.text-align]=\"'center'\">\n          {{selectItem.key | mk_ng2_i18n: page.pageID}}\n      </mat-button-toggle>\n    </ng-container>\n  </mat-button-toggle-group>\n</div>\n",
                    styles: ["\n  .mk-toggle-wrap {\n    display: flex;\n    flex-wrap: wrap;\n    margin-right: 8px;\n    margin-bottom: 8px;\n  }\n  .mat-button-toggle-checked {\n    background-color:#3f51b5 !important;\n    color: #fff;\n  }\n"]
                },] },
    ];
    /** @nocollapse */
    Material2ToggleComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    return Material2ToggleComponent;
}(JsfBaseComponent));
export { Material2ToggleComponent };
