import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var SharedParametersService = (function () {
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
    return SharedParametersService;
}());
export { SharedParametersService };
