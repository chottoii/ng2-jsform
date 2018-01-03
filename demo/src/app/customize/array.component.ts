import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { JsfService } from '../../lib/';

@Component({
  selector: 'array-widget',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss'],
  providers: [ JsfService ]
})
export class ArrayComponent implements OnInit, OnDestroy {
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

  selectList: any;
  pGroup: any;
  closeButton = 'close';
  services = [];

  formErrors = {};

  constructor(
    public jsf: JsfService
  ) {
  }

  ngOnInit() {
    this.services[0] = this.parentGroup.valueChanges
      .subscribe(data => this.onValueChanged(data));

    const cName = 'controls';
    this.pGroup = this.parentGroup.controls[this.option.key][cName];
  }

  ngOnDestroy() {
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

}
