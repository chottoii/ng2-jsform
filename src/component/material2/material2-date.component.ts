import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';

import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';

@Component({
  selector: 'material2-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="mk-date-wrap">
  <span class="mk-date-previousLabel" *ngIf="option.previousLabel !== undefined">
    {{option.previousLabel | mk_ng2_i18n: page.pageID}}
  </span>
  <mat-form-field [formGroup]="parentGroup">
    <input id="{{option.key}}{{idDimension}}" matInput
      [matDatepicker]="picker"
      [formControlName]="option.key"
      (ngModelChange)="onDateChange($event, option)"
      placeholder="{{option.title | mk_ng2_i18n: page.pageID}}">
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker touchUi="true" #picker></mat-datepicker>
    <mat-error>{{ formErrors[option.key] }}</mat-error>
  </mat-form-field>
  <span class="mk-date-postLabel" *ngIf="option.postLabel !== undefined">
    {{option.postLabel | mk_ng2_i18n: page.pageID}}
  </span>
</div>
`,
  styles: [`
  .mk-date-wrap {
    display: flex;
    flex-wrap: wrap;
    margin-right: 8px;
  }

  .mk-date-previousLabel {
    margin-right: 8px;
    margin-top: 20px;
  }

  .mk-date-postLabel {
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 20px;
  }
`]
})
export class Material2DateComponent extends JsfBaseComponent implements OnInit, OnDestroy {
  @ViewChild('dateUtc') dateUtcRef: ElementRef;

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
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onDateChange(d: any, option: any) {
    if (d instanceof Date && !isNaN(d.valueOf())) {
      // 大小チェック(this < max)
      if ( option.maxTarget !== undefined && this.parentGroup.get(option.maxTarget).value !== null ) {
        const targetValue: Date = this.parentGroup.get(option.maxTarget).value;
        if ( d.getTime() > targetValue.getTime() ) {
          this.parentGroup.get(option.key).setValue(targetValue);
          this.parentGroup.get(option.maxTarget).setValue(d);
        }
      }
      // 大小チェック(this > min)
      if ( option.minTarget !== undefined && this.parentGroup.get(option.minTarget).value !== null ) {
        const targetValue: Date = this.parentGroup.get(option.minTarget).value;
        if ( d.getTime() < targetValue.getTime() ) {
          this.parentGroup.get(option.key).setValue(targetValue);
          this.parentGroup.get(option.minTarget).setValue(d);
        }
      }
    }
  }

  /**
   * 日付をフォーマットする
   * この関数は使用しないことになった
   * @param  {Date}   date     日付
   * @param  {String} [format] フォーマット
   * @return {String}          フォーマット済み日付
   */
  formatDate(date: Date, format: string) {
    if (!format) {
      format = 'YYYY-MM-DD hh:mm:ss.SSS';
    }
    format = format.replace(/YYYY/g, '' + date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    if (format.match(/S/g)) {
      const milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
      const length = format.match(/S/g).length;
      for (let i = 0; i < length; i++) {
        format = format.replace(/S/, milliSeconds.substring(i, i + 1));
      }
    }
    return format;
  };
}
