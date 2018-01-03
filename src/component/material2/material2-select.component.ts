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

@Component({
  selector: 'material2-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<mat-form-field class="mk-select-wrap" [formGroup]="parentGroup">
  <mat-select id="{{option.key}}{{idDimension}}"
    (ngModelChange)="modelChange($event)"
    [formControlName]="option.key"
    placeholder="{{ option.title | mk_ng2_i18n: page.pageID }}"
    [attr.name]="option.title"
    [style.width]="option.width">
    <ng-container *ngIf="option.filter === undefined">
      <ng-container *ngIf="filterdList.group === undefined">
        <mat-option *ngFor="let selectItem of filterdList"
          [value]="selectItem.value">{{ selectItem.key  | mk_ng2_i18n: page.pageID }}
        </mat-option>
      </ng-container>
      <ng-container *ngIf="filterdList.group !== undefined">
        <mat-optgroup *ngFor="let group of filterdList.group" [label]="group.title | mk_ng2_i18n: page.pageID">
          <mat-option *ngFor="let selectItem of group.items"
            [value]="selectItem.value">{{ selectItem.key  | mk_ng2_i18n: page.pageID }}
          </mat-option>
        </mat-optgroup>
      </ng-container>
    </ng-container>
    <ng-container *ngIf="option.filter !== undefined">
      <ng-container *ngIf="listArray[option.key].group === undefined">
        <mat-option *ngFor="let selectItem of listArray[option.key]"
          [value]="selectItem.value">{{ selectItem.key  | mk_ng2_i18n: page.pageID }}
        </mat-option>
      </ng-container>
      <ng-container *ngIf="listArray[option.key].group !== undefined">
        <optgroup let group of listArray[option.key].group label="{{ group.title | mk_ng2_i18n: page.pageID }}">
          <mat-option *ngFor="let selectItem of group.items"
            [value]="selectItem.value">{{ selectItem.key  | mk_ng2_i18n: page.pageID }}
          </mat-option>
        </optgroup>
      </ng-container>
    </ng-container>
  </mat-select>
  <mat-error>{{ formErrors[option.key] }}</mat-error>
</mat-form-field>
<material2-button *ngIf="option.composite"
  class="composite-style"
  [fxFlex]="option.composite.flex === undefined ? '1 1 auto' : option.composite.flex"
  [widgets]="widgets"
  [parentGroup]="parentGroup"
  [page]="page"
  [schema]="schema"
  [master]="master"
  [data]="data"
  [option]="option.composite"
  [direction]="direction"
  [dimension]="dimension"
  (buttonClick)="buttonClicked($event)">
</material2-button>
`,
  styles: [`
  .mk-select-wrap {
    margin: 0;
    padding: 0;
  }
  mat-select {
    margin-right: 8px;
    width: 95%;
  }
  @media (max-width: 600px) {
    .composite-style {
      display: none;
    }
  }
`]
})
export class Material2SelectComponent extends JsfBaseComponent implements OnInit, OnChanges, OnDestroy  {
  /** 選択リスト */
  selectList: any = null;
  /** 関連選択リスト */
  selectSubList: any = null;
  filterdList: any = null;

  /** 共有データ */
  listArray = [];
  filterValue = ''; // masterのフィルタ値
  // idの次元数
  idDimension = '';

  constructor(
    public jsf: JsfService
  ) {
    super(jsf);
  }

  ngOnInit() {
    // ベースの変更
    this.changeBase();

    let serviceId = -1;

    // idの次元数設定
    this.idDimension = '';
    if ( this.dimension > 0 ) {
      this.idDimension = '_' + this.dimension.toString();
    }
    // フィルタ更新のための監視設定
    if ( this.option.watchItems !== undefined ) {
      for ( const value of this.option.watchItems.split(',') ) {
        const nameControl = this.jsf.getForm().get(value);
        serviceId++;
        this.services[serviceId] = nameControl.valueChanges
          .subscribe(data => this.setSelectList());
      }
    }

    // 初期設定＆共有データ監視(サブマスタ処理)
    if ( this.option.filter !== undefined ) {
      this.filterValue = this.parentGroup.controls[this.option.filter].value;
      serviceId++;
      this.services[serviceId] = this.shared.sharedPara$.subscribe(
        (data) => {
          if ( data.kind === 'filter' && data.dimension === this.dimension ) {
            this.listArray[this.option.key] = data.list;
            this.filterValue = data.filterValue;
          }
        }
      );
    }

    // 初期設定＆共有データ監視(ヒント処理)
    if ( this.option.hintKey !== undefined ) {
      this.filterValue = this.parentGroup.controls[this.option.hintKey].value;
      serviceId++;
      this.services[serviceId] = this.shared.sharedPara$.subscribe(
        (data) => {
          if ( data.kind === 'filter' && data.dimension === this.dimension ) {
            this.listArray[this.option.key] = data.list;
            this.filterValue = data.filterValue;
          }
        }
      );
    }

    // 選択肢取得
    // TODO フィルタ設定時は既定値が必須
    this.setSelectList();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.setSelectList();
  }

  setSelectList() {
    // 選択肢フィルター関数機能
    if ( this.option.filterFunc !== undefined ) {
      this.selectList = this.option.filterFunc(this.jsf.getForm());
      this.filterdList = this.selectList;
    } else {
      // 選択肢取得
      // TODO フィルタ設定時は既定値が必須
      this.selectList = this.jsf.getMaster(this.master, this.schema.properties, this.option.master);
      if ( this.option.filterTarget !== undefined ) {
        this.selectSubList = this.jsf.getMaster(this.master, this.schema.properties, this.option.filterMaster);
        const defultValue = this.parentGroup.controls[this.option.key].value;
        const subList = this.selectSubList[defultValue];
        this.listArray = new Array(this.option.filterTarget);
        this.listArray[this.option.filterTarget] = subList;
      } else {
        // サブマスタのための初期設定
        if (this.option.filter !== undefined) {
          const initPara = this.parentGroup.controls[this.option.filter].value;
          this.listArray = new Array(this.option.key);
          this.listArray[this.option.key] = this.selectList[initPara];
        }
      }
      // フィルタなし時の選択肢設定
      if ( this.option.filter === undefined ) {
        this.filterdList = this.selectList;
      } else {
        // 初期設定を関連コンポーネントに転送
        // this.modelChange('jp_doc01');    
      }
    }

    // 変更時の選択肢がない場合は、第１要素に設定
    if ( this.filterdList !== null &&  this.filterdList.filter !== undefined) {
      const currentValue = this.parentGroup.controls[this.option.key].value;
      const checkValue = this.filterdList.filter(element => {
        return (element.value === currentValue);
      });
      if ( checkValue.length === 0 ) {
        this.parentGroup.controls[this.option.key].setValue(this.filterdList[0].value);
      }
    }
  }

  modelChange(event: any) {
    // フィルタ処理
    if ( this.option.filterTarget !== undefined ) {
      const subList = this.selectSubList[event];
      this.listArray[this.option.filterTarget] = subList;
      const data = {
        kind: 'filter',
        dimension: this.dimension,
        filterValue: event,
        list: subList
      }
      this.shared.sendPara(data);
      // 次のセレクトボックスで一番上を選択
      for (const list of subList) {
        if (list.default) {
          this.parentGroup.controls[this.option.target].setValue(list.value);
        }
      }
    }
    // ヒント設定処理(マルチターゲット対応)
    // 動的バリデーション用変数追加
    if ( this.option.hintTarget !== undefined ) {
      const selectValue = event;
      const hintData = this.jsf.getHint(this.master, this.option.master, selectValue, this.filterValue);
      for ( const value of this.option.hintTarget.split(',') ) {
        const data = {
          kind: 'setHint',
          key: value,
          dimension: this.dimension,
          hint: hintData.hint,
          pattern: hintData.pattern
        }
        this.shared.sendPara(data);
      }
    }
  }
}
