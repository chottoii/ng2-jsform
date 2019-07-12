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
var Material2DisplayComponent = (function (_super) {
    __extends(Material2DisplayComponent, _super);
    function Material2DisplayComponent(jsf) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        _this.parameterValue = '';
        // idの次元数
        _this.idDimension = '';
        return _this;
    }
    Material2DisplayComponent.prototype.ngOnInit = function () {
        // ベースの変更
        this.changeBase();
        // idの次元数設定
        this.idDimension = '';
        if (this.dimension > 0) {
            this.idDimension = '_' + this.dimension.toString();
        }
        this.getValue();
    };
    Material2DisplayComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    /**
     * 値の取得
     * TODO この方式は何度もコールされるため非効率である。
     */
    /**
       * 値の取得
       * TODO この方式は何度もコールされるため非効率である。
       */
    Material2DisplayComponent.prototype.getValue = /**
       * 値の取得
       * TODO この方式は何度もコールされるため非効率である。
       */
    function () {
        var filter = '';
        if (this.option.filter !== undefined) {
            filter = this.parentGroup.controls[this.option.filter].value;
        }
        this.parameterValue = this.jsf.getValue(this.parentGroup, this.master, this.option, filter);
        if (typeof (this.parameterValue) === 'boolean') {
            if (this.parameterValue) {
                this.parameterValue = 'true';
            }
            else {
                this.parameterValue = 'false';
            }
        }
    };
    Material2DisplayComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-display',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<div class=\"mk-display-wrap\" [style.width]=\"option.width\">\n  <div *ngIf=\"option.previousLabel !== undefined\">\n    {{ option.previousLabel | mk_ng2_i18n: page.pageID }}\n  </div>\n  <div *ngIf=\"option.title !== undefined\">\n    {{ option.title | mk_ng2_i18n: page.pageID }}\n  </div>\n  <div id=\"{{option.key}}{{idDimension}}\">\n    {{ getValue() }} {{ parameterValue | mk_ng2_i18n: page.pageID }}\n  </div>\n  <div *ngIf=\"option.postLabel !== undefined\">\n    {{ option.postLabel | mk_ng2_i18n: page.pageID }}\n  </div>\n</div>\n",
                    styles: ["\n  .mk-display-wrap {\n    display: flex;\n    flex-wrap: wrap;\n  }\n  .mk-display-wrap div {\n    flex: 1 1 auto;\n  }\n"]
                },] },
    ];
    /** @nocollapse */
    Material2DisplayComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    return Material2DisplayComponent;
}(JsfBaseComponent));
export { Material2DisplayComponent };
