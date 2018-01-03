/**
 * 変更履歴
 *  2017/11/10 singletonへの変更
 *  2017/11/10 array要素が複数ある場合の初期化障害対応
 *  2017/12/21 動的バリデーション機能
 *  2017/12/30 スキーマ階層構造サポート
 */
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { I18nService } from './i18n.service';

import {
  CustomValidators
} from '../utility/validator';

import {
  CompositeValidators
} from '../utility/compositeValidator';

import {
  isEmpty
} from '../utility';

@Injectable()
export class JsfService {
  static instance: JsfService = null; // nullで初期化しないとAOTでエラーになる
  debug = false;
  // カスタムWidgetsのためにtopフォームを保持する。
  form: FormGroup;
  schema: any;
  data: any;

  constructor(
    private fb: FormBuilder,
    private i18n: I18nService
  ) {
    return JsfService.instance = JsfService.instance || this;
  }

  setDebugMode(flag: boolean): void {
    this.debug = flag;
  }

  setForm(_form: FormGroup, _schema: any, _data: any) {
    this.form = _form;
    this.schema = _schema;
    this.data = _data;
  }

  getForm() {
    return this.form;
  }

  /**
   * スキーマ構造化対応のためにベースを変更
   * 2017/12/30 スキーマ階層構造サポート
   */
  getFormGroupKey(parent: any, key: string, data: any): any {
    const formGroupInfo = {
      parent: parent,
      key: key,
      data: data
    };
    if ( key !== undefined && key.split('.').length > 1 ) {
      let baseKey = '';
      key.split('.').forEach((id, index) => {
        if ( index === 0 ) {
          baseKey = id;
        } else {
          formGroupInfo.parent = formGroupInfo.parent.controls[baseKey];
          formGroupInfo.key = id;
          formGroupInfo.data = formGroupInfo.data[baseKey];
          baseKey = id;
        }
      });
    }
    return formGroupInfo;
  }

  /**
   * JSON Schemaからgroupオブジェクトを生成
   * @param jsonSchema
   * @return FormGroup
   */
  schemaToGroup(jsonSchema: any, data: any): any {
    const group: any = {};
    if ( jsonSchema === undefined || jsonSchema === null || jsonSchema.properties === null ) {
      throw new Error('abnormal JSON Schema: ' + jsonSchema);
      // throw new TypeError("型がちがうよ");
      // throw new SyntaxError("文法おかしいよ");
      // throw new URIError("URIちがうよ");
      // return group;
    }
    Object.keys(jsonSchema.properties).forEach((key) => {
      if ( jsonSchema.properties[key].type === 'array') {
        group[key] = this.fb.array([]);
      }
      // 構造化スキーマ対応 2017/12/28
      else if ( jsonSchema.properties[key].type === 'object') {
        // group[key] = this.fb.array([]);
        // group[key] = new FormGroup({prop: new FormControl('test', null )});
        group[key] = this.createFormGroup(jsonSchema.properties[key], data[key]);
      } else {
        group[key] = this.createFormItem('', jsonSchema.required, jsonSchema.properties, key, data);
      }
    });
    return group ;
  }

  createFormGroup(schema: any, data: any): FormGroup {
    const formControls = {};
    Object.keys(schema.properties).forEach((key) => {
      if ( schema.properties[key].type !== 'object') {
        formControls[key] = this.createFormItem('', schema.required, schema.properties, key, data);
      } else {
        formControls[key] = this.createFormGroup(schema.properties[key], data[key]);
      }
    });
    return new FormGroup(formControls);
  }

  /**
   * groupオブジェクトとJSON SchemaからFormGroupオブジェクトを生成
   * @param jsonSchema
   * @return FormGroup
   */
  groupToFormGroup(group: any, jsonSchema: any, data: any): FormGroup {
    const form = new FormGroup(group);
    // Arrayの初期化対応 2017/11/08
    // Array要素が複数ある時の障害対応 2017/11/10
    Object.keys(jsonSchema.properties).forEach((key) => {
      if ( jsonSchema.properties[key].type === 'array') {
        if ( data[key] !== undefined ) {
          for ( let i = 0; i < data[key].length; i++) {
            this.addItem(jsonSchema, form.controls, key, data, i);
          }
        }
      }
    });
    return form ;
  }

