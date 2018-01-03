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
/**
 * history
 *  2017/10/30 iconボタンサポート
 */
import { Component, Input, OnInit, OnDestroy, Inject, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
var Material2ButtonComponent = /** @class */ (function (_super) {
    __extends(Material2ButtonComponent, _super);
    function Material2ButtonComponent(jsf, dialog) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        _this.dialog = dialog;
        // トグルボタン機能
        _this.toggleFlag = 'off';
        // idの次元数
        _this.idDimension = '';
        return _this;
    }
    Material2ButtonComponent.prototype.ngOnInit = function () {
        // ベースの変更
        this.changeBase();
        // idの次元数設定
        this.idDimension = '';
        if (this.dimension > 0) {
            this.idDimension = '_' + this.dimension.toString();
        }
        // トグルボタン機能
        if (this.option.kind === 'toggle') {
            this.toggleFlag = 'off';
            this.parentGroup.controls[this.option.key].setValue(this.toggleFlag);
        }
    };
    Material2ButtonComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    // トグルボタン切替処理
    // トグルボタン切替処理
    Material2ButtonComponent.prototype.onToggle = 
    // トグルボタン切替処理
    function () {
        if (this.option.kind === 'toggle') {
            if (this.toggleFlag === 'on') {
                this.toggleFlag = 'off';
            }
            else {
                this.toggleFlag = 'on';
            }
            this.parentGroup.controls[this.option.key].setValue(this.toggleFlag);
        }
    };
    Material2ButtonComponent.prototype.onClick = function (kind, target) {
        switch (kind) {
            case 'add':
                this.jsf.addItem(this.schema, this.parentGroup.controls, target, this.data);
                break;
            case 'popup':
                this.auxiliaryForm = this.jsf.schemaToFormGroup(this.option.popupSchema, {});
                this.openDialog();
                break;
            default:
                this.buttonClick.next({
                    'obj': this.parentGroup.value,
                    'kind': kind
                });
                break;
        }
    };
    /**
     * 補助入力用dialog処理
     */
    /**
       * 補助入力用dialog処理
       */
    Material2ButtonComponent.prototype.openDialog = /**
       * 補助入力用dialog処理
       */
    function () {
        var dialogRef = this.dialog.open(AuxiliaryInputDialogComponent, {
            width: this.option.popupWidth,
            data: {
                popupitems: this.option.popupitems,
                popupTitle: this.option.popupTitle,
                popupNote: this.option.popupNote,
                widgets: this.widgets,
                parentGroup: this.auxiliaryForm,
                page: this.page,
                schema: this.schema,
                master: this.master,
                data: {},
                direction: this.direction,
                dimension: this.dimension,
                viewButton: this.option.viewButton === undefined ? true : this.option.viewButton
            }
        });
        var _option = this.option;
        var _auxiliaryForm = this.auxiliaryForm;
        var _parentGroup = this.parentGroup;
        this.services[0] = dialogRef.afterClosed().subscribe(function (result) {
            if (result === 'ok') {
                Object.keys(_option.popupitems).forEach(function (id) {
                    var key = _option.popupitems[id].key;
                    var targetKey = _option.popupitems[id].targetKey;
                    var value = _auxiliaryForm.controls[key].value;
                    if (value !== null) {
                        _parentGroup.controls[targetKey].setValue(value);
                    }
                });
            }
        });
    };
    Material2ButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-button',
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<button *ngIf=\"option.kind !== 'toggle' && option.icon === undefined && jsf.viewCondition(parentGroup, option)\"\n  type=\"button\"\n  id=\"{{option.title}}{{idDimension}}\"\n  mat-raised-button=\"mat-raised-button\"\n  [color]=\"option.color\"\n  [attr.type]=\"option.kind === 'submit' ? 'submit' : 'button'\"\n  (click)=\"onClick(option.kind, option.target)\"\n  [disabled]=\"option.kind === 'submit' ? !parentGroup.valid : false\">\n  {{ option.title | mk_ng2_i18n: 'button' }}\n</button>\n<button *ngIf=\"option.kind !== 'toggle' && option.icon !== undefined && jsf.viewCondition(parentGroup, option)\"\n  type=\"button\"\n  id=\"{{option.title}}{{idDimension}}\"\n  (click)=\"onClick(option.kind, option.target)\"\n  mat-icon-button>\n  <mat-icon class=\"mk-icon-wrap mk-icon-cursor\">\n    {{ option.icon }}\n  </mat-icon>\n</button>\n<button *ngIf=\"option.kind === 'toggle'\"\n    type=\"button\"\n    id=\"{{option.title}}{{idDimension}}\"\n    mat-raised-button=\"mat-raised-button\"\n    [color]=\"option.color\"\n    (click)=\"onToggle()\">\n  <span *ngIf=\"toggleFlag === 'on'\">  {{ option.onTitle | mk_ng2_i18n: 'button' }} </span>\n  <span *ngIf=\"toggleFlag === 'off'\"> {{ option.offTitle | mk_ng2_i18n: 'button' }} </span>\n</button>\n",
                    styles: ["\n  button {\n    margin-right: 8px;\n  }\n  .margin-left {\n    margin-left: auto;\n  }\n  .margin-right {\n    margin-right: auto;\n  }\n  .mk-icon-wrap {\n    margin-top: 0px;\n    padding-right: 10px;\n    height: 30px;\n    width: 30px;\n  }\n  .mat-icon {\n    font-size: 30px;\n    height: 30px;\n    width: 30px;\n  }\n  .mk-icon-cursor {\n    cursor: pointer;\n  }\n"],
                    providers: [JsfService]
                },] },
    ];
    /** @nocollapse */
    Material2ButtonComponent.ctorParameters = function () { return [
        { type: JsfService, },
        { type: MatDialog, },
    ]; };
    return Material2ButtonComponent;
}(JsfBaseComponent));
export { Material2ButtonComponent };
var AuxiliaryInputDialogComponent = /** @class */ (function () {
    function AuxiliaryInputDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    AuxiliaryInputDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AuxiliaryInputDialogComponent.prototype.buttonClicked = function (event) {
        if (event.kind === 'ok') {
            this.dialogRef.close('ok');
        }
    };
    AuxiliaryInputDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-auxiliary-dialog',
                    template: "\n  <h1 mat-dialog-title>\n    <ul>\n      <li  *ngIf=\"data.popupTitle !== undefined\">\n        {{ data.popupTitle | mk_ng2_i18n: data.page.pageID }}\n      </li>\n      <li>\n        <button mat-icon-button (click)=\"onNoClick()\" >\n          <mat-icon>close</mat-icon>\n        </button>\n      </li>\n    </ul>\n  </h1>\n  <div mat-dialog-content>\n    <p *ngIf=\"data.popupNote !== undefined\">\n      {{ data.popupNote | mk_ng2_i18n: data.page.pageID }}\n    </p>\n    <jsf-root *ngFor=\"let widget of data.popupitems; let i=index;\"\n      [fxFlex]=\"widget.flex === undefined ? '1 1 auto' : widget.flex\"\n      [widgets]=\"data.widgets\"\n      [debug]=\"debug\"\n      [innerOption]=\"innerOption\"\n      [parentGroup]=\"data.parentGroup\"\n      [page]=\"data.page\"\n      [schema]=\"data.schema\"\n      [master]=\"data.master\"\n      [data]=\"data.data\"\n      [option]=\"widget\"\n      [direction]=\"data.direction\"\n      [dimension]=\"data.dimension\"\n      [index]=\"i\"\n      (buttonClick)=\"buttonClicked($event)\">\n    </jsf-root>\n  </div>\n  <div mat-dialog-actions *ngIf=\"data.viewButton\">\n    <button mat-raised-button color=\"primary\" [mat-dialog-close]=\"'ok'\" tabindex=\"2\">\n      {{ 'ok' | mk_ng2_i18n: 'button' }}\n    </button>\n    <!--\n    <button mat-raised-button (click)=\"onNoClick()\" tabindex=\"-1\">\n      {{ 'cancel' | mk_ng2_i18n: 'button' }}\n    </button>\n    -->\n  </div>\n",
                    styles: ["\n.mat-dialog-actions {\n  flex-wrap: nowrap;\n}\nul {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  list-style: none;\n  margin: 0;\n  padding-left: 1em;\n  text-indent: -1em;\n}\nul li:last-of-type {\n  margin-left: auto;\n}\n"],
                },] },
    ];
    /** @nocollapse */
    AuxiliaryInputDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef, },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
    ]; };
    return AuxiliaryInputDialogComponent;
}());
export { AuxiliaryInputDialogComponent };
