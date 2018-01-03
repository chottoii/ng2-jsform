import { Injectable } from '@angular/core';
import { Logger } from './logger';
import { Http } from '@angular/http';
/**
 * ## ログを管理するサービス
 *
 * ```ts
 * 【使い方】
 * コンストラーインジェクションを使ってDIする例
 * 
 * constructor(public logger: LogService) {
 *  // ログレベルをinfoレベルに設定
 *  this.logger.log.setLogLevel(LogLevel.info);
 *  this.logger.log.info('infoレベルのログ');
 * }
 * 
 * ```
 * 
 * | メソッド名 | ログレベル  |
 * |:-----------|------------:|
 * | debug      |           4 |
 * | info       |           3 |
 * | warning    |           2 |
 * | error      |           1 |
 * 
 */
@Injectable()
export class LogService {

  /**
   * ロガーのインスタンス
   */
  public log: Logger = null;

  constructor(private http: Http) {
    if ( this.log === null ) {
      this.log = new Logger(http);
    }
  }

}
