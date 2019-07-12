import { Pipe } from '@angular/core';
import { I18nService } from '../service/i18n.service';
var I18nPipe = (function () {
    function I18nPipe(i18n) {
        this.i18n = i18n;
    }
    I18nPipe.prototype.transform = function (value, page, isNullable) {
        if (isNullable === void 0) { isNullable = false; }
        return this.i18n.getMessage(page, value, isNullable);
    };
    I18nPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'mk_ng2_i18n'
                },] },
    ];
    /** @nocollapse */
    I18nPipe.ctorParameters = function () { return [
        { type: I18nService, },
    ]; };
    return I18nPipe;
}());
export { I18nPipe };
