import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { JsfService } from '../../lib/';

@Component({
  selector: 'date-widget',
  templateUrl: './date2.component.html',
  styleUrls: ['./date2.component.scss'],
  providers: [ JsfService ]
})
export class Date2Component implements OnInit {
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

  inputDate = '2017/12/04';

  constructor(
    public jsf: JsfService
  ) {
  }

  ngOnInit() {
    this.parentGroup.valueChanges
      .subscribe(data => {
        this.onValueChanged(data)
      });
  }

  onValueChanged(event: any) {
    this.jsf.checkError(this.parentGroup, this.option, this.dimension, this.formErrors, this.page.pageID, null, false);
  }

  focusOutFunction(key: any) {
    this.jsf.checkError(this.parentGroup, this.option, this.dimension, this.formErrors, this.page.pageID, key, true);
  }

  onDateChange(event: any, option: any) {
  }
}
