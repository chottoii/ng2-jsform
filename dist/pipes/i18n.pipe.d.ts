import { PipeTransform } from '@angular/core';
import { I18nService } from '../service/i18n.service';
export declare class I18nPipe implements PipeTransform {
    private i18n;
    constructor(i18n: I18nService);
    transform(value: string, page: string, isNullable?: boolean): string;
}
