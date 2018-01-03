import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  AfterContentInit,
  OnChanges
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SharedParametersService } from '../service/sharedParameters.service';


@Component({
  selector: 'jsf-root',
  template: `
    <div #target></div>
`
})
export class JsfRootComponent implements AfterContentInit, OnChanges {
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
  @Input() num = 0;   // array時の項目数
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();

  @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  private WidgetList = {};
  constructor(
    private compiler: ComponentFactoryResolver,
    private shared: SharedParametersService
  ) {}

  // Pass through value to child component
  renderComponent() {
    if ( this.componentRef ) {
      this.componentRef.instance.widgets      = this.widgets;
      this.componentRef.instance.debug        = this.debug;
      this.componentRef.instance.innerOption  = this.innerOption;
      this.componentRef.instance.parentGroup  = this.parentGroup;
      this.componentRef.instance.page         = this.page;
      this.componentRef.instance.schema       = this.schema;
      this.componentRef.instance.master       = this.master;
      this.componentRef.instance.data         = this.data;
      this.componentRef.instance.option       = this.option;
      this.componentRef.instance.direction    = this.direction;
      this.componentRef.instance.dimension    = this.dimension;
      this.componentRef.instance.index        = this.index;
      this.componentRef.instance.num          = this.num;
      this.componentRef.instance.buttonClick  = this.buttonClick;
      this.componentRef.instance.shared       = this.shared;
    }
  }

  // Compile child component
  ngAfterContentInit() {
    const childComponent = this.widgets[this.option.type];
    this.componentRef = this.target.createComponent(
      this.compiler.resolveComponentFactory(childComponent)
    );
    this.renderComponent();
  }

  // Pass through value to child component when value changes
  ngOnChanges(changes: Object) {
    this.renderComponent();
  }
}
