import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';

@Component({
  selector: 'material2-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div id="{{option.id}}{{idDimension}}" *ngIf="option.label !== undefined">
  {{ option.label | mk_ng2_i18n: page.pageID }}
</div>
<div id="{{option.id}}{{idDimension}}" *ngIf="option.trueLabel  !== undefined && viewCheck()">
  {{ option.trueLabel | mk_ng2_i18n: page.pageID }}
</div>
<div id="{{option.id}}{{idDimension}}" *ngIf="option.falseLabel !== undefined && !viewCheck()">
  {{ option.falseLabel | mk_ng2_i18n: page.pageID }}
</div>
`,
  styles: [`
`]
})
export class Material2LabelComponent extends JsfBaseComponent implements OnInit, OnDestroy {
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

  viewCheck() {
    if ( this.option.viewFunc !== undefined ) {
      return this.option.viewFunc(this.jsf.getForm());
    }
    return false;
  }
}
