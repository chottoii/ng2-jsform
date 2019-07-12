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
var Material2FileComponent = (function (_super) {
    __extends(Material2FileComponent, _super);
    function Material2FileComponent(jsf) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        // idの次元数
        _this.idDimension = '';
        return _this;
    }
    Material2FileComponent.prototype.ngOnInit = function () {
        // ベースの変更
        this.changeBase();
        // idの次元数設定
        this.idDimension = '';
        if (this.dimension > 0) {
            this.idDimension = '_' + this.dimension.toString();
        }
    };
    Material2FileComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    Material2FileComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-file',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<ng-container>\n  <div [formGroup]=\"parentGroup\" class=\"mk-file-wrap\">\n    <div *ngIf=\"option.previousLabel !== undefined\" class=\"mk-file-label\">{{ option.previousLabel | mk_ng2_i18n: page.pageID }}</div>\n    <div class=\"mk-file-contents\">\n      <input type=\"file\" id=\"{{option.key}}{{idDimension}}\" [formControlName]=\"option.key\"/>\n    </div>\n    <div *ngIf=\"option.postLabel !== undefined\" class=\"mk-file-label\">{{ option.postLabel | mk_ng2_i18n: page.pageID }}</div>\n  </div>\n</ng-container>\n",
                    styles: ["\n  .mk-file-wrap {\n    width: 100%;\n    display: flex;\n    flex-wrap: wrap;\n    flex-direction: row;\n  }\n  .mk-file-label {\n    flex: 10 1 10%;\n  }\n  .mk-file-contents {\n    flex: 80 1 80%;\n  }\n"]
                },] },
    ];
    /** @nocollapse */
    Material2FileComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    return Material2FileComponent;
}(JsfBaseComponent));
export { Material2FileComponent };
