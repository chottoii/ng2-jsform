import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';

@Component({
  selector: 'material2-tabs',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<mat-tab-group>
  <mat-tab *ngFor="let tab of option.tabitems; let i=index;"
    label="{{ tab.title | mk_ng2_i18n: page.pageID }}">
    <jsf-root *ngFor="let widget of tab.items"
      fxFlex="{{widget.flex}}"
      [widgets]="widgets"
      [debug]="debug"
      [innerOption]="innerOption"
      [parentGroup]="parentGroup"
      [page]="page"
      [schema]="schema"
      [master]="master"
      [data]="data"
      [option]="widget"
      [direction]="direction"
      [num]="num"
      [index]="index"
      [dimension]="dimension"
      (buttonClick)="buttonClicked($event)">
    </jsf-root>
  </mat-tab>
</mat-tab-group>
`,
  styles: [`
:host ::ng-deep .mat-tab-label-active {
  background-color: rgba(197,202,233,.3);
}
`]
})
export class Material2TabsComponent extends JsfBaseComponent implements OnInit, OnDestroy {
  selectList: any;
  pGroup: any;

  flag = true;
  wrapStyle = {};
  itemStyle = {};

  constructor(
    public jsf: JsfService
  ) {
    super(jsf);
  }

  ngOnInit() {
    // ベースの変更
    this.changeBase();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  /**
   * child widgetのイベントをparentに転送する
   * @param event
   */
  buttonClicked(event: any) {
    this.buttonClick.next(event);
  }
}
