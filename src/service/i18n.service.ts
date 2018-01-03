/**
 * 履歴
 *  2017/11/29 文字列''を許容するかどうかの第三引数isNullableを追加 (falseの場合はキーが画面上に露出)
 *  2017/11/30 ページ識別子が未設定の場合、'common'を参照するように変更
 */
import { Injectable } from '@angular/core';

import {
  isString
} from '../utility';

@Injectable()
export class I18nService {
  private cachedMessages: any;

  constructor(
  ) { }

  setDictionary( message: any ) {
    this.cachedMessages = message;
  }

  getMessage(page: string, key: string, isNullable: boolean): string {
    let ret = '';
    if ( key === undefined || key === '' || !isString(key) ) {
      return key;
    }
    key = key.trim();
    const messageName = 'message';
    const commonName = 'common';
    if ( this.cachedMessages ) {
      if ( this.cachedMessages[messageName][page] === undefined ) {
        ret = this.cachedMessages[messageName][commonName][key];
      } else {
        ret = this.cachedMessages[messageName][page][key] !== undefined ?
          this.cachedMessages[messageName][page][key] : this.cachedMessages[messageName][commonName][key];
      }

      // ヒットしなかった場合は、指定文字を返却
      if ( ret === '' || ret === undefined ) {
        ret = isNullable ? '' : key;
      }
    } else {
      ret = key;
    }
    return ret;
  }

  getValidationMessage(pageID: string, key: string, protertyName: string, option: string = '', isNullable = false): string {
    let ret = '';
    // 国際化対応
    const propName = this.getMessage(pageID, protertyName, isNullable);
    const validationName = 'validation';
    const i18nOption = this.getMessage(pageID, option, isNullable);
    if ( this.cachedMessages ) {
      ret = this.templateReplace(
        this.cachedMessages[validationName][key],
        {0: propName , 1: i18nOption}
      );
    } else {
      ret = key;
    }
    return ret;
  }

  /**
   * {0} と　{1}を置き換える
   * @param template 
   * @param replacement 
   */
  templateReplace(template, replacement) {
    let retValue = template;
    if ( template !== undefined ) {
      retValue = template.replace( /\{0\}/g , replacement['0'] );
      retValue = retValue.replace( /\{1\}/g , replacement['1'] );
    }
    return retValue;
  }
}
