import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';

@Component({
  selector: 'material2-section',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="mk-section-wrap" id="{{option.id}}{{idDimension}}" *ngIf="option.dispCondition === undefined || jsf.viewCondition(parentGroup, option)" [style.width]="option.width">
  <div class="mk-section-title-wrap"
    [style.display]="option.title === undefined ? 'none' : ''">
      {{option.title | mk_ng2_i18n: page.pageID}}
    <span class="mk-titleNote" *ngIf="option.titleNote !== undefined">
      {{option.titleNote | mk_ng2_i18n: page.pageID}}
    </span>
    <span *ngIf="option.viewDimension === true">
      {{dimension+1}}
    </span>
    <span class="mk-section-allSelect"
      [style.display]="option.allSelect === undefined ? 'none' : ''">
      <button mat-button type="button" (click)="jsf.allSelect(pGroup, option.items, true)">
        {{ option.allSelect | mk_ng2_i18n: 'button' }}
      </button>
    </span>
    <span class="mk-section-allClear"
      [style.display]="option.allClear === undefined ? 'none' : ''">
      <button mat-button type="button" (click)="jsf.allSelect(pGroup, option.items, false)">
        {{ option.allClear | mk_ng2_i18n: 'button' }}
      </button>
    </span>
    <ng-container *ngIf="option.openLabel !== undefined">
      <span class="mk-section-open" *ngIf="!sectionOpened">
        <button mat-button (click)="opened(true)">
          {{ option.openLabel | mk_ng2_i18n: 'button' }}
        </button>
      </span>
      <span class="mk-section-close" *ngIf="sectionOpened">
        <button mat-button (click)="opened(false)">
          {{ option.closeLabel | mk_ng2_i18n: 'button' }}
        </button>
      </span>
    </ng-container>
  </div>
  <div class="mk-section-note"
    [style.display]="option.note === undefined ? 'none' : ''"
    [innerHTML]="option.note | mk_ng2_i18n: page.pageID">
  </div>
  <div *ngIf="option.previousLabel !== undefined">
    {{ option.previousLabel | mk_ng2_i18n: page.pageID }}
  </div>
  <div *ngIf="sectionOpened"
    id="{{option.id}}{{idDimension}}"
    [ngClass]="option.direction === 'column' ? 'mk-section-content-wrap-column ' : 'mk-section-content-wrap-row'"
    [style.justify-content]="option.justifyContent">
    <jsf-root *ngFor="let widget of option.items; let i=index;"
      id="{{widget.title}}"
      [fxFlex]="widget.flex === undefined ? '1 1 auto' : widget.flex"
      [widgets]="widgets"
      [debug]="debug"
      [innerOption]="innerOption"
      [parentGroup]="pGroup"
      [page]="page"
      [schema]="schema"
      [master]="master"
      [data]="data"
      [option]="widget"
      [direction]="direction"
      [dimension]="dimension"
      [index]="i"
      [num]="num"
      (buttonClick)="buttonClicked($event)">
    </jsf-root>
  </div>
  <div *ngIf="option.postLabel !== undefined">
    {{ option.postLabel | mk_ng2_i18n: page.pageID }}
  </div>
</div>
`,
  styles: [`
  .mk-section-wrap {
    padding: 0px;
    margin: 0px;
  }
  .mk-section-title-wrap {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    margin: 0px 0px;
    padding: 0px;
  }
  .mk-section-open,
  .mk-section-close {
    float: right;
    vertical-align: middle;
    cursor: pointer;
  }
  .mk-section-content-wrap-row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .mk-section-content-wrap-column {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .margin-left {
    margin-left: auto;
  }
  .margin-right {
    margin-right: auto;
  }
  .mk-titleNote {
    margin-left: 20px;
    font-size: small;
    font-weight: 550;
  }
`]
})
export class Material2SectionComponent extends JsfBaseComponent implements OnInit, OnDestroy {
  sectionkind = 'normal';
  pGroup: FormGroup;

  // ボタンによる表示制御用変数
  sectionOpened = true;
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
    // セッションオープン/クローズ初期設定
    if ( this.option.open !== undefined ) {
      this.sectionOpened = this.option.open;
    }
    if ( this.schema.properties[this.option.key] !== undefined &&
        this.schema.properties[this.option.key].type === 'object' ) {
      this.sectionkind = 'object';
      const cName = 'controls';
      this.pGroup = this.parentGroup.controls[this.option.key][cName][0];
    } else {
      this.sectionkind = 'normal';
      this.pGroup = this.parentGroup;
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
    this.sectionOpened = flag;
  }

  /**
   * child widgetのイベントをparentに転送する
   * @param event
   */
  buttonClicked(event: any) {
    this.buttonClick.next(event);
  }
}
