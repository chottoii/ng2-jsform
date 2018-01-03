import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';

declare var $: any;

@Component({
  selector: 'material2-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="mk-checkbox-wrap"
  *ngIf="dispConditionTarget === '' || viewCondition()"
  id="{{option.key}}{{idDimension}}"
  [formGroup]="parentGroup"
  [style.flex-direction]="option.direction"
  [style.width]="option.width">
  <label [attr.for]="option.key"
    [style.display]="option.notitle ? 'none' : ''"
    [style.width]="option.labelWidth"
    [innerHTML]="option?.title | mk_ng2_i18n: page.pageID">
  </label>
  <mat-checkbox class="mk-checkbox-group-wrap"
    type="checkbox"
    [color]="option?.color || 'primary'"
    [formControlName]="option.key"
    [name]="option.key">
    <span class="checkbox-name">
      {{option.title | mk_ng2_i18n: page.pageID}}
    </span>
    <span class="badge" *ngIf="badges !== ''">{{ badges}}</span>
  </mat-checkbox>
  <mat-error>{{ formErrors[option.key] }}</mat-error>
</div>
`,
  styles: [`
  .mk-checkbox-wrap {
    display: flex;
    flex-wrap: wrap;
    margin-right: 8px;
    margin-bottom: 8px;
  }
  .mk-checkbox-group-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  ul, menu, dir {
    display: block;
    list-style-type: disc;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px!important;
  }
  .checkbox-list { list-style-type: none; }
  .horizontal-list > li,
  .horizontal > li {
    display: inline-block;
    margin-right: 10px;
    zoom: 1;
  }
  .checkbox-name { white-space: nowrap; }
  .badge {
    display: inline-block;
    min-width: 10px;
    padding: 3px 7px;
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    background-color: #232890;
    border-radius: 10px;
  }
`]
})
export class Material2CheckboxComponent extends JsfBaseComponent implements OnInit, OnDestroy {
  // 条件付き表示制御用変数
  dispConditionTarget = '';
  dispConditionValue  = null;

  selectList: any = null;
  currentValue = false;
  busy = false;
  badges = '';

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
    if ( this.option.dispCondition !== undefined ) {
      const condition = this.option.dispCondition.split('=');
      this.dispConditionTarget = condition[0];
      this.dispConditionValue = condition[1];
    }

    // スキーマがarrayの場合、選択肢取得
    if ( this.schema.properties[this.option.key] !== undefined &&
         this.schema.properties[this.option.key].type === 'array') {
      this.selectList = this.jsf.getMaster(this.master, this.schema.properties, this.option.master);
    }

    if ( this.option.direction === undefined ) {
      this.option.direction = 'row';
    }

    // バッチ機能
    if ( this.option.linkedItems !== undefined ) {
      // 初期値を取得
      if ( this.parentGroup.controls[this.option.key] !== null ) {
        this.currentValue = this.parentGroup.controls[this.option.key].value;
      }
      let badgesCount = 0;
      for ( let i = 0; i < this.option.linkedItems.length ; i++ ) {
        if ( this.parentGroup.controls[this.option.linkedItems[i]].value === true ) {
          badgesCount++;
        }
      }
      if ( this.option.linkedItems.length === badgesCount ) {
        this.badges = 'all';
      } else if ( badgesCount === 0 ) {
        this.badges = '';
      } else {
        this.badges = badgesCount.toString();
      }
      // 値変更の監視
      this.services[0] = this.parentGroup.valueChanges.subscribe(form => {
        if ( this.option.linkedItems !== undefined && this.busy === false ) {
          this.checkboxChange();
        }
      });
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  /**
   * 条件付き表示制御
   */
  viewCondition(): boolean {
    const ret = this.jsf.viewCondition(this.parentGroup, this.option);
    // 親要素の表示切替処理
    if ( ret ) {
      $('#' + this.option.title).show();
    } else {
      $('#' + this.option.title).hide();
    }
    return ret;
  }

  checkboxChange() {
    this.busy = true;

    if ( this.option.linkedItems !== undefined ) {
      // 自身の変更をチェック
      let selectFlag = false;
      if ( this.parentGroup.controls[this.option.key] !== null ) {
        selectFlag = this.parentGroup.controls[this.option.key].value;
      }

      if ( this.currentValue !== selectFlag ) {
        // 関連フラグの設定
        for ( let i = 0; i < this.option.linkedItems.length ; i++ ) {
          this.parentGroup.controls[this.option.linkedItems[i]].setValue(selectFlag);
        }
        if ( selectFlag === true ) {
          this.badges = 'all';
        } else {
          this.badges = '';
        }
        this.currentValue = selectFlag;
      } else {
        let badgesCount = 0;
        for ( let i = 0; i < this.option.linkedItems.length ; i++ ) {
          if ( this.parentGroup.controls[this.option.linkedItems[i]].value === true ) {
            badgesCount++;
          }
        }
        if ( this.option.linkedItems.length === badgesCount ) {
          this.badges = 'all';
          this.parentGroup.controls[this.option.key].setValue(true);
          this.currentValue = true;
        } else if ( badgesCount === 0 ) {
          this.badges = '';
          this.parentGroup.controls[this.option.key].setValue(false);
          this.currentValue = false;
        } else {
          this.badges = badgesCount.toString();
          this.parentGroup.controls[this.option.key].setValue(false);
          this.currentValue = false;
        }
      }
    }
    this.busy = false;
  }
}
