# Angular JSON Schema form + material + i18n

ng2-jsformは、JSON Schema形式の定義体からAngular4 (over)上で動作するformを生成するライブラリです。

## 特徴

ng2-jsformは、国際化に対応しています。各言語のメッセージデータを用意すれば、動的な表示切替が可能です。
主な機能を列挙します。

* materialデザイン
* flexレイアウト対応
* 国際化対応
* カスタムwidgets

また、widgets間を連携させることで多彩なformを生成できます。

* form要素の値に応じて、表示・非表示を動的に切り替える機能
* select項目毎にinputヒントを動的に切り替える機能
* 2つのselectの親子関係を設定する機能
* 選択した項目でグループ化されたwidgetsの表示・非表示を動的に切り替える機能
* 選択項目をグルーピングする機能
* グルーピングした項目をポップアップダイアログで選択する機能
* 選択項目を一括して選択・非選択する機能

## デモ

http://chotto-ii.com/ng2-jsform/demo/

## マニュアル

詳細は、
　http://chotto-ii.com/ng2-jsform/manual/
を参照してください。（注記：日本語です。）

## クイックスタート

動作確認したい場合は、以下の手順を実行してください。
node.jsとyarnを予めセットアップしておいてください。

```
  git clone https://github.com/milkeyway/ng2-jsform-sample.git ng2-jsform-sample
  cd ng2-jsform-sample
  yarn install
  yarn start
```

## インストール

開発環境を構築する場合は、以下の手順を行ってください。

### step1 angular cliのプロジェクトを作成

```
npm i -g angular-cli
ng new sample --style=scss --routing=true
```

### step2 Angular Materialのセットアップ

以下を参照して、Angular Matetialをセットアップしてください。

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

### step3 ng2-jsformのセットアップ

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

### step4 アプリケーションの記述

日本語と英語の切替ができる簡単なアプリケーションを作成します。
トップコンポーネントと定義体を下記からダウンロードして、appフォルダに上書きしてください。

http://chotto-ii.com/ng2-jsform/data/app.zip

app.component.html、app.component.ts、app.component.scssを以下のように書き換えます。

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

### step4 実行

実行時に自動でブラウザが開くようにng serveに--openを追加しておくと便利です。

#### Edit package.json

```
  "scripts": {
     …
     "start": "ng serve --open",
     …
   }, 
```

#### アプリケーションの実行

```
yarn start
```

ブラウザから http://localhost:4200/ にアクセスしてください。

## 依存関係

ng2-jsformは、以下に依存します。

* Angular 4 or over
* Angular Material
* Angular flex-layout
* jQuery
* json-schema-ref-parser

## TODO

* JSON SchemaのDraft4のDraft6自動変換
* カスタムバリデータ
* textarea
* file
* WAI-ARIA対応

## License

This software is released under the MIT License, see LICENSE.txt.
