import { EventEmitter, ViewContainerRef, ComponentFactoryResolver, AfterContentInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedParametersService } from '../service/sharedParameters.service';
export declare class JsfRootComponent implements AfterContentInit, OnChanges {
    private compiler;
    private shared;
    widgets: {};
    debug: boolean;
    innerOption: any;
    parentGroup: FormGroup;
    page: any;
    schema: any;
    master: any;
    data: any;
    option: any;
    direction: string;
    dimension: number;
    index: number;
    num: number;
    buttonClick: EventEmitter<any>;
    target: ViewContainerRef;
    private componentRef;
    private WidgetList;
    constructor(compiler: ComponentFactoryResolver, shared: SharedParametersService);
    renderComponent(): void;
    ngAfterContentInit(): void;
    ngOnChanges(changes: Object): void;
}
