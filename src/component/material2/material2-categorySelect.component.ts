// 履歴
//  2017/12/21 暫定的にフィルタ機能を導入　採用するかどうか要検討
import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';

import { FormArray } from '@angular/forms';

import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';

@Component({
  selector: 'material2-category-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<ng-container *ngIf="selectList.group !== undefined">
  <div class="mk-category-select-wrap">
    <div class="mk-category-select-group" *ngFor="let group of selectList.group">
      <div class="mk-category-select-item">
        <span> {{ group.title | mk_ng2_i18n: page.pageID }}</span>
        <div *ngFor="let selectItem of group.items">
          <a href="javascript:void(0)"
            (click)=selectValue(selectItem.value)>
            {{ selectItem.key  | mk_ng2_i18n: page.pageID }}
          </a>
        </div>
      </div>
    </div>
  </div>
</ng-container>
<ng-container *ngIf="selectList.group === undefined">
  <div class="mk-category-select-wrap-column">
    <p *ngFor="let selectItem of selectList">
      <a href="javascript:void(0)"
        (click)=selectValue(selectItem.value)>
        {{ selectItem.key  | mk_ng2_i18n: page.pageID }}
      </a>
    </p>
  </div>
</ng-container>
`,
styles: [`
  .mk-category-select-wrap {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .mk-category-select-group {
    flex: 1 1 auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .mk-category-select-group span {
    font-weight: 700;
    text-align: center;
  }
  .mk-category-select-item {
  }
  .mk-category-select-wrap-column {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
`]
})
export class Material2CategorySelectComponent extends JsfBaseComponent implements OnInit, OnDestroy {
  /** 選択リスト */
  selectList: any = null;

  constructor(
    public jsf: JsfService
  ) {
    super(jsf);
  }

  ngOnInit() {
    // ベースの変更
    this.changeBase();

    // 選択肢フィルター関数機能
    if ( this.option.filterFunc !== undefined ) {
      this.selectList = this.option.filterFunc(this.jsf.getForm());
    } else {
      this.selectList = this.jsf.getMaster(this.master, this.schema.properties, this.option.master);
      // filter機能のサポート
      if ( this.option.filter !== undefined ) {
        const topForm = this.jsf.getForm();
        const controlsName = 'controls';
        let filtervalue = '';
        // filterTargetがある場合は、array処理を行う
        if ( this.option.filterTarget !== undefined ) {
          const formArray = topForm.controls[this.option.filterTarget];
          filtervalue = formArray[controlsName][this.dimension].controls[this.option.filter].value;
        } else if ( topForm.controls[this.option.filter] !== undefined ) {
            filtervalue = topForm.controls[this.option.filter].value;
        }
        this.selectList = this.selectList[filtervalue];
      }
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  selectValue(value: string) {
    this.parentGroup.controls[this.option.key].setValue(value);
    this.buttonClick.next({
      'kind': 'ok'
    });
  }
}
