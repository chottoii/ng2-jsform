import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

// 共通モジュール
import { UniversalModule } from '../modules/universal.module';
import { SharedModule } from '../app-shared/shared.module';

import { CustomMaterialModule } from './material.module'

import { JsFormModule } from '../lib/';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import 'hammerjs';

// フォーム自動生成メイン
import { AutoFormComponent } from './auto-form/auto-form.component';

// カスタマイズwidgwts
import {
  SimpleComponent,
  Date2Component,
  ArrayComponent
} from './customize';

import { MessageComponent } from './input-data/message.component';
import { MasterComponent }  from './input-data/master.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoFormComponent,
    SimpleComponent,
    Date2Component,
    ArrayComponent,
    MessageComponent,
    MasterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,

    CustomMaterialModule,

    SharedModule,
    UniversalModule,
    JsFormModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SimpleComponent,
    Date2Component,
    ArrayComponent
 ],
})
export class AppModule { }
