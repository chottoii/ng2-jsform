import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';

@Component({
  selector: 'material2-test',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div>
  {{ option.label | mk_ng2_i18n: page.pageID }}
</div>
`,
  styles: [`
`]
})
export class Material2TestComponent extends JsfBaseComponent implements OnInit, OnDestroy {
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

    // wrapStyleの設定値（配列）をオブジェクト列に変換
    /*
    if ( this.option.wrapStyle !== undefined  ) {
      for (const p of Object.keys(this.option.wrapStyle)) {
        for ( const key in this.option.wrapStyle[p] ) {
          this.wrapStyle[key] = this.option.wrapStyle[p][key];
        }
      }
    }
    if ( this.option.itemStyle !== undefined  ) {
      for (const p of Object.keys(this.option.itemStyle)) {
        for ( const key in this.option.itemStyle[p] ) {
          this.itemStyle[key] = this.option.itemStyle[p][key];
        }
      }
    }
    */
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
