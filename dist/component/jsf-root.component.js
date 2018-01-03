import { Component, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, AfterContentInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedParametersService } from '../service/sharedParameters.service';
var JsfRootComponent = /** @class */ (function () {
    function JsfRootComponent(compiler, shared) {
        this.compiler = compiler;
        this.shared = shared;
        this.widgets = {};
        this.debug = false;
        this.innerOption = null;
        this.master = null;
        this.direction = 'row';
        this.dimension = 0;
        this.index = 0;
        this.num = 0;
        this.buttonClick = new EventEmitter();
        this.WidgetList = {};
    }
    // Pass through value to child component
    // Pass through value to child component
    JsfRootComponent.prototype.renderComponent = 
    // Pass through value to child component
    function () {
        if (this.componentRef) {
            this.componentRef.instance.widgets = this.widgets;
            this.componentRef.instance.debug = this.debug;
            this.componentRef.instance.innerOption = this.innerOption;
            this.componentRef.instance.parentGroup = this.parentGroup;
            this.componentRef.instance.page = this.page;
            this.componentRef.instance.schema = this.schema;
            this.componentRef.instance.master = this.master;
            this.componentRef.instance.data = this.data;
            this.componentRef.instance.option = this.option;
            this.componentRef.instance.direction = this.direction;
            this.componentRef.instance.dimension = this.dimension;
            this.componentRef.instance.index = this.index;
            this.componentRef.instance.num = this.num;
            this.componentRef.instance.buttonClick = this.buttonClick;
            this.componentRef.instance.shared = this.shared;
        }
    };
    // Compile child component
    // Compile child component
    JsfRootComponent.prototype.ngAfterContentInit = 
    // Compile child component
    function () {
        var childComponent = this.widgets[this.option.type];
        this.componentRef = this.target.createComponent(this.compiler.resolveComponentFactory(childComponent));
        this.renderComponent();
    };
    // Pass through value to child component when value changes
    // Pass through value to child component when value changes
    JsfRootComponent.prototype.ngOnChanges = 
    // Pass through value to child component when value changes
    function (changes) {
        this.renderComponent();
    };
    JsfRootComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jsf-root',
                    template: "\n    <div #target></div>\n"
                },] },
    ];
    /** @nocollapse */
    JsfRootComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
        { type: SharedParametersService, },
    ]; };
    JsfRootComponent.propDecorators = {
        "widgets": [{ type: Input },],
        "debug": [{ type: Input },],
        "innerOption": [{ type: Input },],
        "parentGroup": [{ type: Input },],
        "page": [{ type: Input },],
        "schema": [{ type: Input },],
        "master": [{ type: Input },],
        "data": [{ type: Input },],
        "option": [{ type: Input },],
        "direction": [{ type: Input },],
        "dimension": [{ type: Input },],
        "index": [{ type: Input },],
        "num": [{ type: Input },],
        "buttonClick": [{ type: Output },],
        "target": [{ type: ViewChild, args: ['target', { read: ViewContainerRef },] },],
    };
    return JsfRootComponent;
}());
export { JsfRootComponent };
