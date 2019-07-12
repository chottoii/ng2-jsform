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
var Material2IconComponent = (function (_super) {
    __extends(Material2IconComponent, _super);
    function Material2IconComponent(jsf) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        // idの次元数
        _this.idDimension = '';
        return _this;
    }
    Material2IconComponent.prototype.ngOnInit = function () {
        // ベースの変更
        this.changeBase();
        // idの次元数設定
        this.idDimension = '';
        if (this.dimension > 0) {
            this.idDimension = '_' + this.dimension.toString();
        }
    };
    Material2IconComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    Material2IconComponent.prototype.onClick = function (form, kind) {
        switch (kind) {
            case 'remove':
                this.jsf.removeItem(form, this.option.target, this.dimension);
                break;
            case 'add':
                this.jsf.addItem(this.schema, form.controls, this.option.target, this.data);
                break;
            default:
                this.buttonClick.next({
                    'obj': null,
                    'kind': kind
                });
                break;
        }
    };
    Material2IconComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-icon',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<ng-container [ngSwitch]=\"option.kind\">\n  <ng-container *ngSwitchCase=\"'add'\">\n    <button *ngIf=\"num < innerOption.maxItems\" mat-icon-button\n      type=\"button\"\n      id=\"{{option.kind}}{{idDimension}}\"\n      (click)=\"onClick(parentGroup._parent._parent, option.kind)\" >\n      <mat-icon class=\"mk-icon-wrap mk-icon-cursor\">\n        {{ option.icon }}\n      </mat-icon>\n    </button>\n  </ng-container>\n  <ng-container *ngSwitchCase=\"'remove'\">\n    <button *ngIf=\"num > innerOption.minItems\" mat-icon-button\n      type=\"button\"\n      id=\"{{option.kind}}{{idDimension}}\"\n      (click)=\"onClick(parentGroup._parent._parent, option.kind)\" >\n      <mat-icon class=\"mk-icon-wrap mk-icon-cursor\">\n        {{ option.icon }}\n      </mat-icon>\n    </button>\n  </ng-container>\n  <ng-container *ngSwitchCase=\"'tooltip'\">\n    <mat-icon\n      class=\"mk-icon-wrap\"\n      [matTooltipPosition]=\"option.tooltipPosition === undefined ? 'below' : option.tooltipPosition\"\n      matTooltip=\"{{ option.tooltip | mk_ng2_i18n: page.pageID }}\">\n      {{ option.icon }}\n    </mat-icon>\n  </ng-container>\n  <ng-container *ngSwitchDefault=\"\">\n    <button type=\"button\" mat-icon-button\n      id=\"{{option.kind}}{{idDimension}}\"\n      (click)=\"onClick(null, option.kind)\" >\n      <mat-icon class=\"mk-icon-wrap mk-icon-cursor\">\n        {{ option.icon }}\n      </mat-icon>\n    </button>\n  </ng-container>\n</ng-container>\n",
                    styles: ["\n  .mk-icon-wrap {\n    margin-top: 0px;\n    padding-right: 10px;\n    height: 30px;\n    width: 30px;\n  }\n  .mat-icon {\n    font-size: 30px;\n    height: 30px;\n    width: 30px;\n  }\n  .mk-icon-cursor {\n    cursor: pointer;\n  }\n"]
                },] },
    ];
    /** @nocollapse */
    Material2IconComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    return Material2IconComponent;
}(JsfBaseComponent));
export { Material2IconComponent };
