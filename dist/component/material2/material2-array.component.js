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
var Material2ArrayComponent = (function (_super) {
    __extends(Material2ArrayComponent, _super);
    function Material2ArrayComponent(jsf) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        return _this;
    }
    Material2ArrayComponent.prototype.ngOnInit = function () {
        // ベースの変更
        this.changeBase();
        var cName = 'controls';
        if (this.option.key !== 'button') {
            this.pGroup = this.parentGroup.controls[this.option.key][cName];
            var minItems = this.schema.properties[this.option.key].minItems || 1;
            var maxItems = this.schema.properties[this.option.key].maxItems || 10;
            this.innerOption = {
                minItems: minItems,
                maxItems: maxItems
            };
        }
        else {
            this.pGroup = null;
        }
    };
    Material2ArrayComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    Material2ArrayComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-array',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<div class=\"mk-array-wrap\" [formGroup]=\"parentGroup\">\n  <div *ngFor=\"let w of pGroup; let i=index\" [formArrayName]=\"option.key\">\n    <div class=\"mk-array-title\" [style.display]=\"option.title === undefined ? 'none' : ''\">\n      <div class=\"mk-array-title-spacer\">\n        {{ option.title | mk_ng2_i18n: page.pageID }}\n        <span *ngIf=\"option.viewDimension === true\">\n          {{i + 1}}\n        </span>\n      </div>\n      <mat-icon class=\"mk-array-cursor\"\n        [style.display]=\"option.addIcon === undefined ? 'none' : ''\"\n        [style.visibility]=\"parentGroup.controls[option.key].controls.length > 1 && i < maxItems ? 'visible' : 'hidden'\"\n        (click)=\"jsf.addItem(schema, parentGroup.controls, option.key, data)\">{{ option.addIcon }}\n      </mat-icon>\n      <mat-icon class=\"mk-array-cursor\"\n        [style.display]=\"option.removeIcon === undefined ? 'none' : ''\"\n        [style.visibility]=\"parentGroup.controls[option.key].controls.length > 1 && i > minItems ? 'visible' : 'hidden'\"\n        (click)=\"jsf.removeItem(parentGroup, option.key, i)\">{{ option.removeIcon }}\n      </mat-icon>\n    </div>\n    <div *ngIf=\"option.previousLabel !== undefined && i !== 0\">\n      {{ option.previousLabel | mk_ng2_i18n: page.pageID }}\n    </div>\n    <jsf-root class=\"mk-array-body\" *ngFor=\"let item of option.items; let j=index\"\n      [widgets]=\"widgets\"\n      [debug]=\"debug\"\n      [innerOption]=\"innerOption\"\n      [parentGroup]=\"pGroup[i]\"\n      [page]=\"page\"\n      [schema]=\"schema\"\n      [master]=\"master\"\n      [data]=\"data\"\n      [option]=\"option.items[j]\"\n      [num]=\"parentGroup.controls[option.key].controls.length\"\n      [dimension]=\"i\">\n    </jsf-root>\n    <div *ngIf=\"option.postLabel !== undefined\">\n      {{ option.postLabel | mk_ng2_i18n: page.pageID }}\n    </div>\n  </div>\n  <div class=\"mk-array-control\" [style.display]=\"option.add === undefined ? 'none' : ''\">\n    <a (click)=\"jsf.addItem(schema, parentGroup.controls, option.key, data)\" style=\"cursor: pointer;\">\n      {{ option.add | mk_ng2_i18n: page.pageID }}\n    </a>\n  </div>\n</div>\n",
                    styles: ["\n  .mk-array-wrap {\n    margin: auto;\n  }\n\n  .mk-array-title {\n    -ms-flex-line-pack: center;\n    align-content: center;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    padding: 8px 20px;\n    color: rgba(0,0,0,.54);\n    background: rgba(0,0,0,.03);\n  }\n\n  .mk-array-title-spacer {\n    -webkit-box-flex: 1;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n  }\n\n  .mk-array-body {\n    margin: 10px 0px;\n  }\n\n  .mk-array-control {\n    margin: 10px 0px;\n  }\n\n  .mk-array-cursor {\n    cursor: pointer;\n  }\n"],
                    providers: [JsfService]
                },] },
    ];
    /** @nocollapse */
    Material2ArrayComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    return Material2ArrayComponent;
}(JsfBaseComponent));
export { Material2ArrayComponent };
