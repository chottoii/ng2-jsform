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
import { Component } from '@angular/core';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
var Material2TabsComponent = (function (_super) {
    __extends(Material2TabsComponent, _super);
    function Material2TabsComponent(jsf) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        _this.flag = true;
        _this.wrapStyle = {};
        _this.itemStyle = {};
        return _this;
    }
    Material2TabsComponent.prototype.ngOnInit = function () {
        // ベースの変更
        this.changeBase();
    };
    Material2TabsComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    /**
     * child widgetのイベントをparentに転送する
     * @param event
     */
    /**
       * child widgetのイベントをparentに転送する
       * @param event
       */
    Material2TabsComponent.prototype.buttonClicked = /**
       * child widgetのイベントをparentに転送する
       * @param event
       */
    function (event) {
        this.buttonClick.next(event);
    };
    Material2TabsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-tabs',
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<mat-tab-group>\n  <mat-tab *ngFor=\"let tab of option.tabitems; let i=index;\"\n    label=\"{{ tab.title | mk_ng2_i18n: page.pageID }}\">\n    <jsf-root *ngFor=\"let widget of tab.items\"\n      fxFlex=\"{{widget.flex}}\"\n      [widgets]=\"widgets\"\n      [debug]=\"debug\"\n      [innerOption]=\"innerOption\"\n      [parentGroup]=\"parentGroup\"\n      [page]=\"page\"\n      [schema]=\"schema\"\n      [master]=\"master\"\n      [data]=\"data\"\n      [option]=\"widget\"\n      [direction]=\"direction\"\n      [num]=\"num\"\n      [index]=\"index\"\n      [dimension]=\"dimension\"\n      (buttonClick)=\"buttonClicked($event)\">\n    </jsf-root>\n  </mat-tab>\n</mat-tab-group>\n",
                    styles: ["\n:host ::ng-deep .mat-tab-label-active {\n  background-color: rgba(197,202,233,.3);\n}\n"]
                },] },
    ];
    /** @nocollapse */
    Material2TabsComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    return Material2TabsComponent;
}(JsfBaseComponent));
export { Material2TabsComponent };
