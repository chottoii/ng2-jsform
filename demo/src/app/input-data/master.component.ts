import {
  Component,
  Input,
  OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UtilityService } from '../../app-shared/utility/utility.service';

import {
  defaultMaster
} from '../auto-form/defs'

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  masterString = '';

  constructor(
    public utility: UtilityService
  ) {
  }

  ngOnInit() {
    // マスタファイル読み込み
    const master = this.utility.storage.get('master');
    if ( master !== '' ) {
      this.masterString = JSON.stringify(master, null, '  ');
    } else {
      this.masterString = JSON.stringify(defaultMaster, null, '  ');
      this.utility.storage.set('master', defaultMaster);
    }
  }

  save() {
    this.utility.storage.set('master', this.masterString);
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
