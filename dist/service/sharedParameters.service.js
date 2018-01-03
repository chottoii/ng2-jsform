import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
// Observableをインクルードしないとbuild時に以下のエラーが発生する
//  Return type of public method from exported class has
//  or is using name 'Observable' from external module
import { Observable } from 'rxjs/Observable';
var SharedParametersService = /** @class */ (function () {
    function SharedParametersService() {
        this.sharedPara = new Subject();
        this.sharedPara$ = this.sharedPara.asObservable();
    }
    SharedParametersService.prototype.sendPara = function (jsonData) {
        this.sharedPara.next(jsonData);
    };
    SharedParametersService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SharedParametersService.ctorParameters = function () { return []; };
    return SharedParametersService;
}());
export { SharedParametersService };
