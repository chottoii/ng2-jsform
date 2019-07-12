import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedParametersService } from './service/sharedParameters.service';
import { I18nService } from './service/i18n.service';
import { JsfService } from './service/jsf.service';
import { I18nPipe } from './pipes/i18n.pipe';
import { MATERIAL2_DESIGN_COMPONENTS } from './component/material2/';
import { JsfBaseComponent } from './component/jsf-base.component';
import { JsfRootComponent } from './component/jsf-root.component';
import { AutoFormMainComponent } from './js-form.component';
var JsFormModule = (function () {
    function JsFormModule() {
    }
    JsFormModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CustomMaterialModule,
                        FlexLayoutModule
                    ],
                    declarations: [
                        I18nPipe
                    ].concat(MATERIAL2_DESIGN_COMPONENTS, [
                        JsfBaseComponent,
                        JsfRootComponent,
                        AutoFormMainComponent
                    ]),
                    exports: [
                        I18nPipe
                    ].concat(MATERIAL2_DESIGN_COMPONENTS, [
                        JsfBaseComponent,
                        JsfRootComponent,
                        AutoFormMainComponent
                    ]),
                    entryComponents: MATERIAL2_DESIGN_COMPONENTS.slice(),
                    providers: [
                        SharedParametersService,
                        I18nService,
                        JsfService,
                    ]
                },] },
    ];
    return JsFormModule;
}());
export { JsFormModule };
