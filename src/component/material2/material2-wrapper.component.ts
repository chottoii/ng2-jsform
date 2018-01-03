import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';

@Component({
  selector: 'material2-wrapper',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="mk-wrapper-wrap" id="{{option.id}}{{idDimension}}" *ngIf="option.dispCondition === undefined || jsf.viewCondition(parentGroup, option)">
  <div class="mk-wrapper-title"
    [style.display]="option.title === undefined ? 'none' : ''">
      {{option.title | mk_ng2_i18n: page.pageID}}
      <span class="mk-wrapper-open" *ngIf="!wrapperOpened">
        <button mat-button="mat-button" (click)="opened(true)">
          {{ option.openLabel | mk_ng2_i18n: 'button' }}
        </button>
      </span>
      <span class="mk-wrapper-close" *ngIf="wrapperOpened">
        <button mat-button="mat-button" (click)="opened(false)">
          {{ option.closeLabel | mk_ng2_i18n: 'button' }}
        </button>
      </span>
  </div>
  <div class="mk-wrapper-body" *ngIf="wrapperOpened">
    <div class="mk-wrapper-note"
      [style.display]="option.note === undefined ? 'none' : ''">
      {{ option.note | mk_ng2_i18n: page.pageID }}
    </div>
    <ng-container *ngFor="let widget of option.items">
      <jsf-root *ngIf="widget.closedView === undefined || widget.closedView !== true"
        fxFlex="{{widget.flex}}"
        [widgets]="widgets"
        [debug]="debug"
        [innerOption]="innerOption"
        [parentGroup]="parentGroup"
        [page]="page"
        [schema]="schema"
        [master]="master"
        [data]="data"
        [option]="widget"
        [direction]="direction"
        [num]="num"
        [index]="index"
        [dimension]="dimension">
      </jsf-root>
    </ng-container>
  </div>
  <div class="mk-wrapper-body" *ngIf="!wrapperOpened">
    <ng-container *ngFor="let widget of option.items">
      <jsf-root *ngIf="widget.closedView !== undefined && widget.closedView === true"
        fxFlex="{{widget.flex}}"
        [widgets]="widgets"
        [debug]="debug"
        [innerOption]="innerOption"
        [parentGroup]="parentGroup"
        [page]="page"
        [schema]="schema"
        [master]="master"
        [data]="data"
        [option]="widget"
        [direction]="direction"
        [num]="num"
        [index]="index"
        [dimension]="dimension">
      </jsf-root>
    </ng-container>
  </div>
</div>
`,
  styles: [`
  .mk-wrapper-wrap {
    padding: 0px 0px 0px 0px;
    margin:  8px 0px 8px 0px;
    border: 1px solid #eee;
  }
  .mk-wrapper-title {
    background-color: #eee;
    display: block;
    margin: 0px 0px;
    padding: 10px;
    text-align: center;
  }
  .mk-wrapper-open,
  .mk-wrapper-close {
    float: right;
    vertical-align: middle;
    cursor: pointer;
  }
  .mk-wrapper-body {
    padding: 8px;
    margin:  0px;
  }
  .mat-button {
    margin-top: -14px;
    height: 32px;
  }
`]
})
export class Material2WrapperComponent extends JsfBaseComponent implements OnInit, OnDestroy  {
  sectionkind = 'normal';

  // 条件付き表示制御用変数
  // dispConditionTarget = '';
  // dispConditionValue  = null;
  // ボタンによる表示制御用変数
  wrapperOpened = true;
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

    // idの次元数設定
    this.idDimension = '';
    if ( this.dimension > 0 ) {
      this.idDimension = '_' + this.dimension.toString();
    }
    // 表示条件取得
    /*
    if ( this.option.dispCondition !== undefined ) {
      const condition = this.option.dispCondition.split('=');
      this.dispConditionTarget = condition[0];
      this.dispConditionValue = condition[1];
    }
    */
    // セッションオープン/クローズ初期設定
    if ( this.option.open !== undefined ) {
      this.wrapperOpened = this.option.open;
    }

    // 構文チェック
    if ( this.option.items === null || this.option.items === undefined ) {
      throw new Error('wrapperのitems要素が未定義です。');
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  /**
   * ボタン制御による表示制御
   * @param flag
   */
  opened(flag: boolean) {
    this.wrapperOpened = flag;
  }
}
