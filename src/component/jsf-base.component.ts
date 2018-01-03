import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsfService } from '../service/jsf.service';

@Component({
  selector: 'jsf-base',
  template: `
    <div></div>
  `
})
export class JsfBaseComponent implements OnInit, OnDestroy {
  @Input() widgets = {};  // widgetリスト
  @Input() debug = false; // デバッグフラグ
  @Input() innerOption = null; // 内部オプション
  @Input() parentGroup: FormGroup;
  @Input() page: any;
  @Input() schema: any;
  @Input() master: any = null;
  @Input() data: any;
  @Input() option: any;
  @Input() direction = 'row';
  @Input() dimension = 0;
  @Input() index = 0;
  @Input() num = 0;
  @Input() shared: any;
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();

  formErrors = {};
  parentService = [];
  // for child service
  services = [];

  constructor(
    public jsf: JsfService
  ) {
  }

  ngOnInit() {
    this.parentService[0] = this.parentGroup.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  ngOnDestroy() {
    this.parentService.forEach( e => {
      if ( e ) {
        e.unsubscribe();
      }
    });
    this.services.forEach( e => {
      if ( e ) {
        e.unsubscribe();
      }
    });
  }

  onValueChanged(event: any) {
    this.jsf.checkError(this.parentGroup, this.option, this.dimension, this.formErrors, this.page.pageID, null, false);
  }

  focusOutFunction(key: any) {
    this.jsf.checkError(this.parentGroup, this.option, this.dimension, this.formErrors, this.page.pageID, key, true);
  }

  /**
   * スキーマ構造化対応のためにベースを変更
   * 2017/12/30 スキーマ階層構造サポート
   */
  changeBase() {
    const formGroupInfo = this.jsf.getFormGroupKey(this.parentGroup, this.option.key, this.data);
    this.parentGroup = formGroupInfo.parent;
    this.option.key = formGroupInfo.key;
    this.data = formGroupInfo.data;
  }
}
