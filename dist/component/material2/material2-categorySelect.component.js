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
// 履歴
//  2017/12/21 暫定的にフィルタ機能を導入　採用するかどうか要検討
import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormArray } from '@angular/forms';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
var Material2CategorySelectComponent = /** @class */ (function (_super) {
    __extends(Material2CategorySelectComponent, _super);
    function Material2CategorySelectComponent(jsf) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        /** 選択リスト */
        _this.selectList = null;
        return _this;
    }
    Material2CategorySelectComponent.prototype.ngOnInit = function () {
        // ベースの変更
        this.changeBase();
        // 選択肢フィルター関数機能
        if (this.option.filterFunc !== undefined) {
            this.selectList = this.option.filterFunc(this.jsf.getForm());
        }
        else {
            this.selectList = this.jsf.getMaster(this.master, this.schema.properties, this.option.master);
            // filter機能のサポート
            if (this.option.filter !== undefined) {
                var topForm = this.jsf.getForm();
                var controlsName = 'controls';
                var filtervalue = '';
                // filterTargetがある場合は、array処理を行う
                if (this.option.filterTarget !== undefined) {
                    var formArray = topForm.controls[this.option.filterTarget];
                    filtervalue = formArray[controlsName][this.dimension].controls[this.option.filter].value;
                }
                else if (topForm.controls[this.option.filter] !== undefined) {
                    filtervalue = topForm.controls[this.option.filter].value;
                }
                this.selectList = this.selectList[filtervalue];
            }
        }
    };
    Material2CategorySelectComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    Material2CategorySelectComponent.prototype.selectValue = function (value) {
        this.parentGroup.controls[this.option.key].setValue(value);
        this.buttonClick.next({
            'kind': 'ok'
        });
    };
    Material2CategorySelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-category-select',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<ng-container *ngIf=\"selectList.group !== undefined\">\n  <div class=\"mk-category-select-wrap\">\n    <div class=\"mk-category-select-group\" *ngFor=\"let group of selectList.group\">\n      <div class=\"mk-category-select-item\">\n        <span> {{ group.title | mk_ng2_i18n: page.pageID }}</span>\n        <div *ngFor=\"let selectItem of group.items\">\n          <a href=\"javascript:void(0)\"\n            (click)=selectValue(selectItem.value)>\n            {{ selectItem.key  | mk_ng2_i18n: page.pageID }}\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n<ng-container *ngIf=\"selectList.group === undefined\">\n  <div class=\"mk-category-select-wrap-column\">\n    <p *ngFor=\"let selectItem of selectList\">\n      <a href=\"javascript:void(0)\"\n        (click)=selectValue(selectItem.value)>\n        {{ selectItem.key  | mk_ng2_i18n: page.pageID }}\n      </a>\n    </p>\n  </div>\n</ng-container>\n",
                    styles: ["\n  .mk-category-select-wrap {\n    display: flex;\n    flex-wrap: wrap;\n    flex-direction: row;\n  }\n  .mk-category-select-group {\n    flex: 1 1 auto;\n    display: flex;\n    flex-wrap: wrap;\n    flex-direction: column;\n  }\n  .mk-category-select-group span {\n    font-weight: 700;\n    text-align: center;\n  }\n  .mk-category-select-item {\n  }\n  .mk-category-select-wrap-column {\n    display: flex;\n    flex-wrap: wrap;\n    flex-direction: column;\n  }\n"]
                },] },
    ];
    /** @nocollapse */
    Material2CategorySelectComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    return Material2CategorySelectComponent;
}(JsfBaseComponent));
export { Material2CategorySelectComponent };
