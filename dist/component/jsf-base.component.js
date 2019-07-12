import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsfService } from '../service/jsf.service';
var JsfBaseComponent = (function () {
    function JsfBaseComponent(jsf) {
        this.jsf = jsf;
        this.widgets = {};
        this.debug = false;
        this.innerOption = null;
        this.master = null;
        this.direction = 'row';
        this.dimension = 0;
        this.index = 0;
        this.num = 0;
        this.buttonClick = new EventEmitter();
        this.formErrors = {};
        this.parentService = [];
        // for child service
        this.services = [];
    }
    JsfBaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parentService[0] = this.parentGroup.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
    };
    JsfBaseComponent.prototype.ngOnDestroy = function () {
        this.parentService.forEach(function (e) {
            if (e) {
                e.unsubscribe();
            }
        });
        this.services.forEach(function (e) {
            if (e) {
                e.unsubscribe();
            }
        });
    };
    JsfBaseComponent.prototype.onValueChanged = function (event) {
        this.jsf.checkError(this.parentGroup, this.option, this.dimension, this.formErrors, this.page.pageID, null, false);
    };
    JsfBaseComponent.prototype.focusOutFunction = function (key) {
        this.jsf.checkError(this.parentGroup, this.option, this.dimension, this.formErrors, this.page.pageID, key, true);
    };
    /**
     * スキーマ構造化対応のためにベースを変更
     * 2017/12/30 スキーマ階層構造サポート
     */
    /**
       * スキーマ構造化対応のためにベースを変更
       * 2017/12/30 スキーマ階層構造サポート
       */
    JsfBaseComponent.prototype.changeBase = /**
       * スキーマ構造化対応のためにベースを変更
       * 2017/12/30 スキーマ階層構造サポート
       */
    function () {
        var formGroupInfo = this.jsf.getFormGroupKey(this.parentGroup, this.option.key, this.data);
        this.parentGroup = formGroupInfo.parent;
        this.option.key = formGroupInfo.key;
        this.data = formGroupInfo.data;
    };
    JsfBaseComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jsf-base',
                    template: "\n    <div></div>\n  "
                },] },
    ];
    /** @nocollapse */
    JsfBaseComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    JsfBaseComponent.propDecorators = {
        "widgets": [{ type: Input },],
        "debug": [{ type: Input },],
        "innerOption": [{ type: Input },],
        "parentGroup": [{ type: Input },],
        "page": [{ type: Input },],
        "schema": [{ type: Input },],
        "master": [{ type: Input },],
        "data": [{ type: Input },],
        "option": [{ type: Input },],
        "direction": [{ type: Input },],
        "dimension": [{ type: Input },],
        "index": [{ type: Input },],
        "num": [{ type: Input },],
        "shared": [{ type: Input },],
        "buttonClick": [{ type: Output },],
    };
    return JsfBaseComponent;
}());
export { JsfBaseComponent };
