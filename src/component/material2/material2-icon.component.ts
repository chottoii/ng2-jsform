import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';

import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';

@Component({
  selector: 'material2-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<ng-container [ngSwitch]="option.kind">
  <ng-container *ngSwitchCase="'add'">
    <button *ngIf="num < innerOption.maxItems" mat-icon-button
      type="button"
      id="{{option.kind}}{{idDimension}}"
      (click)="onClick(parentGroup._parent._parent, option.kind)" >
      <mat-icon class="mk-icon-wrap mk-icon-cursor">
        {{ option.icon }}
      </mat-icon>
    </button>
  </ng-container>
  <ng-container *ngSwitchCase="'remove'">
    <button *ngIf="num > innerOption.minItems" mat-icon-button
      type="button"
      id="{{option.kind}}{{idDimension}}"
      (click)="onClick(parentGroup._parent._parent, option.kind)" >
      <mat-icon class="mk-icon-wrap mk-icon-cursor">
        {{ option.icon }}
      </mat-icon>
    </button>
  </ng-container>
  <ng-container *ngSwitchCase="'tooltip'">
    <mat-icon
      class="mk-icon-wrap"
      [matTooltipPosition]="option.tooltipPosition === undefined ? 'below' : option.tooltipPosition"
      matTooltip="{{ option.tooltip | mk_ng2_i18n: page.pageID }}">
      {{ option.icon }}
    </mat-icon>
  </ng-container>
  <ng-container *ngSwitchDefault="">
    <button type="button" mat-icon-button
      id="{{option.kind}}{{idDimension}}"
      (click)="onClick(null, option.kind)" >
      <mat-icon class="mk-icon-wrap mk-icon-cursor">
        {{ option.icon }}
      </mat-icon>
    </button>
  </ng-container>
</ng-container>
`,
  styles: [`
  .mk-icon-wrap {
    margin-top: 0px;
    padding-right: 10px;
    height: 30px;
    width: 30px;
  }
  .mat-icon {
    font-size: 30px;
    height: 30px;
    width: 30px;
  }
  .mk-icon-cursor {
    cursor: pointer;
  }
`]
})
export class Material2IconComponent extends JsfBaseComponent implements OnInit, OnDestroy {
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

  onClick(form: any, kind: string) {
    switch ( kind ) {
      case 'remove':
        this.jsf.removeItem(form, this.option.target, this.dimension);
        break;
      case 'add':
        this.jsf.addItem(this.schema, form.controls, this.option.target, this.data);
        break;
      default:
        this.buttonClick.next({
          'obj': null,
          'kind': kind
        });
        break;
    }
  }
}
