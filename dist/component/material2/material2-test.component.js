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
var Material2TestComponent = (function (_super) {
    __extends(Material2TestComponent, _super);
    function Material2TestComponent(jsf) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        _this.flag = true;
        _this.wrapStyle = {};
        _this.itemStyle = {};
        return _this;
    }
    Material2TestComponent.prototype.ngOnInit = function () {
        // ベースの変更
        this.changeBase();
        // wrapStyleの設定値（配列）をオブジェクト列に変換
        /*
            if ( this.option.wrapStyle !== undefined  ) {
              for (const p of Object.keys(this.option.wrapStyle)) {
                for ( const key in this.option.wrapStyle[p] ) {
                  this.wrapStyle[key] = this.option.wrapStyle[p][key];
                }
              }
            }
            if ( this.option.itemStyle !== undefined  ) {
              for (const p of Object.keys(this.option.itemStyle)) {
                for ( const key in this.option.itemStyle[p] ) {
                  this.itemStyle[key] = this.option.itemStyle[p][key];
                }
              }
            }
            */
    };
    Material2TestComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    Material2TestComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-test',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<div>\n  {{ option.label | mk_ng2_i18n: page.pageID }}\n</div>\n",
                    styles: ["\n"]
                },] },
    ];
    /** @nocollapse */
    Material2TestComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    return Material2TestComponent;
}(JsfBaseComponent));
export { Material2TestComponent };
