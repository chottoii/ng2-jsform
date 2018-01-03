import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { isArray, isObject, isEmpty, isNumber, isString, isInteger, isBoolean, hasValue, isType } from './utility';
import { CustomValidators } from '../utility/validator';
var CompositeValidators = /** @class */ (function () {
    function CompositeValidators() {
    }
    /**
     * 複合バリデーションの実行
     * @param control
     * @param validators
     */
    /**
       * 複合バリデーションの実行
       * @param control
       * @param validators
       */
    CompositeValidators.executeValidators = /**
       * 複合バリデーションの実行
       * @param control
       * @param validators
       */
    function (control, validators) {
        var errors = [];
        validators.map(function (obj) {
            Object.keys(obj).forEach(function (func) {
                errors.push(CustomValidators[func](obj[func])(control));
            });
        });
        return errors;
    };
    /**
     * oneOf: 複数条件の中で1つだけ満たすケース
     * @param validators
     */
    /**
       * oneOf: 複数条件の中で1つだけ満たすケース
       * @param validators
       */
    CompositeValidators.oneOf = /**
       * oneOf: 複数条件の中で1つだけ満たすケース
       * @param validators
       */
    function (validators) {
        var _this = this;
        var result = function (control) {
            if (isEmpty(control.value)) {
                return null;
            }
            var results = _this.executeValidators(control, validators);
            if (results.filter(function (value) {
                return value === null;
            }).length !== 1) {
                return { 'oneOf': validators, inputValue: control.value };
            }
            return null;
        };
        return result;
    };
    /**
     * allOf: 全ての条件を満たすケース
     * エラーの場合、最初のものを返却
     * @param validators
     */
    /**
       * allOf: 全ての条件を満たすケース
       * エラーの場合、最初のものを返却
       * @param validators
       */
    CompositeValidators.allOf = /**
       * allOf: 全ての条件を満たすケース
       * エラーの場合、最初のものを返却
       * @param validators
       */
    function (validators) {
        var _this = this;
        var result = function (control) {
            if (isEmpty(control.value)) {
                return null;
            }
            var results = _this.executeValidators(control, validators);
            var errors = results.filter(function (value) { return value !== null; });
            if (errors.length > 0) {
                return errors[0];
            }
            return null;
        };
        return result;
    };
    /**
     * anyOf: １つでも条件を満たすケース
     * @param validators
     */
    /**
       * anyOf: １つでも条件を満たすケース
       * @param validators
       */
    CompositeValidators.anyOf = /**
       * anyOf: １つでも条件を満たすケース
       * @param validators
       */
    function (validators) {
        var _this = this;
        var result = function (control) {
            if (isEmpty(control.value)) {
                return null;
            }
            var results = _this.executeValidators(control, validators);
            var errors = results.filter(function (value) { return value !== null; });
            if (errors.length === results.length) {
                return { 'anyOf': validators, inputValue: control.value };
            }
            return null;
        };
        return result;
    };
    /**
     * not: 全ての条件を満たさないケース
     * @param validators
     */
    /**
       * not: 全ての条件を満たさないケース
       * @param validators
       */
    CompositeValidators.not = /**
       * not: 全ての条件を満たさないケース
       * @param validators
       */
    function (validators) {
        var _this = this;
        var result = function (control) {
            if (isEmpty(control.value)) {
                return null;
            }
            var results = _this.executeValidators(control, validators);
            if (results.filter(function (value) {
                return value === null;
            }).length !== 0) {
                return { 'not': validators, inputValue: control.value };
            }
            return null;
        };
        return result;
    };
    return CompositeValidators;
}());
export { CompositeValidators };
