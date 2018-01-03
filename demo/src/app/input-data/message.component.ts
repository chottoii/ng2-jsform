import {
  Component,
  Input,
  OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UtilityService } from '../../app-shared/utility/utility.service';

import {
  messageJa,
  messageEn
} from '../auto-form/defs'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  messageJaString = '';
  messageEnString = '';

  constructor(
    public utility: UtilityService
  ) {
  }

  ngOnInit() {
    // メッセージファイル読み込み
    let message = this.utility.storage.get('message-ja');
    if ( message !== '' ) {
      this.messageJaString = JSON.stringify(message, null, '  ');
    } else {
      this.messageJaString = JSON.stringify(messageJa, null, '  ');
      this.utility.storage.set('message-ja', messageJa);
    }
    message = this.utility.storage.get('message-en');
    if ( message !== '' ) {
      this.messageEnString = JSON.stringify(message, null, '  ');
    } else {
      this.messageEnString = JSON.stringify(messageEn, null, '  ');
      this.utility.storage.set('message-en', messageEn);
    }
  }

  save() {
    this.utility.storage.set('message-ja', this.messageJaString);
    this.utility.storage.set('message-en', this.messageEnString);
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
