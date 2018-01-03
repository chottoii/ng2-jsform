import { Injectable } from '@angular/core';

/**
 * ## クライアントサイドでの永続化サービス
 * @version 0.0.3
 * 
 * ```ts
 * 【使い方】
 * コンストラーインジェクションを使ってDIする例
 * 
 * constructor(public storage: LocalStorage) {
 *   this.storage.set('key', '保存するデータ');
 *   let data = this.storage.get('key');
 * }
 * 
 * ``` 
 */
@Injectable()
export class StorageService {
  public localStorage: any;
  public sessionStorage: any;

  constructor() {
    if (!localStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.localStorage = localStorage;
    if (!sessionStorage) {
      throw new Error('Current browser does not support Session Storage');
    }
    this.sessionStorage = sessionStorage;
  }

  /**
   * localStorageに保存する
   * オブジェクトを指定するとシリアライズして保存される
   */
  public set(key: string, value: any): void {
    if ('string' === typeof value) {
      this.localStorage[key] = value;
    } else {
      this.localStorage[key] = JSON.stringify(value);
    }
  }

  /**
   * localStorageから取得する
   * 存在しない場合は、''を返却
   * オブジェクト(JSON)の場合は、デシリアライズして返却される
   */
  public get(key: string): any {
    if (this.isJSON(this.localStorage[key])) {
      // JSONからObjectへの変換してから返却する
      return JSON.parse(this.localStorage[key] || '{}');
    }
    // JSONからObjectへの変換してから返却する
    return this.localStorage[key] || '';
  }

  /**
   * localStorage内に保存されたデータを削除
   */
  public remove(key: string): any {
    this.localStorage.removeItem(key);
  }

  /**
   * sessionStorageに保存する
   * オブジェクトを指定するとシリアライズして保存される
   */
  public setTemp(key: string, value: any): void {
    if ('string' === typeof value) {
      this.sessionStorage[key] = value;
    } else {
      this.sessionStorage[key] = JSON.stringify(value);
    }
  }

  /**
   * sessionStorageから取得する
   * 存在しない場合は、''を返却
   * オブジェクト(JSON)の場合は、デシリアライズして返却される
   */
  public getTemp(key: string): any {
    if (this.isJSON(this.sessionStorage[key])) {
      // JSONからObjectへの変換してから返却する
      return JSON.parse(this.sessionStorage[key] || '{}');
    }
    // JSONからObjectへの変換してから返却する
    return this.sessionStorage[key] || '';
  }

  /**
   * sessionStorage内に保存されたデータを削除
   */
  public removeTemp(key: string): any {
    this.sessionStorage.removeItem(key);
  }

  /**
   * JSON形式かどうかを判定する
   * [forbidden eval]がコンパイル時に出力されるが、とりあえず、無視
   * 　-> "no-eval": false,で回避
   */
  private isJSON(arg: any): boolean {
    arg = (typeof arg === 'function') ? arg() : arg;
    if (typeof arg  !== 'string') {
      return false;
    }
    try {
      arg = (!JSON) ? eval('(' + arg + ')') : JSON.parse(arg);
      return true;
    } catch (e) {
      return false;
    }
  }
}
