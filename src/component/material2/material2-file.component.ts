import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';

@Component({
  selector: 'material2-file',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<ng-container>
  <div [formGroup]="parentGroup" class="mk-file-wrap">
    <div *ngIf="option.previousLabel !== undefined" class="mk-file-label">{{ option.previousLabel | mk_ng2_i18n: page.pageID }}</div>
    <div class="mk-file-contents">
      <input type="file" id="{{option.key}}{{idDimension}}" [formControlName]="option.key"/>
    </div>
    <div *ngIf="option.postLabel !== undefined" class="mk-file-label">{{ option.postLabel | mk_ng2_i18n: page.pageID }}</div>
  </div>
</ng-container>
`,
  styles: [`
  .mk-file-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .mk-file-label {
    flex: 10 1 10%;
  }
  .mk-file-contents {
    flex: 80 1 80%;
  }
`]
})
export class Material2FileComponent extends JsfBaseComponent implements OnInit, OnDestroy {
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
}