  /**
   * JSON SchemaからFormGroupオブジェクトを生成
   * @param jsonSchema
   * @return FormGroup
   */
  schemaToFormGroup(jsonSchema: any, data: any): FormGroup {
    const group: any = {};
    Object.keys(jsonSchema.properties).forEach((key) => {
      if ( jsonSchema.properties[key].type === 'array' ||
           jsonSchema.properties[key].type === 'object' ) {
        group[key] = this.fb.array([]);
      } else {
        group[key] = this.createFormItem('', jsonSchema.required, jsonSchema.properties, key, data);
      }
    });
    const form = new FormGroup(group);
    // Arrayの初期化対応 2017/11/08
    this.addArrayItems(form, jsonSchema, data);
    return form ;
  }

  /**
   * form reset
   */
  resetForm() {
    // remove all array
    this.removeAllArrayObject(this.form, this.schema, this.data);
    // form reset
    this.form.reset();
    // set all defaut value
    this.setAllDefult(this.form, this.schema, this.data);
    // rebuild array
    this.addArrayItems(this.form, this.schema, this.data);
  }

  /**
   * Array要素の削除
   * @param form
   * @param jsonSchema 
   * @param data 
   */
  removeAllArrayObject(form: FormGroup, jsonSchema: any, data: any) {
    const _this = this;
    Object.keys(jsonSchema.properties).forEach(function (key) {
      if ( jsonSchema.properties[key].type === 'array') {
        const controlsName = 'controls';
        const arrayNum = form.controls[key][controlsName].length;
        for ( let i = 0; i < arrayNum; i++ ) {
         _this.removeItem(form, key, 0); // 削除すると１個減るので常に０を削除
        }
      }
    });
  }

  setAllDefult(form: FormGroup, jsonSchema: any, data: any): void {
    const _this = this;
    Object.keys(jsonSchema.properties).forEach(function (key) {
      if ( jsonSchema.properties[key].type !== 'array' &&
           jsonSchema.properties[key].type !== 'object' ) {
        // 日付データの初期値処理
        const d = _this.getDefault(data[key]);
        form.controls[key].setValue(d);
      }
    });
  }

  /**
   * Array要素の追加
   *  Array要素が複数ある時の障害対応 2017/11/10
   * @param form
   * @param jsonSchema 
   * @param data 
   */
  addStructuredItems(group: any, jsonSchema: any, data: any) {
    Object.keys(jsonSchema.properties).forEach((key) => {
      if ( jsonSchema.properties[key].type === 'object') {
        console.log(this.form);
        const n1 = 'structured';
        const n2 = 'controls';
        this.form.controls[n1][n2].push(this.createFormItem(key, jsonSchema.required, jsonSchema, 'prop', data));
      }
    });
  }

  addArrayItems(form: FormGroup, jsonSchema: any, data: any) {
    Object.keys(jsonSchema.properties).forEach((key) => {
      if ( jsonSchema.properties[key].type === 'array') {
        if ( data[key] !== undefined ) {
          for ( let i = 0; i < data[key].length; i++) {
            this.addItem(jsonSchema, form.controls, key, data, i);
          }
        }
      }
    });
  }

  /**
   * Arrayオブジェクトの追加（初期時の他、動的追加に使用）
   * Arrayの初期化対応 2017/11/08 indexを追加
   * @param jsonSchema 
   * @param form 
   */
  addArray(jsonSchema: any, form: FormGroup, data: any, index = 0) {
    Object.keys(jsonSchema.properties).forEach((key) => {
      if ( jsonSchema.properties[key].type === 'array' ||
           jsonSchema.properties[key].type === 'object' ) {
        this.addItem(jsonSchema, form.controls, key, data, index);
      }
    });
  }

  /**
   * Array内のitemを追加
   * Arrayの初期化対応 2017/11/08 indexを追加
   *  履歴
   *    2017/11/24 propertiesがない場合の処理を追加
   *    2017/11/24 ２段Arrayサポート（ただし、既定値は１個だけ）
   * @param jsonSchema
   * @param form
   * @param key
   */
  addItem(jsonSchema: any, controls: any, key: any, data: any, index = 0) {
    const group: any = {};
    const _schema = jsonSchema.properties !== undefined ? jsonSchema.properties[key].items : jsonSchema[key].items;
    let schema = _schema;
    if ( _schema.properties !== undefined && _schema.properties !== null ) {
      schema = _schema.properties;
    }
    Object.keys(schema).forEach((_key) => {
      if ( schema[_key].type === 'array') {
        const subgroup: any = {};
        const subIndex = 0; // TODO 既定値は１個だけ
        Object.keys(schema[_key].items).forEach((__key) => {
          if ( __key !== 'properties' ) {
            subgroup[__key] = this.createFormItem(_key, schema[_key].required, schema[_key].items, __key, data[key][subIndex], index);
          }
        });
        group[_key] = this.fb.group(subgroup);
      } else {
        group[_key] = this.createFormItem(key, _schema.required, schema, _key, data, index);
      }
    });
    // const control = <FormArray>form.controls[key];
    const control = controls[key];
    control.push(new FormGroup(group));
  }

