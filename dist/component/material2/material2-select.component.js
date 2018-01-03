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
 *  2017/10/30 group機能追加
 *  2017/10/30 composite機能追加
 *  2017/12/21 リスト変更時にマスタのdefaultプロパティがtureの場合に、規定値を設定
 *  2017/12/21 リストフィルタリングで現在の設定値が、リスト内に無い場合、第１要素の選択
 *  2017/12/21 動的バリデーション機能
 */
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input, OnChanges, SimpleChange } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
var Material2SelectComponent = /** @class */ (function (_super) {
    __extends(Material2SelectComponent, _super);
    function Material2SelectComponent(jsf) {
        var _this = _super.call(this, jsf) || this;
        _this.jsf = jsf;
        /** 選択リスト */
        _this.selectList = null;
        /** 関連選択リスト */
        _this.selectSubList = null;
        _this.filterdList = null;
        /** 共有データ */
        _this.listArray = [];
        _this.filterValue = '';
        // idの次元数
        _this.idDimension = '';
        return _this;
    }
    Material2SelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        // ベースの変更
        this.changeBase();
        var serviceId = -1;
        // idの次元数設定
        this.idDimension = '';
        if (this.dimension > 0) {
            this.idDimension = '_' + this.dimension.toString();
        }
        // フィルタ更新のための監視設定
        if (this.option.watchItems !== undefined) {
            for (var _i = 0, _a = this.option.watchItems.split(','); _i < _a.length; _i++) {
                var value = _a[_i];
                var nameControl = this.jsf.getForm().get(value);
                serviceId++;
                this.services[serviceId] = nameControl.valueChanges
                    .subscribe(function (data) { return _this.setSelectList(); });
            }
        }
        // 初期設定＆共有データ監視(サブマスタ処理)
        if (this.option.filter !== undefined) {
            this.filterValue = this.parentGroup.controls[this.option.filter].value;
            serviceId++;
            this.services[serviceId] = this.shared.sharedPara$.subscribe(function (data) {
                if (data.kind === 'filter' && data.dimension === _this.dimension) {
                    _this.listArray[_this.option.key] = data.list;
                    _this.filterValue = data.filterValue;
                }
            });
        }
        // 初期設定＆共有データ監視(ヒント処理)
        if (this.option.hintKey !== undefined) {
            this.filterValue = this.parentGroup.controls[this.option.hintKey].value;
            serviceId++;
            this.services[serviceId] = this.shared.sharedPara$.subscribe(function (data) {
                if (data.kind === 'filter' && data.dimension === _this.dimension) {
                    _this.listArray[_this.option.key] = data.list;
                    _this.filterValue = data.filterValue;
                }
            });
        }
        // 選択肢取得
        // TODO フィルタ設定時は既定値が必須
        this.setSelectList();
    };
    Material2SelectComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    Material2SelectComponent.prototype.ngOnChanges = function (changes) {
        this.setSelectList();
    };
    Material2SelectComponent.prototype.setSelectList = function () {
        // 選択肢フィルター関数機能
        if (this.option.filterFunc !== undefined) {
            this.selectList = this.option.filterFunc(this.jsf.getForm());
            this.filterdList = this.selectList;
        }
        else {
            // 選択肢取得
            // TODO フィルタ設定時は既定値が必須
            this.selectList = this.jsf.getMaster(this.master, this.schema.properties, this.option.master);
            if (this.option.filterTarget !== undefined) {
                this.selectSubList = this.jsf.getMaster(this.master, this.schema.properties, this.option.filterMaster);
                var defultValue = this.parentGroup.controls[this.option.key].value;
                var subList = this.selectSubList[defultValue];
                this.listArray = new Array(this.option.filterTarget);
                this.listArray[this.option.filterTarget] = subList;
            }
            else {
                // サブマスタのための初期設定
                if (this.option.filter !== undefined) {
                    var initPara = this.parentGroup.controls[this.option.filter].value;
                    this.listArray = new Array(this.option.key);
                    this.listArray[this.option.key] = this.selectList[initPara];
                }
            }
            // フィルタなし時の選択肢設定
            if (this.option.filter === undefined) {
                this.filterdList = this.selectList;
            }
            else {
                // 初期設定を関連コンポーネントに転送
                // this.modelChange('jp_doc01');
            }
        }
        // 変更時の選択肢がない場合は、第１要素に設定
        if (this.filterdList !== null && this.filterdList.filter !== undefined) {
            var currentValue_1 = this.parentGroup.controls[this.option.key].value;
            var checkValue = this.filterdList.filter(function (element) {
                return (element.value === currentValue_1);
            });
            if (checkValue.length === 0) {
                this.parentGroup.controls[this.option.key].setValue(this.filterdList[0].value);
            }
        }
    };
    Material2SelectComponent.prototype.modelChange = function (event) {
        // フィルタ処理
        if (this.option.filterTarget !== undefined) {
            var subList = this.selectSubList[event];
            this.listArray[this.option.filterTarget] = subList;
            var data = {
                kind: 'filter',
                dimension: this.dimension,
                filterValue: event,
                list: subList
            };
            this.shared.sendPara(data);
            // 次のセレクトボックスで一番上を選択
            for (var _i = 0, subList_1 = subList; _i < subList_1.length; _i++) {
                var list = subList_1[_i];
                if (list.default) {
                    this.parentGroup.controls[this.option.target].setValue(list.value);
                }
            }
        }
        // ヒント設定処理(マルチターゲット対応)
        // 動的バリデーション用変数追加
        if (this.option.hintTarget !== undefined) {
            var selectValue = event;
            var hintData = this.jsf.getHint(this.master, this.option.master, selectValue, this.filterValue);
            for (var _a = 0, _b = this.option.hintTarget.split(','); _a < _b.length; _a++) {
                var value = _b[_a];
                var data = {
                    kind: 'setHint',
                    key: value,
                    dimension: this.dimension,
                    hint: hintData.hint,
                    pattern: hintData.pattern
                };
                this.shared.sendPara(data);
            }
        }
    };
    Material2SelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material2-select',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n<mat-form-field class=\"mk-select-wrap\" [formGroup]=\"parentGroup\">\n  <mat-select id=\"{{option.key}}{{idDimension}}\"\n    (ngModelChange)=\"modelChange($event)\"\n    [formControlName]=\"option.key\"\n    placeholder=\"{{ option.title | mk_ng2_i18n: page.pageID }}\"\n    [attr.name]=\"option.title\"\n    [style.width]=\"option.width\">\n    <ng-container *ngIf=\"option.filter === undefined\">\n      <ng-container *ngIf=\"filterdList.group === undefined\">\n        <mat-option *ngFor=\"let selectItem of filterdList\"\n          [value]=\"selectItem.value\">{{ selectItem.key  | mk_ng2_i18n: page.pageID }}\n        </mat-option>\n      </ng-container>\n      <ng-container *ngIf=\"filterdList.group !== undefined\">\n        <mat-optgroup *ngFor=\"let group of filterdList.group\" [label]=\"group.title | mk_ng2_i18n: page.pageID\">\n          <mat-option *ngFor=\"let selectItem of group.items\"\n            [value]=\"selectItem.value\">{{ selectItem.key  | mk_ng2_i18n: page.pageID }}\n          </mat-option>\n        </mat-optgroup>\n      </ng-container>\n    </ng-container>\n    <ng-container *ngIf=\"option.filter !== undefined\">\n      <ng-container *ngIf=\"listArray[option.key].group === undefined\">\n        <mat-option *ngFor=\"let selectItem of listArray[option.key]\"\n          [value]=\"selectItem.value\">{{ selectItem.key  | mk_ng2_i18n: page.pageID }}\n        </mat-option>\n      </ng-container>\n      <ng-container *ngIf=\"listArray[option.key].group !== undefined\">\n        <optgroup let group of listArray[option.key].group label=\"{{ group.title | mk_ng2_i18n: page.pageID }}\">\n          <mat-option *ngFor=\"let selectItem of group.items\"\n            [value]=\"selectItem.value\">{{ selectItem.key  | mk_ng2_i18n: page.pageID }}\n          </mat-option>\n        </optgroup>\n      </ng-container>\n    </ng-container>\n  </mat-select>\n  <mat-error>{{ formErrors[option.key] }}</mat-error>\n</mat-form-field>\n<material2-button *ngIf=\"option.composite\"\n  class=\"composite-style\"\n  [fxFlex]=\"option.composite.flex === undefined ? '1 1 auto' : option.composite.flex\"\n  [widgets]=\"widgets\"\n  [parentGroup]=\"parentGroup\"\n  [page]=\"page\"\n  [schema]=\"schema\"\n  [master]=\"master\"\n  [data]=\"data\"\n  [option]=\"option.composite\"\n  [direction]=\"direction\"\n  [dimension]=\"dimension\"\n  (buttonClick)=\"buttonClicked($event)\">\n</material2-button>\n",
                    styles: ["\n  .mk-select-wrap {\n    margin: 0;\n    padding: 0;\n  }\n  mat-select {\n    margin-right: 8px;\n    width: 95%;\n  }\n  @media (max-width: 600px) {\n    .composite-style {\n      display: none;\n    }\n  }\n"]
                },] },
    ];
    /** @nocollapse */
    Material2SelectComponent.ctorParameters = function () { return [
        { type: JsfService, },
    ]; };
    return Material2SelectComponent;
}(JsfBaseComponent));
export { Material2SelectComponent };
