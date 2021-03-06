# Angular JSON Schema form + material + i18n

ng2-jsform is a library that generates a form that operates on Angular 4 (over) from a JSON Schema format definition.

[このページは機械翻訳です。日本語が読める方はこちらを参照してください。](./README.ja.md)

## feature

ng2-jsform is compatible with internationalization. Dynamic display switching is possible if message data of each language is prepared.
List the main functions.

* material design
* flex layout support
* Internationalization
* Custom widgets

And, by linking widgets, you can generate various forms.

* Function to dynamically switch display / non-display according to the value of form element
* Function to dynamically switch input hints for each select item
* The ability to set the parent-child relationship of two select
* The ability to dynamically switch display / non-display of widgets grouped by selected items
* Function to group selected items
* The function to select the grouped items in the popup dialog
* Function to select and deselect all selected items at once

## demos

http://chotto-ii.com/ng2-jsform/demo/

## docs

Detail is,
Http://chotto-ii.com/ng2-jsform/manual/
Please refer to. (Note: Japanese.)

## quick start

If you want to check the operation, please follow the steps below.
Note: Please set up node.js and yarn in advance.

```
  git clone https://github.com/milkeyway/ng2-jsform-sample.git ng2-jsform-sample
  cd ng2-jsform-sample
  yarn install
  yarn start
```

## Installation

To build a development environment, please follow the procedure below.

### step1 Create a project of angular cli

```
npm i -g angular-cli
ng new sample --style=scss --routing=true
```

### step2 Set up Angular Material

Please set up Angular Matetial with reference to the following.

https://material.angular.io/guide/getting-started

```
yarn add @angular/material @angular/cdk @angular/animations hammerjs
```

#### Edit styles.cssEdit styles.css

```
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```

#### Edit src/main.tsの編集

```
import 'hammerjs';
```

#### Edit index.html

```
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

### step3 Set up Angular Material ng2-jsform

```
cd sample
yarn add ng2-jsform jquery @angular/flex-layout json-schema-ref-parser
```

#### Edit .angular-cli.json

```
  "scripts": [
    "../node_modules/jquery/dist/jquery.min.js",
    "../node_modules/json-schema-ref-parser/dist/ref-parser.min.js"
  ],
```

#### Edit app.module.ts

```
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from './material.module';
import { JsFormModule, I18nService } from 'ng2-jsform';

import { TopComponent } from './top/top.component';
  …
  @NgModule({
    …
    declarations: [
      …
      TopComponent
    ],
    imports: [
      …
      FormsModule,
      BrowserAnimationsModule,
      FlexLayoutModule,
      CustomMaterialModule,
      JsFormModule
    ],
    providers: [
      I18nService
    ],
    …
  })
```

#### Edit app-routing.module.ts

```
  import { TopComponent } from './top/top.component';

  const routes: Routes = [
    { path: '',     component: TopComponent, pathMatch: 'full' },
    { path: 'top',  component: TopComponent, pathMatch: 'full' }
  ];
```

### step4 Writing an application

I will create a simple application that can switch between Japanese and English.
Please download the top component and definition from below and overwrite it in the app folder.

http://chotto-ii.com/ng2-jsform/data/app.zip


Rewrite app.component.html, app.component.ts, app.component.scss as follows.

```
<div id="wrap" *ngIf="pageView">
  <mat-toolbar color="primary">
    <button mat-button="" routerLink="/">
      <mat-icon>home </mat-icon>&nbsp;{{title}}
    </button><span class="fill-remaining-space"></span>
    <div fxLayout="row" fxShow="false" fxShow.gt-sm="fxShow.gt-sm">
      <button mat-button="mat-button" routerLink="/top">{{ 'menuTop' | mk_ng2_i18n: 'common' }}</button>
    </div>

    <mat-button-toggle-group [(ngModel)]="lang" (ngModelChange)="changeLang()">
        <mat-button-toggle value="ja">
          <span>日本語</span>
        </mat-button-toggle>
        <mat-button-toggle value="en">
          <span>English</span>
        </mat-button-toggle>
    </mat-button-toggle-group>

    <button mat-button="mat-button" [mat-menu-trigger-for]="menu" fxHide="false" fxHide.gt-sm="fxHide.gt-sm">
      <mat-icon>menu</mat-icon>
    </button>
  </mat-toolbar>
  <mat-menu x-position="before" #menu="matMenu">
    <button mat-menu-item="mat-menu-item" routerLink="/top">{{ 'menuTop' | mk_ng2_i18n: 'common' }}</button>
  </mat-menu>
  <div id="contents">
    <router-outlet></router-outlet>
  </div>
  <mat-toolbar class="footer">footer</mat-toolbar>
</div>
```

```
import { Component, OnInit } from '@angular/core';

import { I18nService } from 'ng2-jsform';
import { DateAdapter, NativeDateAdapter } from '@angular/material';

import { messageJa, messageEn } from './defs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  pageView = true;
  lang = 'ja';

  constructor(
    private dateAdapter: DateAdapter<NativeDateAdapter>,
    private i18n: I18nService
  ) {
  }

  ngOnInit() {
    this.dateAdapter.setLocale('ja-JP');
    this.i18n.setDictionary(messageJa);
  }

  changeLang() {
    this.pageView = false;
    if ( this.lang === 'ja') {
      this.dateAdapter.setLocale('ja-JP');
      this.i18n.setDictionary(messageJa);
    } else {
      this.dateAdapter.setLocale('en-US');
      this.i18n.setDictionary(messageEn);
    }
    setTimeout(() => {
      this.pageView = true;
    }, 100);
  }
}
```

```
.fill-remaining-space {
  flex: 1 1 auto;
}

mat-button-toggle {
  color: #fff!important;
}
```

### step4 Start-up

It is useful to add --open to ng serve so that the browser opens automatically at run time.

#### Edit package.json

```
  "scripts": {
     …
     "start": "ng serve --open",
     …
   },
```

#### Start-up

```
yarn start
```

Please access http: // localhost: 4200 / from the browser.

## Dependencies

ng2-jsformは、以下に依存します。

* Angular 4 or over
* Angular Material
* Angular flex-layout
* jQuery
* json-schema-ref-parser

## TODO

* Draft 6 automatic conversion of JSON Schema's Draft 4
* Custom validator
* textarea
* file
* WAI-ARIA compatible

## License

This software is released under the MIT License, see LICENSE.txt.
