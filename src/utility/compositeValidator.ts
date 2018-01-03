import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  Validators
} from '@angular/forms';

import {
  isArray,
  isObject,
  isEmpty,
  isNumber,
  isString,
  isInteger,
  isBoolean,
  hasValue,
  isType
} from './utility';

import {
  CustomValidators
} from '../utility/validator'

export class CompositeValidators {
  /**
   * 複合バリデーションの実行
   * @param control 
   * @param validators 
   */
  static executeValidators(control: any, validators: any[]): any[] {
    const errors = [];
    validators.map( obj => {
      Object.keys(obj).forEach((func) => {
        errors.push(CustomValidators[func](obj[func])(control));
      });
    });
    return errors;
  }

  /**
   * oneOf: 複数条件の中で1つだけ満たすケース
   * @param validators 
   */
  static oneOf(validators: any[]): ValidatorFn {
    const result = (control: AbstractControl): {[key: string]: any} => {
      if (isEmpty(control.value)) { return null; }
      const results = this.executeValidators(control, validators);
      if ( results.filter( value => {
        return value === null;
      }).length !== 1) {
        return { 'oneOf': validators, inputValue: control.value };
      }
      return null;
    };
    return result;
  }

  /**
   * allOf: 全ての条件を満たすケース
   * エラーの場合、最初のものを返却
   * @param validators
   */
  static allOf(validators: any[]): ValidatorFn {
    const result = (control: AbstractControl): {[key: string]: any} => {
      if (isEmpty(control.value)) { return null; }
      const results = this.executeValidators(control, validators);
      const errors = results.filter( value => { return value !== null; });
      if ( errors.length > 0 ) {
        return errors[0];
      }
      return null;
    };
    return result;
  }

  /**
   * anyOf: １つでも条件を満たすケース
   * @param validators 
   */
  static anyOf(validators: any[]): ValidatorFn {
    const result = (control: AbstractControl): {[key: string]: any} => {
      if (isEmpty(control.value)) { return null; }
      const results = this.executeValidators(control, validators);
      const errors = results.filter( value => { return value !== null; });
      if ( errors.length === results.length ) {
        return { 'anyOf': validators, inputValue: control.value };
      }
      return null;
    };
    return result;
  }

  /**
   * not: 全ての条件を満たさないケース
   * @param validators 
   */
  static not(validators: any[]): ValidatorFn {
    const result = (control: AbstractControl): {[key: string]: any} => {
      if (isEmpty(control.value)) { return null; }
      const results = this.executeValidators(control, validators);
      if ( results.filter( value => {
        return value === null;
      }).length !== 0) {
        return { 'not': validators, inputValue: control.value };
      }
      return null;
    }
    return result;
  }
}
