import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';

@Component({
  selector: 'material2-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="mk-radio-wrap"
  [formGroup]="parentGroup"
  [style.flex-direction]="option.direction">
  <label
    fxFlex="{{option.labelFlex}}"
    [attr.for]="option.key"
    [style.display]="option.title !== undefined ? '' : 'none'"
    [innerHTML]="option.title | mk_ng2_i18n: page.pageID">
  </label>
  <mat-radio-group class="mk-radio-group-wrap"
    id="{{option.key}}"
    [style.flex-direction]="option.itemDirection"
    [align]="option.labelPosition !== undefined ? option.labelPosition : 'start'"
    [formControlName]="option.key">
    <ng-container *ngFor="let selectItem of selectList">
      <mat-radio-button
        fxFlex="{{option.itemFlex}}"
        [name]="selectItem.key"
        [color]="option.color"
        [value]="selectItem.value">
        <span [innerHTML]="selectItem.key  | mk_ng2_i18n: page.pageID"></span>
        <span *ngIf="option.viewNote" [innerHTML]="selectItem.note  | mk_ng2_i18n: page.pageID"></span>
      </mat-radio-button>
    </ng-container>
  </mat-radio-group>
  <mat-error>{{ formErrors[option.key] }}</mat-error>
</div>
`,
  styles: [`
  .mk-radio-wrap {
    display: flex;
    flex-wrap: wrap;
    margin-right: 8px;
    margin-bottom: 8px;
  }
  .mk-radio-group-wrap {
    display: flex;
    flex-wrap: wrap;
  }
`]
})
export class Material2RadioComponent extends JsfBaseComponent implements OnInit, OnDestroy {
  selectList: any = null;
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
    // 選択肢取得
    this.selectList = this.jsf.getMaster(this.master, this.schema.properties, this.option.master);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
