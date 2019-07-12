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
var Material2LabelComponent = (function (_super) {
    __extends(Material2LabelComponent, _super);
    function Material2LabelComponent(jsf) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        // idの次元数
        _this.idDimension = '';
        return _this;
    }
    Material2LabelComponent.prototype.ngOnInit = function () {
        // ベースの変更
        this.changeBase();
        // idの次元数設定
        this.idDimension = '';
        if (this.dimension > 0) {
            this.idDimension = '_' + this.dimension.toString();
        }
    };
    Material2LabelComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    Material2LabelComponent.prototype.viewCheck = function () {
        if (this.option.viewFunc !== undefined) {
            return this.option.viewFunc(this.jsf.getForm());
        }
        return false;
    };
    Material2LabelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-label',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<div id=\"{{option.id}}{{idDimension}}\" *ngIf=\"option.label !== undefined\">\n  {{ option.label | mk_ng2_i18n: page.pageID }}\n</div>\n<div id=\"{{option.id}}{{idDimension}}\" *ngIf=\"option.trueLabel  !== undefined && viewCheck()\">\n  {{ option.trueLabel | mk_ng2_i18n: page.pageID }}\n</div>\n<div id=\"{{option.id}}{{idDimension}}\" *ngIf=\"option.falseLabel !== undefined && !viewCheck()\">\n  {{ option.falseLabel | mk_ng2_i18n: page.pageID }}\n</div>\n",
                    styles: ["\n"]
                },] },
    ];
    /** @nocollapse */
    Material2LabelComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    return Material2LabelComponent;
}(JsfBaseComponent));
export { Material2LabelComponent };
