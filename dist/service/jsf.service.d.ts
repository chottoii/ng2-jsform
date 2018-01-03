import { FormGroup, FormBuilder } from '@angular/forms';
import { I18nService } from './i18n.service';
export declare class JsfService {
    private fb;
    private i18n;
    static instance: JsfService;
    debug: boolean;
    form: FormGroup;
    schema: any;
    data: any;
    constructor(fb: FormBuilder, i18n: I18nService);
    setDebugMode(flag: boolean): void;
    setForm(_form: FormGroup, _schema: any, _data: any): void;
    getForm(): FormGroup;
    /**
     * スキーマ構造化対応のためにベースを変更
     * 2017/12/30 スキーマ階層構造サポート
     */
    getFormGroupKey(parent: any, key: string, data: any): any;
    /**
     * JSON Schemaからgroupオブジェクトを生成
     * @param jsonSchema
     * @return FormGroup
     */
    schemaToGroup(jsonSchema: any, data: any): any;
    createFormGroup(schema: any, data: any): FormGroup;
    /**
     * groupオブジェクトとJSON SchemaからFormGroupオブジェクトを生成
     * @param jsonSchema
     * @return FormGroup
     */
    groupToFormGroup(group: any, jsonSchema: any, data: any): FormGroup;
    /**
     * JSON SchemaからFormGroupオブジェクトを生成
     * @param jsonSchema
     * @return FormGroup
     */
    schemaToFormGroup(jsonSchema: any, data: any): FormGroup;
    /**
     * form reset
     */
    resetForm(): void;
    /**
     * Array要素の削除
     * @param form
     * @param jsonSchema
     * @param data
     */
    removeAllArrayObject(form: FormGroup, jsonSchema: any, data: any): void;
    setAllDefult(form: FormGroup, jsonSchema: any, data: any): void;
    /**
     * Array要素の追加
     *  Array要素が複数ある時の障害対応 2017/11/10
     * @param form
     * @param jsonSchema
     * @param data
     */
    addStructuredItems(group: any, jsonSchema: any, data: any): void;
    addArrayItems(form: FormGroup, jsonSchema: any, data: any): void;
    /**
     * Arrayオブジェクトの追加（初期時の他、動的追加に使用）
     * Arrayの初期化対応 2017/11/08 indexを追加
     * @param jsonSchema
     * @param form
     */
    addArray(jsonSchema: any, form: FormGroup, data: any, index?: number): void;
    /**
     * Array内のitemを追加
     * Arrayの初期化対応 2017/11/08 indexを追加
     *  履歴
     *    2017/11/24 propertiesがない場合の処理を追加
     *    2017/11/24 ２段Arrayサポート（ただし、既定値は１個だけ）
     * @param jsonSchema
     * @param form
     * @param key
     */
    addItem(jsonSchema: any, controls: any, key: any, data: any, index?: number): void;
    /**
     * Array内のitemを削除
     * @param form
     * @param key
     * @param i
     */
    removeItem(form: FormGroup, key: any, i: number): void;
    /**
     * items内の全chackboxに指定flagを設定する
     * TODO sectionのネストには未対応
     * @param form
     * @param items
     * @param flag
     */
    allSelect(form: FormGroup, items: any, flag: boolean): void;
    /**
     * section内のchackboxに指定flagを設定する
     * @param form
     * @param section
     * @param flag
     */
    selectFromSection(form: FormGroup, section: any, flag: boolean): void;
    /**
     * FormControl要素を生成
     * 履歴
     *  2017/11/08 Arrayの初期化対応 indexを追加
     *  2017/11/24 items要素にpropertiesが設定されないケースに対応
     *  2017/11/26 requiredが参照できないレベルダウンに対応
     * @param kind
     * @param jsonSchema
     * @param key
     * @param data
     * @param index
     */
    createFormItem(kind: string, required: any, jsonSchema: any, key: any, data: any, index?: number): any;
    /**
     * バリデーション処理
     * @param form
     * @param key
     * @param dirty
     */
    validation(pageID: string, form: FormGroup, key: any, dirty?: boolean): string;
    /**
     * 指定されたデータが日付の場合、日付型を返却
     * undefinedの場合は、nullを返却
     * それ以外は、指定した値自身を返却
     * @param d
     */
    getDefault(d: string): any;
    /**
     * 指定の文字列が日付かどうかをチェックする
     * 例
     *  2017-09-02T15:00:00.000Z
     *  2017/09/02
     * 履歴
     *  2017/11/24 数字が日付とみなされる障害対応
     * @param s
     */
    isValidDate(s: string): boolean;
    /**
     * JSON Schemaの必須項目配列に指定のパラメタ存在チェックを行う。
     * @param key
     * @param dic
     */
    isRequired(key: string, dic: string[]): boolean;
    /**
     * スキーマからページタイトルを取得
     * @param jsonSchema
     */
    getPageTitle(jsonSchema: any): string;
    /**
     * 選択肢取得処理 マスターデータがない場合は、スキーマから取得
     * @param master マスタデータ
     * @param properties
     * @param key 取得するマスタのキー
     */
    getMaster(master: any, properties: any, key: any): any;
    /**
     * 入力値の取得
     * @param form FormGroup
     * @param master マスタ
     * @param option widgetオプション
     * @param filterValue サブマスタ使用時のfilter値　未使用時は''を指定すること
     */
    getValue(form: FormGroup, master: any, option: any, filterValue?: string): any;
    /**
     * ヒント取得処理 マスターデータのヒント情報を取得
     * @param master マスターデータ
     * @param kind マスタ種別
     * @param value 選択値
     * @param filterValue サブマスタ時のフィルタ値
     *
     * 履歴
     *  選択項目のgroup機能対応
     *  動的バリデーション機能追加
     */
    getHint(master: any, kind: any, value: any, filterValue?: string): any;
    /**
     * 条件付き表示制御
     * @param form
     * @param option
     */
    viewCondition(form: any, option: any): boolean;
    viewConditionAnd(condisionAnd: string, form: any, option: any): boolean;
    checkError(parentGroup: FormGroup, option: any, dimension: any, formErrors: any, pageID: string, key: any, dirty?: boolean): void;
    isCustomWidget(key: string): boolean;
}
