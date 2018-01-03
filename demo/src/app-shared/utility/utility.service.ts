'use strict';

import { Injectable } from '@angular/core';
import { LogService } from '../../modules/logger/log.service';
import { StorageService } from '../../modules/storage/storage.service';

declare var $: any;

@Injectable()
export class UtilityService {
  constructor(
    public  logger:     LogService,
    public  storage:    StorageService  ) {
  }

  /**
   * idで指定したaタグに、content_idで指定したDOMの内容を、出力するリンクを生成
   * fileNameで指定しｔファイル名でdownloadフォルダに出力される
   * @param id 
   * @param content_id 
   * @param fileName 
   */
  public setBlobUrl(id: string, content: string, fileName: string) {
    // 指定されたデータを保持するBlobを作成する。
    const data = $('#' + content).val();
    const blob = new Blob([ data ], { 'type' : 'application/x-msdownload' });
    // Aタグのhref属性にBlobオブジェクトを設定する。
    $('#' + id).attr('href', window.URL.createObjectURL(blob));
    $('#' + id).attr('download', fileName);
  }

  /**
   * idで指定したinput(type='file')のファイルを読み込んで、
   * content_idで指定したtextarea内に移入する
   * @param id 
   * @param content_id 
   */
  public imports(id: string, content_id: string) {
    $(document).ready( function() {
      $('#' + id).change( function(e) {
        const file = e.target.files[0];
        // FileReader.onloadイベントに
        // ファイル選択時に行いたい処理を書く
        const reader = new FileReader();
        reader.onload = function(e) {
          const result = 'result';
          // textarea内に読み込んだデータを移入
          $('#' + content_id).val('');
          $('#' + content_id).val(e.target[result]);
        };
        // Textとしてファイルを読み込む
        reader.readAsText(file);
      });
    }, false);
  }
}