  /**
   * Array内のitemを削除
   * @param form
   * @param key
   * @param i
   */
  removeItem(form: FormGroup, key: any, i: number) {
    const control = <FormArray>form.controls[key];
    control.removeAt(i);
  }

  /**
   * items内の全chackboxに指定flagを設定する
   * TODO sectionのネストには未対応
   * @param form
   * @param items
   * @param flag
   */
  allSelect(form: FormGroup, items: any, flag: boolean) {
    const _this = this;
    Object.keys(items).forEach(function (key) {
      if ( items[key].type === 'section' ) {
        _this.selectFromSection(form, items[key], flag);
      } else if (items[key].type === 'checkbox') {
        form.controls[items[key].key].setValue(flag);
      }
    });
  }

  /**
   * section内のchackboxに指定flagを設定する
   * @param form
   * @param section
   * @param flag
   */
  selectFromSection(form: FormGroup, section: any, flag: boolean) {
    if ( section.items !== undefined ) {
      for (const item of Object.keys(section.items)) {
        if ( section.items[item].type !== undefined &&
             section.items[item].type === 'checkbox' ) {
          form.controls[section.items[item].key].setValue(flag);
        }
      }
    }
  }

  /**
   * FormControl要素を生成
   * 履歴
   *  2017/11/08 Arrayの初期化対応 indexを追加
   *  2017/11/24 items要素にpropertiesが設定されないケースに対応
   *  2017/11/26 requiredが参照できないレベルダウンに対応
   * @param kind 
   * @param jsonSchema 
   * @param key 
   * @param data 
   * @param index 
   */
  createFormItem(kind: string, required: any, jsonSchema: any, key: any, data: any, index = 0): any {
    const v: Array<any> = new Array();
    let i = 0;
    // 必須項目チェック
    if ( this.isRequired(key, required) ) {
      v[i++] = Validators.required;
    }
    // typeチェック
    if ( !isEmpty(jsonSchema[key].type) ) {
      v[i++] = CustomValidators.type(jsonSchema[key].type);
    }
    // formatチェック
    if ( !isEmpty(jsonSchema[key].format) ) {
      v[i++] = CustomValidators.format(jsonSchema[key].format);
    }
    // enum
    if ( !isEmpty(jsonSchema[key].enum) ) {
      v[i++] = CustomValidators.enum(jsonSchema[key].enum);
    }
    // パターンチェック
    if ( !isEmpty(jsonSchema[key].pattern) ) {
      v[i++] = CustomValidators.pattern(jsonSchema[key].pattern);
    }
    // minLengthチェック
    if ( !isEmpty(jsonSchema[key].minLength) ) {
      v[i++] = CustomValidators.minLength(jsonSchema[key].minLength);
    }
    // maxLengthチェック
    if ( !isEmpty(jsonSchema[key].maxLength) ) {
      v[i++] = CustomValidators.maxLength(jsonSchema[key].maxLength);
    }
    // multipleOf
    if ( !isEmpty(jsonSchema[key].multipleOf) ) {
      v[i++] = CustomValidators.multipleOf(jsonSchema[key].multipleOf);
    }
    // minimumチェック
    if ( !isEmpty(jsonSchema[key].minimum) ) {
      v[i++] = CustomValidators.minimum(jsonSchema[key].minimum);
    }
    // exclusiveMinimumチェック
    if ( !isEmpty(jsonSchema[key].exclusiveMinimum) ) {
      v[i++] = CustomValidators.exclusiveMinimum(jsonSchema[key].exclusiveMinimum);
    }
    // maximumチェック
    if ( !isEmpty(jsonSchema[key].maximum) ) {
      v[i++] = CustomValidators.maximum(jsonSchema[key].maximum);
    }
    // exclusiveMaximumチェック
    if ( !isEmpty(jsonSchema[key].exclusiveMaximum) ) {
      v[i++] = CustomValidators.exclusiveMaximum(jsonSchema[key].exclusiveMaximum);
    }
    // 以下は複合バリデータ
    if ( !isEmpty(jsonSchema[key].oneOf) ) {
      v[i++] = CompositeValidators.oneOf(jsonSchema[key].oneOf);
    }
    if ( !isEmpty(jsonSchema[key].allOf) ) {
      v[i++] = CompositeValidators.allOf(jsonSchema[key].allOf);
    }
    if ( !isEmpty(jsonSchema[key].anyOf) ) {
      v[i++] = CompositeValidators.anyOf(jsonSchema[key].anyOf);
    }
    if ( !isEmpty(jsonSchema[key].not) ) {
      v[i++] = CompositeValidators.not(jsonSchema[key].not);
    }
    // TODO 規定値の設定がまだ行われていない。
    // Array data ?
    let d = '';
    if ( kind !== '' ) {
      if ( data[kind] !== undefined && data[kind][index] !== undefined ) {
        d = this.getDefault(data[kind][index][key]);
      } else if ( data[kind] !== undefined && data[kind][key] !== undefined ) {
        d = this.getDefault(data[kind][key]);
      }
    } else {
      if ( data !== undefined ) {
        d = this.getDefault(data[key]);
      }
    }
    return new FormControl(d, v);
  }

