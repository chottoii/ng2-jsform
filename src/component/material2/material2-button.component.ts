/**
 * history
 *  2017/10/30 iconボタンサポート
 */
import { Component, Input, OnInit, OnDestroy, Inject, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

@Component({
  selector: 'material2-button',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<button *ngIf="option.kind !== 'toggle' && option.icon === undefined && jsf.viewCondition(parentGroup, option)"
  type="button"
  id="{{option.title}}{{idDimension}}"
  mat-raised-button="mat-raised-button"
  [color]="option.color"
  [attr.type]="option.kind === 'submit' ? 'submit' : 'button'"
  (click)="onClick(option.kind, option.target)"
  [disabled]="option.kind === 'submit' ? !parentGroup.valid : false">
  {{ option.title | mk_ng2_i18n: 'button' }}
</button>
<button *ngIf="option.kind !== 'toggle' && option.icon !== undefined && jsf.viewCondition(parentGroup, option)"
  type="button"
  id="{{option.title}}{{idDimension}}"
  (click)="onClick(option.kind, option.target)"
  mat-icon-button>
  <mat-icon class="mk-icon-wrap mk-icon-cursor">
    {{ option.icon }}
  </mat-icon>
</button>
<button *ngIf="option.kind === 'toggle'"
    type="button"
    id="{{option.title}}{{idDimension}}"
    mat-raised-button="mat-raised-button"
    [color]="option.color"
    (click)="onToggle()">
  <span *ngIf="toggleFlag === 'on'">  {{ option.onTitle | mk_ng2_i18n: 'button' }} </span>
  <span *ngIf="toggleFlag === 'off'"> {{ option.offTitle | mk_ng2_i18n: 'button' }} </span>
</button>
`,
  styles: [`
  button {
    margin-right: 8px;
  }
  .margin-left {
    margin-left: auto;
  }
  .margin-right {
    margin-right: auto;
  }
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
`],
  providers: [ JsfService ]
})
export class Material2ButtonComponent extends JsfBaseComponent implements OnInit, OnDestroy {
  // 補助入力データ
  auxiliaryForm: FormGroup;

  // トグルボタン機能
  toggleFlag = 'off';

  // idの次元数
  idDimension = '';

  constructor(
    public jsf: JsfService,
    public dialog: MatDialog
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

    // トグルボタン機能
    if ( this.option.kind === 'toggle' ) {
      this.toggleFlag = 'off';
      this.parentGroup.controls[this.option.key].setValue(this.toggleFlag);
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // トグルボタン切替処理
  onToggle() {
    if ( this.option.kind === 'toggle' ) {
      if ( this.toggleFlag === 'on' ) {
        this.toggleFlag = 'off';
      } else {
        this.toggleFlag = 'on';
      }
      this.parentGroup.controls[this.option.key].setValue(this.toggleFlag);
    }
  }

  onClick(kind: any, target: string) {
    switch ( kind ) {
      case 'add':
        this.jsf.addItem(this.schema, this.parentGroup.controls, target, this.data);
        break;
      case 'popup':
        this.auxiliaryForm = this.jsf.schemaToFormGroup(this.option.popupSchema, {});
        this.openDialog();
        break;
      default:
        this.buttonClick.next({
          'obj': this.parentGroup.value,
          'kind': kind
        });
        break;
    }
  }

  /**
   * 補助入力用dialog処理
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(AuxiliaryInputDialogComponent, {
      width: this.option.popupWidth,
      data: {
        popupitems: this.option.popupitems,
        popupTitle: this.option.popupTitle,
        popupNote: this.option.popupNote,
        widgets: this.widgets,
        parentGroup: this.auxiliaryForm,
        page: this.page,
        schema: this.schema,
        master: this.master,
        data: {},
        direction: this.direction,
        dimension: this.dimension,
        viewButton: this.option.viewButton === undefined ? true : this.option.viewButton
      }
    });

    const _option = this.option;
    const _auxiliaryForm = this.auxiliaryForm;
    const _parentGroup = this.parentGroup;
    this.services[0] = dialogRef.afterClosed().subscribe(result => {
      if ( result === 'ok' ) {
        Object.keys(_option.popupitems).forEach(function (id) {
          const key = _option.popupitems[id].key;
          const targetKey = _option.popupitems[id].targetKey;
          const value = _auxiliaryForm.controls[key].value;
          if ( value !== null ) {
            _parentGroup.controls[targetKey].setValue(value);
          }
        });
      }
    });
  }
}

@Component({
  selector: 'material2-auxiliary-dialog',
  template: `
  <h1 mat-dialog-title>
    <ul>
      <li  *ngIf="data.popupTitle !== undefined">
        {{ data.popupTitle | mk_ng2_i18n: data.page.pageID }}
      </li>
      <li>
        <button mat-icon-button (click)="onNoClick()" >
          <mat-icon>close</mat-icon>
        </button>
      </li>
    </ul>
  </h1>
  <div mat-dialog-content>
    <p *ngIf="data.popupNote !== undefined">
      {{ data.popupNote | mk_ng2_i18n: data.page.pageID }}
    </p>
    <jsf-root *ngFor="let widget of data.popupitems; let i=index;"
      [fxFlex]="widget.flex === undefined ? '1 1 auto' : widget.flex"
      [widgets]="data.widgets"
      [debug]="debug"
      [innerOption]="innerOption"
      [parentGroup]="data.parentGroup"
      [page]="data.page"
      [schema]="data.schema"
      [master]="data.master"
      [data]="data.data"
      [option]="widget"
      [direction]="data.direction"
      [dimension]="data.dimension"
      [index]="i"
      (buttonClick)="buttonClicked($event)">
    </jsf-root>
  </div>
  <div mat-dialog-actions *ngIf="data.viewButton">
    <button mat-raised-button color="primary" [mat-dialog-close]="'ok'" tabindex="2">
      {{ 'ok' | mk_ng2_i18n: 'button' }}
    </button>
    <!--
    <button mat-raised-button (click)="onNoClick()" tabindex="-1">
      {{ 'cancel' | mk_ng2_i18n: 'button' }}
    </button>
    -->
  </div>
`,
styles: [`
.mat-dialog-actions {
  flex-wrap: nowrap;
}
ul {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  margin: 0;
  padding-left: 1em;
  text-indent: -1em;
}
ul li:last-of-type {
  margin-left: auto;
}
`],
})
export class AuxiliaryInputDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AuxiliaryInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buttonClicked(event: any) {
    if ( event.kind === 'ok' ) {
      this.dialogRef.close('ok');
    }
  }
}
