import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
// Observableをインクルードしないとbuild時に以下のエラーが発生する
//  Return type of public method from exported class has 
//  or is using name 'Observable' from external module 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SharedParametersService {
  private sharedPara = new Subject<string[]>();
  sharedPara$ = this.sharedPara.asObservable();
  sendPara(jsonData: any) {
    this.sharedPara.next(jsonData);
  }
}
