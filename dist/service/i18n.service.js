import { Injectable } from '@angular/core';
import { isString } from '../utility';
var I18nService = (function () {
    function I18nService() {
    }
    I18nService.prototype.setDictionary = function (message) {
        this.cachedMessages = message;
    };
    I18nService.prototype.getMessage = function (page, key, isNullable) {
        var ret = '';
        if (key === undefined || key === '' || !isString(key)) {
            return key;
        }
        key = key.trim();
        var messageName = 'message';
        var commonName = 'common';
        if (this.cachedMessages) {
            if (this.cachedMessages[messageName][page] === undefined) {
                ret = this.cachedMessages[messageName][commonName][key];
            }
            else {
                ret = this.cachedMessages[messageName][page][key] !== undefined ?
                    this.cachedMessages[messageName][page][key] : this.cachedMessages[messageName][commonName][key];
            }
            // ヒットしなかった場合は、指定文字を返却
            if (ret === '' || ret === undefined) {
                ret = isNullable ? '' : key;
            }
        }
        else {
            ret = key;
        }
        return ret;
    };
    I18nService.prototype.getValidationMessage = function (pageID, key, protertyName, option, isNullable) {
        if (option === void 0) { option = ''; }
        if (isNullable === void 0) { isNullable = false; }
        var ret = '';
        // 国際化対応
        var propName = this.getMessage(pageID, protertyName, isNullable);
        var validationName = 'validation';
        var i18nOption = this.getMessage(pageID, option, isNullable);
        if (this.cachedMessages) {
            ret = this.templateReplace(this.cachedMessages[validationName][key], { 0: propName, 1: i18nOption });
        }
        else {
            ret = key;
        }
        return ret;
    };
    /**
     * {0} と　{1}を置き換える
     * @param template
     * @param replacement
     */
    /**
       * {0} と　{1}を置き換える
       * @param template
       * @param replacement
       */
    I18nService.prototype.templateReplace = /**
       * {0} と　{1}を置き換える
       * @param template
       * @param replacement
       */
    function (template, replacement) {
        var retValue = template;
        if (template !== undefined) {
            retValue = template.replace(/\{0\}/g, replacement['0']);
            retValue = retValue.replace(/\{1\}/g, replacement['1']);
        }
        return retValue;
    };
    I18nService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    I18nService.ctorParameters = function () { return []; };
    return I18nService;
}());
export { I18nService };
