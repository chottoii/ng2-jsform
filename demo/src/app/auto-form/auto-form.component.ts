import {
  Component,
  Input,
  OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { JsfService } from '../../lib/';

import { UtilityService } from '../../app-shared/utility/utility.service';
import { JsonReadService } from '../../app-shared/utility/json-read.service';

import { DateAdapter, NativeDateAdapter } from '@angular/material';

// カスタマイズwidgwts
import { SimpleComponent } from '../customize';

import {
  defaultMaster,
  messageJa,
  messageEn,
  simpleColumn,
  simpleRow,
  structured,
  array,
  refTest,
  tabs,
  validation,
  customize,
  wrapper,
  hint,
  allSelect,
  categorySelect
} from './defs'

/**
 * 表示設定関数
 * @param form 
 */
function viewFunc(form: FormGroup) {
  const targetName = 'firstName';
  return form.controls[targetName].value !== '' ? true : false;
};

declare var YAML: any;
declare var $: any;

@Component({
  selector: 'app-auto-form',
  templateUrl: './auto-form.component.html',
  styleUrls: ['./auto-form.component.scss'],
  providers: [ JsfService ]
})
export class AutoFormComponent implements OnInit {
  /** 表示フラグ */
  viewFlag = false;
  /** ページ識別子 */
  pageId = 'structured';
  /** 言語識別子 1:日本語 2:英語 */
  lang = '1';
  // 結果表示エリア
  payLoad = '';

  samplePage = {
    'group': [
      { 'title': 'basic', 'items': [
        { key: 'structured',      name: '構造化スキーマ' },
        { key: 'simpleColumn',    name: 'シンプル 列' },
        { key: 'simpleRow',       name: 'シンプル 行' },
        { key: 'array',           name: 'Array' },
        { key: 'tabs',            name: 'タブ' },
        { key: 'validation',      name: 'バリデーション' }
      ]},
      { 'title': 'advanced', 'items': [
        { key: 'wrapper',         name: 'wrapper' },
        { key: 'hint',            name: 'active hint' },
        { key: 'allSelect',       name: 'allSelect' },
        { key: 'categorySelect',  name: 'categorySelect' },
        { key: 'customize',       name: 'customize' }
      ]}
    ]
  };

  pageDefs = {
    'structured': structured,
    'simpleColumn': simpleColumn,
    'simpleRow': simpleRow,
    'array': array,
    'tabs': tabs,
    'validation': validation,
    'wrapper': wrapper,
    'hint': hint,
    'allSelect': allSelect,
    'categorySelect': categorySelect,
    'customize': customize
  }

  // JSON Schema
  ymlString   = null;
  // layout
  formString  = null;
  // 規定値
  data        = null;
  dataString  = '';

  jsonFormString  = '';
  formObject: any = null;
  jsonString      = '';
  schemaObject: any = null;

  message: any = null;
  master: any = null;

  public favorite: Array<Object> = null;
  public favoriteList: Array<String> = null;

  public customize = {};

  combine = {
    widgets: null,
    schema: null,
    layout: null,
    master: null,
    // 規定値
    data: null,
    message: null,
    page: {
      pageID: 'structured'
    },
  };

  constructor(
    public dateAdapter: DateAdapter<NativeDateAdapter>,
    public js: JsonReadService,
    public utility: UtilityService,
    private jsf: JsfService
  ) {
  }

  ngOnInit() {
    // カスタマイズwidgets設定
    this.customize = {
      inputWithRemarks: SimpleComponent
    }
    // メッセージファイル読み込み
    const message = this.utility.storage.get('message-ja');
    if ( message !== '' ) {
      this.message = message;
    } else {
      this.message = messageJa;
      this.utility.storage.set('message-ja', this.message);
    }
    this.dateAdapter.setLocale('ja-JP');

    // マスターファイル読み込み
    const master = this.utility.storage.get('master');
    if ( master !== '' ) {
      this.master = master;
    } else {
      this.master = defaultMaster;
      this.utility.storage.set('master', this.master);
    }
    this.setCombine();
    this.pageSet()

    // お気に入りの読み込み
    const favorite = this.utility.storage.get('favorite');
    if ( favorite !== '' ) {
      this.favorite = favorite;
    }
    this.viewFavorite();
    this.viewFlag = true;
  }

  changeLang() {
    this.viewFlag = false;
    if ( this.lang === '1') {
      this.dateAdapter.setLocale('ja-JP');
      const message = this.utility.storage.get('message-ja');
      if ( message !== '' ) {
        this.message = message;
      } else {
        this.message = messageJa;
        this.utility.storage.set('message-ja', this.message);
      }
    } else {
      this.dateAdapter.setLocale('en-US');
      const message = this.utility.storage.get('message-en');
      if ( message !== '' ) {
        this.message = message;
      } else {
        this.message = messageEn;
        this.utility.storage.set('message-en', this.message);
      }
    }
    this.setCombine();
    // 以下の処理を行わないと表示が切り替わらない。
    setTimeout(() => {
      this.viewFlag = true;
    }, 100);
  }

  submit(event: any) {
    switch (event.kind) {
      case 'submit':
        this.payLoad = event.obj;
        break;
    }
  }

  setCombine() {
    this.combine = {
      widgets: this.customize,
      schema: null,
      layout: null,
      master: null,
      // 規定値
      data: null,
      message: null,
      page: {
        pageID: this.pageId
      },
    };

    this.combine.schema   = this.schemaObject;
    this.combine.layout   = this.formObject;
    this.combine.master   = this.master;
    this.combine.data     = this.data;
    this.combine.message  = this.message;

    if ( this.pageId === 'wrapper' ) {
      this.combine.layout[0].items[0].items[0].viewFunc = viewFunc;
      // console.log(this.combine.layout[0].items[0].items[0].viewFunc);
    }

  }

  pageSet() {
    this.ymlString = this.pageDefs[this.pageId].schema;
    this.formString = this.pageDefs[this.pageId].layout;
    this.data = this.pageDefs[this.pageId].data
    this.ymlChange(false);
  }

  /**
   * 定義をコンパイルして、更新する
   * @param syncFlag DOMとの同期を行うフラグ
   */
  ymlChange(syncFlag: boolean) {
    this.viewFlag = false;
    // jQueryで挿入した値をAngularと同期させる
    if ( syncFlag ) {
      this.formString = $('#form-contents').val();
      this.ymlString  = $('#schema-contents').val();
      this.dataString = $('#data-contents').val();
      this.data = JSON.parse(this.dataString);
    } else {
      this.dataString = JSON.stringify(this.data, null, '  ');
    }

    this.formObject = YAML.parse(this.formString);
    this.jsonFormString = JSON.stringify(this.formObject, null, '  ');

    this.schemaObject = YAML.parse(this.ymlString);
    this.jsonString = JSON.stringify(this.schemaObject, null, '  ');
    this.setCombine();
    this.viewFlag = true;
  }

  public registFavorite() {
    if ( this.favorite === null ) {
      this.favorite = new Array<Object>();
    }
    const obj = {
      form: this.formString,
      schema: this.ymlString,
      data: this.data
    }
    this.favorite.unshift($.extend(true, {}, obj));
    this.utility.storage.set('favorite', this.favorite);
    this.viewFavorite();
  }

  public readFavorite(id: number) {
    const obj = $.extend(true, {}, this.favorite[id]);
    const propertyForm    = 'form';
    const propertySchema  = 'schema';
    const propertyData    = 'data';
    this.formString = obj[propertyForm];
    this.ymlString  = obj[propertySchema];
    this.data = obj[propertyData];
    this.ymlChange(false);
  }

  public updateFavorite(id: number) {
    this.removeFavorite(id);
    this.registFavorite();
  }

  public removeFavorite(id: number) {
    this.favorite.splice(id, 1);
    this.utility.storage.set('favorite', this.favorite);
    this.viewFavorite();
  }

  public viewFavorite() {
    if ( this.favorite !== null ) {
      this.favoriteList = new Array<String>();
      for ( let i = 0; i < this.favorite.length ; i++ ) {
        const property = 'schema';
        const schemaObject = YAML.parse(this.favorite[i][property]);
        this.favoriteList.push(this.jsf.getPageTitle(schemaObject));
      }
    }
  }

  /**
   * idで指定したaタグに、content_idで指定したDOMの内容を、出力するリンクを生成
   * fileNameで指定したファイル名でdownloadフォルダに出力される
   * @param id 
   * @param content_id 
   * @param fileName 
   */
  public exports(id: string, content_id: string, fileName: string) {
    this.utility.setBlobUrl(id, content_id, fileName);
  }

  public imports(id: string, content_id: string) {
    this.utility.imports(id, content_id);
  }
}
