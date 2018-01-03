import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';

import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';

@Component({
  selector: 'material2-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="mk-display-wrap" [style.width]="option.width">
  <div *ngIf="option.previousLabel !== undefined">
    {{ option.previousLabel | mk_ng2_i18n: page.pageID }}
  </div>
  <div *ngIf="option.title !== undefined">
    {{ option.title | mk_ng2_i18n: page.pageID }}
  </div>
  <div id="{{option.key}}{{idDimension}}">
    {{ getValue() }} {{ parameterValue | mk_ng2_i18n: page.pageID }}
  </div>
  <div *ngIf="option.postLabel !== undefined">
    {{ option.postLabel | mk_ng2_i18n: page.pageID }}
  </div>
</div>
`,
  styles: [`
  .mk-display-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  .mk-display-wrap div {
    flex: 1 1 auto;
  }
`]
})
export class Material2DisplayComponent extends JsfBaseComponent implements OnInit, OnDestroy {
  parameterValue = '';

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
    this.getValue();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  /**
   * 値の取得
   * TODO この方式は何度もコールされるため非効率である。
   */
  getValue() {
    let filter = '';
    if ( this.option.filter !== undefined ) {
      filter = this.parentGroup.controls[this.option.filter].value;
    }
    this.parameterValue =  this.jsf.getValue(
      this.parentGroup,
      this.master,
      this.option,
      filter
    );
    if (typeof(this.parameterValue) === 'boolean') {
      if (this.parameterValue) {
        this.parameterValue = 'true';
      } else {
        this.parameterValue = 'false';
      }
    }
  }
}
