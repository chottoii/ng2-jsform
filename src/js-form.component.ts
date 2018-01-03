/**
 * 修正履歴
 *  2017/11/10 clearが効かない不具合に対応
 *  2017/11/25 refサポート
 *  2017/11/27 ngOnChangesの初期化手順による不具合対応
 *  2017/12/09 clear処理の自動化
 */
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { I18nService } from './service/i18n.service';
import { JsfService } from './service/jsf.service';

import {
  deepCopy
} from './utility';

import { MATERIAL2_DESIGN_COMPONENTS_LIST } from './component/material2/';

declare var $RefParser: any;

@Component({
  selector: 'js-form',
  template: `
<form [formGroup]="form" *ngIf="formReady" (ngSubmit)="onSubmit(form)">
  <div *ngFor="let widget of layout">
    <jsf-root
      [widgets]="widgetList"
      [debug]="debug"
      [innerOption]="innerOption"
      [parentGroup]="form"
      [page]="page"
      [schema]="schema"
      [master]="master"
      [data]="data"
      [option]="widget"
      (buttonClick)="buttonClick($event)"></jsf-root>
  </div>
</form>
`
})
export class AutoFormMainComponent implements OnInit, OnChanges {
  @Input()  combine: any = null;  // 一括指定用
  @Input()  debug = false;        // デバッグフラグ
  @Input()  widgets = {};         // カスタムコンポネント
  @Input()  innerOption = null;   // 内部オプション
  @Input()  page: any;
  @Input()  schema: any;
  @Input()  layout: any;
  @Input()  master: any = null;
  @Input()  data = {};
  @Input()  message: any = null;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  group: any;
  form: FormGroup;
  first = true;
  formReady = false;
  public widgetList;
  currentLayout = null;

  constructor(
    private i18n: I18nService,
    private jsf: JsfService
  ) {
  }

  ngOnChanges() {
    this.formReady = false;
    this.jsf.setDebugMode(this.debug);
    this.setCombine();

    // $ref処理
    $RefParser.dereference(this.schema, (err, schema) => {
      if (err) {
        console.error('$Ref Parser error: ' + err);
      } else {
        this.schema = schema;
        this.initForm();
        this.formReady = true;
      }
    });
  }

  ngOnInit() {
    // 初回は、ngOnChangesで初期化されるので、不要
    // this.initForm();
  }

  initForm() {
    // widgetリストの初期化　TODO 実際は、デザインによって変更される
    this.widgetList = {};
    Object.keys(MATERIAL2_DESIGN_COMPONENTS_LIST).forEach((key) => {
      this.widgetList[key] = MATERIAL2_DESIGN_COMPONENTS_LIST[key];
    });
    // カスタムコンポネントの追加
    Object.keys(this.widgets).forEach((key) => {
      this.widgetList[key] = this.widgets[key];
    });
    // 国際化辞書の初期化
    if ( this.message !== null ) {
      this.i18n.setDictionary(this.message);
      }
    // form group 生成
    // this.form = this.jsf.schemaToFormGroup(this.schema, this.data);
    this.group = this.jsf.schemaToGroup(this.schema, this.data);
    this.form = this.jsf.groupToFormGroup(this.group, this.schema, this.data);
    this.currentLayout = this.layout;

    // カスタムWidgetsのためにtopフォームを保持する
    this.jsf.setForm(this.form, this.schema, this.data);
  }

  setCombine() {
    if ( this.combine !== null ) {
      this.widgets = this.combine.widgets !== undefined ? this.combine.widgets : {};
      this.page = this.combine.page;
      this.schema = this.combine.schema;
      this.layout = this.combine.layout;
      this.master = this.combine.master;
      this.data = this.combine.data;
      this.message = this.combine.message;
    }
  }

  /**
   * submit処理を転送
   */
  onSubmit(form: any) {
    this.onClick.next(
      {
        'obj': this.form.value,
        'kind': 'submit'
      }
    );
  }

  /**
   * submit以外の処理を転送
   * @param event
   */
  buttonClick(event: any) {
    if ( event.kind === 'clear' ) {
      // clear 処理
      this.jsf.resetForm();
    } else if ( event.kind !== 'submit' ) {
      this.onClick.next(event);
    }
  }

  remove() {
    if ( this.form !== null && this.form !== undefined) {
      this.form.reset();
    }
  }
}
