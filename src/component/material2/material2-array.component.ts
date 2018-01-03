/**
 * 履歴
 *  2017/12/15 visibilityの採用によるデザイン補正
 */
import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';

@Component({
  selector: 'material2-array',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="mk-array-wrap" [formGroup]="parentGroup">
  <div *ngFor="let w of pGroup; let i=index" [formArrayName]="option.key">
    <div class="mk-array-title" [style.display]="option.title === undefined ? 'none' : ''">
      <div class="mk-array-title-spacer">
        {{ option.title | mk_ng2_i18n: page.pageID }}
        <span *ngIf="option.viewDimension === true">
          {{i + 1}}
        </span>
      </div>
      <mat-icon class="mk-array-cursor"
        [style.display]="option.addIcon === undefined ? 'none' : ''"
        [style.visibility]="parentGroup.controls[option.key].controls.length > 1 && i < maxItems ? 'visible' : 'hidden'"
        (click)="jsf.addItem(schema, parentGroup.controls, option.key, data)">{{ option.addIcon }}
      </mat-icon>
      <mat-icon class="mk-array-cursor"
        [style.display]="option.removeIcon === undefined ? 'none' : ''"
        [style.visibility]="parentGroup.controls[option.key].controls.length > 1 && i > minItems ? 'visible' : 'hidden'"
        (click)="jsf.removeItem(parentGroup, option.key, i)">{{ option.removeIcon }}
      </mat-icon>
    </div>
    <div *ngIf="option.previousLabel !== undefined && i !== 0">
      {{ option.previousLabel | mk_ng2_i18n: page.pageID }}
    </div>
    <jsf-root class="mk-array-body" *ngFor="let item of option.items; let j=index"
      [widgets]="widgets"
      [debug]="debug"
      [innerOption]="innerOption"
      [parentGroup]="pGroup[i]"
      [page]="page"
      [schema]="schema"
      [master]="master"
      [data]="data"
      [option]="option.items[j]"
      [num]="parentGroup.controls[option.key].controls.length"
      [dimension]="i">
    </jsf-root>
    <div *ngIf="option.postLabel !== undefined">
      {{ option.postLabel | mk_ng2_i18n: page.pageID }}
    </div>
  </div>
  <div class="mk-array-control" [style.display]="option.add === undefined ? 'none' : ''">
    <a (click)="jsf.addItem(schema, parentGroup.controls, option.key, data)" style="cursor: pointer;">
      {{ option.add | mk_ng2_i18n: page.pageID }}
    </a>
  </div>
</div>
`,
  styles: [`
  .mk-array-wrap {
    margin: auto;
  }

  .mk-array-title {
    -ms-flex-line-pack: center;
    align-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 8px 20px;
    color: rgba(0,0,0,.54);
    background: rgba(0,0,0,.03);
  }

  .mk-array-title-spacer {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
  }

  .mk-array-body {
    margin: 10px 0px;
  }

  .mk-array-control {
    margin: 10px 0px;
  }

  .mk-array-cursor {
    cursor: pointer;
  }
`],
  providers: [ JsfService ]
})
export class Material2ArrayComponent extends JsfBaseComponent implements OnInit, OnDestroy {
  selectList: any;
  pGroup: any;

  constructor(
    public jsf: JsfService
  ) {
    super(jsf);
  }

  ngOnInit() {
    // ベースの変更
    this.changeBase();

    const cName = 'controls';
    if ( this.option.key !== 'button' ) {
      this.pGroup = this.parentGroup.controls[this.option.key][cName];
      const minItems = this.schema.properties[this.option.key].minItems || 1;
      const maxItems = this.schema.properties[this.option.key].maxItems || 10;
      this.innerOption = {
        minItems: minItems,
        maxItems: maxItems
      };
    } else {
      this.pGroup = null;
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
