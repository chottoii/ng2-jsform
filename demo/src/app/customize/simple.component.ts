import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsfService } from '../../lib/';

@Component({
  selector: 'simple-widget',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  providers: [ JsfService ]
})
export class SimpleComponent implements OnInit {
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

  /** エラー情報取得エリア */
  formErrors = {};

  constructor(
    public jsf: JsfService
  ) {
  }

  ngOnInit() {
    this.parentGroup.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  /**
   * モデル変更時のエラーチェック
   * @param event
   */
  onValueChanged(event: any) {
    this.jsf.checkError(this.parentGroup, this.option, this.dimension, this.formErrors, this.page.pageID, null, false);
  }

  /**
   * フォーカスアウト時のエラーチェック
   * @param key 
   */
  focusOutFunction(key: any) {
    this.jsf.checkError(this.parentGroup, this.option, this.dimension, this.formErrors, this.page.pageID, key, true);
  }

}
