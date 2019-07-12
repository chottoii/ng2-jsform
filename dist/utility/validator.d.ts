import { ValidatorFn } from '@angular/forms';
export declare class CustomValidators {
    /**
     * minLength: 入力文字数が指定数以上であることを評価
     * @param minLength
     */
    static minLength(minLength: number): ValidatorFn;
    /**
     * maxLength: 入力文字数が指定数以下であることを評価
     * @param maxLength
     */
    static maxLength(maxLength: number): ValidatorFn;
    /**
     * pattern: 指定の正規表現で評価
     *  2017/12/21 patternの動的変更機能追加
     * @param pattern
     */
    static pattern(pattern: string): ValidatorFn;
    /**
     * minimum: 指定値以上であることを評価
     * @param min
     */
    static minimum(min: number): ValidatorFn;
    static maximum(max: number): ValidatorFn;
    /**
     * enum: 指定配列内の値のいずれかと等しい
     * @param enumList
     */
    static enum(enumList: any[]): ValidatorFn;
    /**
     * multipleOf: 0より大きい数値で、除算が整数になるもの
     * @param multipleOf
     */
    static multipleOf(multipleOf: number): ValidatorFn;
    /**
     * exclusiveMinimum: 指定値より大きい数値
     * TODO 障害0を指定すると本処理が呼び出されない。minにも同様の不具合あり。
     * @param exclusiveMinimum
     */
    static exclusiveMinimum(exclusiveMinimum: number): ValidatorFn;
    /**
     * exclusiveMaximum: 指定値より小さい数値
     * @param exclusiveMaximum
     */
    static exclusiveMaximum(exclusiveMaximum: number): ValidatorFn;
    /**
     * type: 指定型の評価
     * 履歴
     *  2017/12/04 日付タイプがオブジェクトで返送されるケースを考慮
     * @param type
     */
    static type(type: any): ValidatorFn;
    /**
     * format: 指定フォーマットの評価
     * @param format
     */
    static format(format: 'date-time' | 'email' | 'hostname' | 'ipv4' | 'ipv6' | 'uri' | 'url' | 'color'): ValidatorFn;
}