  /**
   * バリデーション処理
   * @param form 
   * @param key 
   * @param dirty 
   */
  validation(pageID: string, form: FormGroup, key: any, dirty = false) {
    let formError = '';
    const control = form.get(key);
    if (control && (control.dirty || dirty) && !control.valid) {
      // control.errorsの存在チェックを行わないとnullエラーが発生する。
      if ( control.errors !== undefined && control.errors !== null ) {
        for (const error of Object.keys(control.errors)) {
          const validateType = error.toString().toLowerCase();
          switch ( validateType ) {
            case 'pattern':
              formError = this.i18n.getValidationMessage(pageID, validateType, key, '\'' + control.errors[validateType].requiredPattern + '\'');
              break;
            case 'multipleof':
              formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].multipleOf);
              break;
            case 'max':
              formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].max);
              break;
            case 'exclusivemaximum':
              formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].exclusiveMaximum);
              break;
            case 'min':
              formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].min);
              break;
            case 'exclusiveminimum':
              formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].exclusiveMinimum);
              break;
            case 'minlength':
              formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].requiredLength);
              break;
            case 'maxlength':
              formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].requiredLength);
              break;
            case 'items':
              // 検証不要
              break;
            case 'additionalitems':
              // 検証不要
              break;
            case 'maxitems':
              // 検証不要：レイアウトで制限する->Array時に必要か？
              break;
            case 'minitems':
              // 検証不要：レイアウトで制限する->Array時に必要か？
              break;
            case 'uniqueitems':
              // 未実装（Objectsのユニーク性の実装は困難？）->Array時に必要か？
              break;
            case 'contains':
              // 未実装
              break;
            case 'maxproperties':
              // 未実装　フォームバリデーションでは不要と思われるため
              break;
            case 'minproperties':
              // 未実装　フォームバリデーションでは不要と思われるため
              break;
            case 'required':
              formError = this.i18n.getValidationMessage(pageID, validateType, key);
              break;
            case 'patternproperties':
              // 未実装　フォームバリデーションでは不要と思われるため
              break;
            case 'additionalproperties':
              // 未実装　フォームバリデーションでは不要と思われるため
              break;
            case 'dependencies':
              // TODO 依存関係の検証をどのタイミングで行うのか検証が必要。
              break;
            case 'propertynames':
              // 未実装　フォームバリデーションでは不要と思われるため
              break;
            case 'enum':
              formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].enumList);
              break;
            case 'type':
              formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].type);
              break;
            case 'oneof': // 一つの条件のみ満たすケース
              formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType]);
              break;
            case 'anyof': // 一つの条件のみ満たすケース
              formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType]);
              break;
            case 'not': // 条件を満たさないケース
              formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType]);
              break;
            case 'format':
              formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].format);
              break;
          }
        }
      }
    }
    return formError;
  }

  /**
   * 指定されたデータが日付の場合、日付型を返却
   * undefinedの場合は、nullを返却
   * それ以外は、指定した値自身を返却
   * @param d
   */
  getDefault(d: string): any {
    let ret: any = d;
    if ( d !== undefined ) {
      // 日付チェック
      if ( this.isValidDate(d) ) {
        const ms = Date.parse(d);
        ret = new Date(ms);
      } else {
        ret = d;
      }
    } else {
      ret = null;
    }
    return ret;
  }

  /**
   * 指定の文字列が日付かどうかをチェックする
   * 例
   *  2017-09-02T15:00:00.000Z
   *  2017/09/02
   * 履歴
   *  2017/11/24 数字が日付とみなされる障害対応
   * @param s
   */
  isValidDate(s: string): boolean {
    let ret = false;
    const ms = Date.parse(s);
    if ( s !== null && s !== undefined &&  s.length < 20 ) {
      const matches = /^(\d+)\/(\d+)\/(\d+)$/.exec(s);
      if ( matches ) {
        const y = parseInt(matches[1], 10);
        const m = parseInt(matches[2], 10);
        const d = parseInt(matches[3], 10);
        if (m < 1 || m > 12 || d < 1 || d > 31) {
          ret = false;
        } else {
          const dt = new Date(y, m - 1, d, 0, 0, 0, 0);
          if ( dt.getFullYear() !== y
            || dt.getMonth() !== m - 1
            || dt.getDate() !== d) {
            ret = false;
          } else {
            ret = true;
          }
        }
      }
    }
    return ret;
  }

  /**
   * JSON Schemaの必須項目配列に指定のパラメタ存在チェックを行う。
   * @param key
   * @param dic 
   */
  isRequired(key: string, dic: string[]): boolean {
    let ret = false;
    if ( dic !== undefined && dic !== null && dic.length > 0 ) {
      for ( let i = 0; i < dic.length; i++) {
        if ( dic[i] === key ) {
          ret = true;
        }
      }
    }
    return ret;
  }

  /**
   * スキーマからページタイトルを取得
   * @param jsonSchema
   */
  public getPageTitle(jsonSchema: any): string {
    let pageTitle = 'not defined';
    if ( jsonSchema !== null && jsonSchema !== undefined ) {
      pageTitle = jsonSchema.title;
    }
    return pageTitle;
  }

  /**
   * 選択肢取得処理 マスターデータがない場合は、スキーマから取得
   * @param master マスタデータ
   * @param properties 
   * @param key 取得するマスタのキー
   */
  getMaster(master: any, properties: any, key: any): any {
    let selectList;
    if ( master !== null && master !== undefined ) {
      selectList = master[key];
      if ( selectList === null || selectList === undefined ) {
        selectList = [];
        let i = 0;
        let enumList: any = null;
        if ( properties[key] === undefined ) {
          throw new Error('master not found.');
        } else if ( properties[key].type === 'array' ) {
          enumList = properties[key].items.enum;
        } else if ( properties[key].type === 'object' ) {
          // console.log(properties[key]);
        } else {
          enumList = properties[key].enum;
        }
        try {
          for (const p of Object.keys(enumList)) {
            selectList[i++] = {
              key: enumList[p],
              value: enumList[p]
            };
          }
        } catch (err) {
          throw new Error('master not found.');
        }
      }
    } else {
      throw new Error('master not found.');
    }
    return selectList;
  }

  /**
   * 入力値の取得
   * @param form FormGroup
   * @param master マスタ
   * @param option widgetオプション
   * @param filterValue サブマスタ使用時のfilter値　未使用時は''を指定すること
   */
  getValue(form: FormGroup, master: any, option: any, filterValue = ''): any {
    let ret = form.controls[option.key].value;
    if ( master !== null && master !== undefined ) {
      if ( option.master !== null && option.master !== undefined ) {
        let selectList = master[option.master];
        if ( selectList === null || selectList === undefined ) {
          console.error('Exx: マスターデータが未登録です。');
        } else {
          if ( filterValue !== '' ) {
            selectList = selectList[filterValue];
          }
          Object.keys(selectList).forEach(function (i) {
            if ( selectList[i].value === ret ) {
              ret = selectList[i].key;
            }
          });
        }
      }
    } else {
      console.error('Exx: マスターが未登録です。');
    }
    return ret;
  }

  /**
   * ヒント取得処理 マスターデータのヒント情報を取得
   * @param master マスターデータ
   * @param kind マスタ種別
   * @param value 選択値
   * @param filterValue サブマスタ時のフィルタ値
   * 
   * 履歴
   *  選択項目のgroup機能対応
   *  動的バリデーション機能追加
   */
  getHint(master: any, kind: any, value: any, filterValue = ''): any {
    const ret = {
      name: '',
      hint: '',
      pattern: ''
    };
    if ( master !== null && master !== undefined ) {
      let selectList = master[kind];
      if ( selectList === null || selectList === undefined ) {
        console.error('Exx: マスターデータが未登録です。');
      } else {
        if ( filterValue !== '' ) {
          selectList = selectList[filterValue];
        }
        if ( selectList.group !== undefined ) {
          Object.keys(selectList.group).forEach(function (i) {
            Object.keys(selectList.group[i].items).forEach(function (j) {
              if ( selectList.group[i].items[j].value === value ) {
                ret.name = selectList.group[i].items[j].key;
                ret.hint = selectList.group[i].items[j].example;
                ret.pattern = selectList.group[i].items[j].pattern;
              }
            });
          });
        } else {
          Object.keys(selectList).forEach(function (i) {
            if ( selectList[i].value === value ) {
              ret.name = selectList[i].key;
              ret.hint = selectList[i].example;
              ret.pattern = selectList[i].pattern;
            }
          });
        }
      }
    }
    return ret;
  }

  /**
   * 条件付き表示制御
   * @param form 
   * @param option 
   */
  viewCondition(form: any, option: any): boolean {
    let ret = true;
    if ( option.dispCondition !== undefined ) {
      const conditionOr = option.dispCondition.split('|');
      if( conditionOr.length <= 1 ) {
        const condition = option.dispCondition.split(',');
        for ( let i = 0; i < condition.length ; i++ ) {
          const cond = condition[i].split('=');
          if ( cond[1] === 'true') {
            if ( form.controls[cond[0]].value === false ) {
              ret = false;
              break;
            }
          } else if (cond[1] === 'false') {
            if ( form.controls[cond[0]].value === true ) {
              ret = false;
              break;
            }
          } else if ( form.controls[cond[0]].value !== cond[1] ) {
            ret = false;
            break;
          }
        }
      } else {
        ret = false
        for ( let i = 0; i < conditionOr.length ; i++ ) {
          ret = this.viewConditionAnd(conditionOr[i], form, option);
          if ( ret ) {
            return ret;
          }
        }
      }

    }
    return ret;
  }

  viewConditionAnd(condisionAnd: string, form: any, option: any): boolean {
    let ret = true;
    if ( condisionAnd !== undefined ) {
      const condition = condisionAnd.split(',');
      for ( let i = 0; i < condition.length ; i++ ) {
        const cond = condition[i].split('=');
        if ( cond[1] === 'true') {
          if ( form.controls[cond[0]].value === false ) {
            ret = false;
            break;
          }
        } else if (cond[1] === 'false') {
          if ( form.controls[cond[0]].value === true ) {
            ret = false;
            break;
          }
        } else if ( form.controls[cond[0]].value !== cond[1] ) {
          ret = false;
          break;
        }
      }
    }
    return ret;
  }

  checkError(parentGroup: FormGroup, option: any, dimension: any, formErrors: any, pageID: string, key: any, dirty = false) {
    let p: FormGroup = parentGroup;
    if ( this.isCustomWidget(option.type) ) { // カスタマイズwidgetの場合
      const cName = 'controls';
      // array要素の場合、formオブジェクトの参照先を変更
      if ( parentGroup.controls[option.key] !== null && parentGroup.controls[option.key][cName] !== undefined) {
        p = parentGroup.controls[option.key][cName][dimension];
      }
      // keyがnullの場合は変更箇所を特定できないので、全部を確認する
      if ( key === null ) {
        // 以下の処理は実行されていないが、なぜか正常に動作している。？？？
        for (const _key of Object.keys(p[cName])) {
          formErrors[_key] = this.validation(pageID, p, _key, dirty);
        }
      } else {
        formErrors[key] = this.validation(pageID, p, key, dirty);
      }
    } else {
      formErrors[option.key] = this.validation(pageID, parentGroup, option.key, dirty);
    }
  }

  isCustomWidget(key: string): boolean {
    let ret = true;
    if ( key.match(/tabs|section|array|input|radio|checkbox|select|categorySelect|toggle|icon|date|file|display|label|test/) ) {
      ret = false;
    }
    return ret;
  }
}
