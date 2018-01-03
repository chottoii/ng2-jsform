import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JsonReadService {
  constructor(private http: Http) { }

  getJsonObject(fileName: string) {
    return this.http
    .get('/assets/locale/' + fileName)
    .map(res => res.json());
    /*
    return this.http
      .get('/api?filename=' + fileName)
      .map(res => res.json());
    */
  }
}
