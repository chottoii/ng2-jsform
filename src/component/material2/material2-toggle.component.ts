import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';

import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';

@Component({
  selector: 'material2-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div id="{{option.key}}{{idDimension}}" class="mk-toggle-wrap" [formGroup]="parentGroup">
  <mat-button-toggle-group [formControlName]="option.key">
    <ng-container *ngFor="let selectItem of selectList">
      <mat-button-toggle class="mk-toggle-button-wrap"
        [value]="selectItem.value"
        [style.width]="option.width"
        [style.text-align]="'center'">
          {{selectItem.key | mk_ng2_i18n: page.pageID}}
      </mat-button-toggle>
    </ng-container>
  </mat-button-toggle-group>
</div>
`,
  styles: [`
  .mk-toggle-wrap {
    display: flex;
    flex-wrap: wrap;
    margin-right: 8px;
    margin-bottom: 8px;
  }
  .mat-button-toggle-checked {
    background-color:#3f51b5 !important;
    color: #fff;
  }
`]
})
export class Material2ToggleComponent extends JsfBaseComponent implements OnInit, OnDestroy {
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
