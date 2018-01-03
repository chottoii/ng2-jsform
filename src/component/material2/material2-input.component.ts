/**
 * history
 *  2017/12/21 動的バリデーション機能
 */
import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';

@Component({
  selector: 'material2-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<ng-container>
  <div [formGroup]="parentGroup">
    <p *ngIf="option.previousLabel !== undefined">{{ option.previousLabel | mk_ng2_i18n: page.pageID }}</p>
    <mat-input-container>
      <span matPrefix *ngIf="option.prefix !== undefined">{{option.prefix}}</span>
      <input matInput
         placeholder="{{option.title | mk_ng2_i18n: page.pageID}}"
         maxlength="{{option.maxLength}}"
         id="{{option.key}}{{idDimension}}"
         (focusout)="focusOutFunction(option.key)"
         [formControlName]="option.key"/>
      <span matSuffix *ngIf="option.suffix !== undefined">{{option.suffix}}</span>
      <mat-hint *ngIf="option.hint !== undefined && hintPosition !== 'start'" align="end">
        {{ hint | mk_ng2_i18n: page.pageID }}
      </mat-hint>
      <mat-hint *ngIf="option.hint !== undefined && hintPosition === 'start'" align="start">
        {{ hint | mk_ng2_i18n: page.pageID }}
      </mat-hint>
      <mat-hint *ngIf="option.viewRemaining !== undefined && option.viewRemaining === true" align="end">
        {{ option.remainingLabel | mk_ng2_i18n: page.pageID }} {{ parentGroup.controls[option.key].value?.length }} / {{option.maxLength}}
      </mat-hint>
      <mat-hint *ngIf="option.startHint !== undefined" align="start">
        {{ option.startHint | mk_ng2_i18n: page.pageID }}
      </mat-hint>
      <mat-error>{{ formErrors[option.key] }}</mat-error>
    </mat-input-container>
    <p *ngIf="option.postLabel !== undefined">{{ option.postLabel | mk_ng2_i18n: page.pageID }}</p>
  </div>
</ng-container>
`,
styles: [`
  material2-input {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  :host ::ng-deep .mat-form-field-wrapper {
    margin-right: 8px;
  }
  .mat-form-field {
    width: 100%;
  }
`]
})
export class Material2InputComponent extends JsfBaseComponent implements OnInit, OnDestroy {
  hintPosition = 'end';
  hint = '';
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

    this.hint = this.option.hint;
    if ( this.option.hintPosition !== undefined ) {
      this.hintPosition = this.option.hintPosition;
    }

    // 初期設定＆共有データ監視(ヒントデータ)
    if ( this.option.hintMaster !== undefined ) {
      let filterValue = '';
      if ( this.option.filterKey !== undefined ) {
        filterValue = this.parentGroup.controls[this.option.filterKey].value;
      }
      const selectValue = this.parentGroup.controls[this.option.hintKey].value;
      const hintObj = this.jsf.getHint(this.master, this.option.hintMaster, selectValue, filterValue)
      this.hint = hintObj.hint;
      // 動的バリデーション用変数追加
      if ( hintObj.pattern !== undefined && hintObj.pattern !== '' ) {
        const dynamicPattern = 'dynamicPattern';
        this.parentGroup.controls[this.option.key][dynamicPattern] = hintObj.pattern;
      }
      if ( this.option.hintId !== undefined ) {
        const hints = this.hint.split(',');
        this.hint = hints[this.option.hintId];
      }
      this.services[0] = this.shared.sharedPara$.subscribe(
        (data) => {
          if ( data.key === this.option.key && data.kind === 'setHint' && data.dimension === this.dimension ) {
            if ( this.option.hintId !== undefined ) {
              const hints = data.hint.split(',');
              this.hint = hints[this.option.hintId];
            } else {
              this.hint = data.hint;
            }
            // 動的バリデーション用変数追加
            if ( data.pattern !== undefined && data.pattern !== '' ) {
              const dynamicPattern = 'dynamicPattern';
              this.parentGroup.controls[this.option.key][dynamicPattern] = data.pattern;
            }
            // 現在の値をクリア
            this.parentGroup.controls[this.option.key].setValue('');
          }
        }
      );
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
