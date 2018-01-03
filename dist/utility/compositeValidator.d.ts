import { ValidatorFn } from '@angular/forms';
export declare class CompositeValidators {
    /**
     * 複合バリデーションの実行
     * @param control
     * @param validators
     */
    static executeValidators(control: any, validators: any[]): any[];
    /**
     * oneOf: 複数条件の中で1つだけ満たすケース
     * @param validators
     */
    static oneOf(validators: any[]): ValidatorFn;
    /**
     * allOf: 全ての条件を満たすケース
     * エラーの場合、最初のものを返却
     * @param validators
     */
    static allOf(validators: any[]): ValidatorFn;
    /**
     * anyOf: １つでも条件を満たすケース
     * @param validators
     */
    static anyOf(validators: any[]): ValidatorFn;
    /**
     * not: 全ての条件を満たさないケース
     * @param validators
     */
    static not(validators: any[]): ValidatorFn;
}
