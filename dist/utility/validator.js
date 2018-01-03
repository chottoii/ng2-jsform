// 履歴
//  2017/12/21 patternの動的変更機能追加
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { isArray, isObject, isEmpty, isNumber, isString, isInteger, isBoolean, hasValue, isType } from './utility';
var CustomValidators = /** @class */ (function () {
    function CustomValidators() {
    }
    /**
     * minLength: 入力文字数が指定数以上であることを評価
     * @param minLength
     */
    /**
       * minLength: 入力文字数が指定数以上であることを評価
       * @param minLength
       */
    CustomValidators.minLength = /**
       * minLength: 入力文字数が指定数以上であることを評価
       * @param minLength
       */
    function (minLength) {
        var result = function (control) {
            if (isEmpty(control.value)) {
                return null;
            }
            var length = control.value ? control.value.length : 0;
            return length < minLength ?
                { 'minlength': { 'requiredLength': minLength, 'actualLength': length } } : null;
        };
        return result;
    };
    /**
     * maxLength: 入力文字数が指定数以下であることを評価
     * @param maxLength
     */
    /**
       * maxLength: 入力文字数が指定数以下であることを評価
       * @param maxLength
       */
    CustomValidators.maxLength = /**
       * maxLength: 入力文字数が指定数以下であることを評価
       * @param maxLength
       */
    function (maxLength) {
        var result = function (control) {
            if (isEmpty(control.value)) {
                return null;
            }
            var length = control.value ? control.value.length : 0;
            return length > maxLength ?
                { 'maxlength': { 'requiredLength': maxLength, 'actualLength': length } } : null;
        };
        return result;
    };
    /**
     * pattern: 指定の正規表現で評価
     *  2017/12/21 patternの動的変更機能追加
     * @param pattern
     */
    /**
       * pattern: 指定の正規表現で評価
       *  2017/12/21 patternの動的変更機能追加
       * @param pattern
       */
    CustomValidators.pattern = /**
       * pattern: 指定の正規表現で評価
       *  2017/12/21 patternの動的変更機能追加
       * @param pattern
       */
    function (pattern) {
        var result = function (control) {
            if (isEmpty(control.value)) {
                return null;
            }
            var inputValue = control.value;
            var requiredPattern = "^" + pattern + "$";
            var dynamicPattern = 'dynamicPattern';
            if (control[dynamicPattern] !== undefined) {
                requiredPattern = "^" + control[dynamicPattern] + "$";
            }
            console.log('requiredPattern--->' + requiredPattern);
            var regex = new RegExp(requiredPattern);
            var isValid = isString(inputValue) ? regex.test(inputValue) : false;
            return isValid ? null : { 'pattern': { requiredPattern: requiredPattern, inputValue: inputValue } };
        };
        return result;
    };
    /**
     * minimum: 指定値以上であることを評価
     * @param min
     */
    /**
       * minimum: 指定値以上であることを評価
       * @param min
       */
    CustomValidators.minimum = /**
       * minimum: 指定値以上であることを評価
       * @param min
       */
    function (min) {
        var result = function (control) {
            if (isEmpty(control.value) || isEmpty(min)) {
                return null;
            }
            var inputValue = parseInt(control.value);
            return !isNaN(inputValue) && inputValue < min ? { 'min': { 'min': min, 'actual': inputValue } } : null;
        };
        return result;
    };
    CustomValidators.maximum = function (max) {
        var result = function (control) {
            if (isEmpty(control.value) || isEmpty(max)) {
                return null;
            }
            var inputValue = parseInt(control.value);
            return !isNaN(inputValue) && inputValue > max ? { 'max': { 'max': max, 'actual': inputValue } } : null;
        };
        return result;
    };
    /**
     * enum: 指定配列内の値のいずれかと等しい
     * @param enumList
     */
    /**
       * enum: 指定配列内の値のいずれかと等しい
       * @param enumList
       */
    CustomValidators.enum = /**
       * enum: 指定配列内の値のいずれかと等しい
       * @param enumList
       */
    function (enumList) {
        var result = function (control) {
            var inputValue = control.value;
            if (isEmpty(inputValue)) {
                return null;
            }
            else {
                return enumList.indexOf(inputValue) >= 0 ? null : { 'enum': { enumList: enumList, inputValue: inputValue } };
            }
        };
        return result;
    };
    /**
     * multipleOf: 0より大きい数値で、除算が整数になるもの
     * @param multipleOf
     */
    /**
       * multipleOf: 0より大きい数値で、除算が整数になるもの
       * @param multipleOf
       */
    CustomValidators.multipleOf = /**
       * multipleOf: 0より大きい数値で、除算が整数になるもの
       * @param multipleOf
       */
    function (multipleOf) {
        var result = function (control) {
            var inputValue = control.value;
            if (isEmpty(inputValue)) {
                return null;
            }
            else {
                var isValid = isNumber(inputValue) && inputValue % multipleOf === 0;
                return isValid ? null : { 'multipleof': { multipleOf: multipleOf, inputValue: inputValue } };
            }
        };
        return result;
    };
    /**
     * exclusiveMinimum: 指定値より大きい数値
     * TODO 障害0を指定すると本処理が呼び出されない。minにも同様の不具合あり。
     * @param exclusiveMinimum
     */
    /**
       * exclusiveMinimum: 指定値より大きい数値
       * TODO 障害0を指定すると本処理が呼び出されない。minにも同様の不具合あり。
       * @param exclusiveMinimum
       */
    CustomValidators.exclusiveMinimum = /**
       * exclusiveMinimum: 指定値より大きい数値
       * TODO 障害0を指定すると本処理が呼び出されない。minにも同様の不具合あり。
       * @param exclusiveMinimum
       */
    function (exclusiveMinimum) {
        var result = function (control) {
            var inputValue = control.value;
            if (isEmpty(inputValue)) {
                return null;
            }
            else {
                var isValid = isNumber(inputValue) && inputValue > exclusiveMinimum;
                return isValid ? null : { 'exclusiveminimum': { exclusiveMinimum: exclusiveMinimum, inputValue: inputValue } };
            }
        };
        return result;
    };
    /**
     * exclusiveMaximum: 指定値より小さい数値
     * @param exclusiveMaximum
     */
    /**
       * exclusiveMaximum: 指定値より小さい数値
       * @param exclusiveMaximum
       */
    CustomValidators.exclusiveMaximum = /**
       * exclusiveMaximum: 指定値より小さい数値
       * @param exclusiveMaximum
       */
    function (exclusiveMaximum) {
        var result = function (control) {
            var inputValue = control.value;
            if (isEmpty(inputValue)) {
                return null;
            }
            else {
                var isValid = isNumber(inputValue) && inputValue < exclusiveMaximum;
                return isValid ? null : { 'exclusivemaximum': { exclusiveMaximum: exclusiveMaximum, inputValue: inputValue } };
            }
        };
        return result;
    };
    /**
     * type: 指定型の評価
     * 履歴
     *  2017/12/04 日付タイプがオブジェクトで返送されるケースを考慮
     * @param type
     */
    /**
       * type: 指定型の評価
       * 履歴
       *  2017/12/04 日付タイプがオブジェクトで返送されるケースを考慮
       * @param type
       */
    CustomValidators.type = /**
       * type: 指定型の評価
       * 履歴
       *  2017/12/04 日付タイプがオブジェクトで返送されるケースを考慮
       * @param type
       */
    function (type) {
        var result = function (control) {
            if (isEmpty(control.value)) {
                return null;
            }
            var inputValue = control.value;
            switch (type) {
                case 'string':
                    if (isString(inputValue) || typeof inputValue === 'object') {
                        return null;
                    }
                    return { 'type': { type: type, inputValue: inputValue } };
                case 'array':
                    if (isString(inputValue)) {
                        return null;
                    }
                    return { 'type': { type: type, inputValue: inputValue } };
                case 'object':
                    if (isObject(inputValue)) {
                        return null;
                    }
                    return { 'type': { type: type, inputValue: inputValue } };
                default:
                    if (isType(inputValue, type) === true) {
                        return null;
                    }
                    return { 'type': { type: type, inputValue: inputValue } };
            }
        };
        return result;
    };
    /**
     * format: 指定フォーマットの評価
     * @param format
     */
    /**
       * format: 指定フォーマットの評価
       * @param format
       */
    CustomValidators.format = /**
       * format: 指定フォーマットの評価
       * @param format
       */
    function (format) {
        var result = function (control) {
            if (isEmpty(control.value)) {
                return null;
            }
            var isValid;
            var inputValue = control.value;
            if (!isString(inputValue)) {
                isValid = false;
            }
            else {
                switch (format) {
                    case 'date-time':
                        isValid = !!inputValue.match(/^([0-9]+)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])[Tt]([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(([Zz])|([\+|\-]([01][0-9]|2[0-3]):[0-5][0-9]))$/);
                        break;
                    case 'email':
                        var parts = inputValue.split('@');
                        isValid =
                            !!parts && parts.length === 2 &&
                                !!parts[0].match(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")$/)
                                &&
                                    !!parts[1].match(/(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*\.?/);
                        break;
                    case 'hostname':
                        isValid = !!inputValue.match(/(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*\.?/);
                        break;
                    case 'ipv4':
                        isValid = !!inputValue.match(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
                        break;
                    case 'ipv6':
                        isValid = !!inputValue.match(/(([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))/);
                        break;
                    case 'uri':
                    case 'url':
                        isValid = !!inputValue.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)$/);
                        break;
                    case 'color':
                        isValid = !!inputValue.match(/^#[A-Fa-f0-9]{6}$/);
                        break;
                    default:
                        isValid = true;
                }
            }
            return isValid ? null : { 'format': { format: format, inputValue: inputValue } };
        };
        return result;
    };
    return CustomValidators;
}());
export { CustomValidators };
;
