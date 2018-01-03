/**
 * ロガー本体
 */
'use strict';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

/**
 * ## ログレベル
 * 0. [FATAL]	致命的なエラー。プログラムの異常終了を伴うようなもの。
 * 1. ERROR	エラー。予期しないその他の実行時エラー。
 * 2. WARN	    警告。廃要素となったAPIの使用、APIの不適切な使用、エラーに近い事象など。
 * 3. INFO	    情報。実行時の何らかの注目すべき事象（開始や終了など）。
 * 4. DEBUG	デバッグ用の情報。システムの動作状況に関する詳細な情報。
 * 0. [TRACE]	トレース情報。更に詳細な情報。
 * ###### **[]に囲われているものは未サポート**
 */
export const LogLevel = {
  debug: 		4,
  info: 		3,
  warning: 	2,
  error: 		1
};

/**
 * @class ロガークラス
 * @author T.Tokumura
 */
export class Logger {
  /** ログ出力レベル。規定値はinfoレベル */
  private _logLevel: number = LogLevel.info;

  constructor(private http: Http) { }

  /**
   * ログレベルの設定
   */
  public setLogLevel(level: number) {
    this._logLevel = level;
  }

  /**
   * 現在のログレベルの取得
   */
  public getLogLevel(): number {
    return this._logLevel;
  }

  /**
   * debugレベルのログを設定する
   */
  public debug(...args: any[]) {
    if (this._logLevel >= LogLevel.debug) {
      const t = ['%cDebug: ', 'color:green'];
      t.push(...args);
      this._log('D', t, args);
    }
  }

  /**
   * infoレベルのログを設定する
   */
  public info(...args: any[]) {
    if (this._logLevel >= LogLevel.info) {
      const t = ['%cInfo: ', 'color:blue'];
      t.push(...args);
      this._log('I', t, args);
    }
  }

  /**
   * warningレベルのログを設定する
   */
  public warning(...args: any[]) {
    if (this._logLevel >= LogLevel.warning) {
      const t = ['%cWarning: ', 'color:orange'];
      t.push(...args);
      this._log('W', t, args);
    }
  }

  /**
   * errorレベルのログを設定する
   */
  public error(...args: any[]) {
    const obj = {};
    // Error.captureStackTrace( obj, this.error );
    if (this._logLevel >= LogLevel.error) {
      const t = ['%cError: ', 'color:red'];
      t.push(...args);
      this._log('E', t, args);
    }
  }

  /**  エラー情報のサーバ転送 */
  public addError(obj: any): void {
    const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    const options = new RequestOptions({ headers: headers });
    // 現在時刻の設定
    obj.time = this.getCurrentTime();

    const uri = 'logs';
    this.http.post(uri, obj, options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
  }

  /**
   * ログレベルに応じた文字色のヘッダーを伴ったログをコンソールに出力
   */
  private _log(level: string, t: any, ...args: any[]) {
    // コンソールへの出力
    console.log.apply(console, t);
    // サーバへの転送
    const body = {
      location: window.location.href,
      level: level,
      message: args,
      stackTrace: ''
    };
    this.addError(body);
  }

  /**  サーバ転送時エラー処理 */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // console.log(errMsg);
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  /**  現在時刻取得 */
  private getCurrentTime(): string {
    const now = new Date();
    const res = '' + now.getFullYear() + '/' + this.padZero(now.getMonth() + 1) +
              '/' + this.padZero(now.getDate()) + ' ' + this.padZero(now.getHours()) + ':' +
              this.	padZero(now.getMinutes()) + ':' + this.padZero(now.getSeconds());
    return res;
  }

  /**  先頭ゼロ付加 */
  private padZero(num: number): string {
    let result: string;
    if (num < 10) {
      result = '0' + num;
    } else {
      result = '' + num;
    }
    return result;
  }
}
