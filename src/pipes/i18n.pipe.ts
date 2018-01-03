import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../service/i18n.service';

@Pipe({
  name: 'mk_ng2_i18n'
})
export class I18nPipe implements PipeTransform {

  constructor(private i18n: I18nService) {
  }

  transform(value: string, page: string, isNullable = false) {
    return this.i18n.getMessage(page, value, isNullable);
  }
}
