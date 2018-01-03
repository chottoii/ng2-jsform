/**
 * 変更履歴
 *  2017/11/10 singletonへの変更
 *  2017/11/10 array要素が複数ある場合の初期化障害対応
 *  2017/12/21 動的バリデーション機能
 *  2017/12/30 スキーマ階層構造サポート
 */
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { I18nService } from './i18n.service';
import { CustomValidators } from '../utility/validator';
import { CompositeValidators } from '../utility/compositeValidator';
import { isEmpty } from '../utility';
var JsfService = /** @class */ (function () {
    function JsfService(fb, i18n) {
        this.fb = fb;
        this.i18n = i18n;
        this.debug = false;
        return JsfService.instance = JsfService.instance || this;
    }
    JsfService.prototype.setDebugMode = function (flag) {
        this.debug = flag;
    };
    JsfService.prototype.setForm = function (_form, _schema, _data) {
        this.form = _form;
        this.schema = _schema;
        this.data = _data;
    };
    JsfService.prototype.getForm = function () {
        return this.form;
    };
    /**
     * スキーマ構造化対応のためにベースを変更
     * 2017/12/30 スキーマ階層構造サポート
     */
    /**
       * スキーマ構造化対応のためにベースを変更
       * 2017/12/30 スキーマ階層構造サポート
       */
    JsfService.prototype.getFormGroupKey = /**
       * スキーマ構造化対応のためにベースを変更
       * 2017/12/30 スキーマ階層構造サポート
       */
    function (parent, key, data) {
        var formGroupInfo = {
            parent: parent,
            key: key,
            data: data
        };
        if (key !== undefined && key.split('.').length > 1) {
            var baseKey_1 = '';
            key.split('.').forEach(function (id, index) {
                if (index === 0) {
                    baseKey_1 = id;
                }
                else {
                    formGroupInfo.parent = formGroupInfo.parent.controls[baseKey_1];
                    formGroupInfo.key = id;
                    formGroupInfo.data = formGroupInfo.data[baseKey_1];
                    baseKey_1 = id;
                }
            });
        }
        return formGroupInfo;
    };
    /**
     * JSON Schemaからgroupオブジェクトを生成
     * @param jsonSchema
     * @return FormGroup
     */
    /**
       * JSON Schemaからgroupオブジェクトを生成
       * @param jsonSchema
       * @return FormGroup
       */
    JsfService.prototype.schemaToGroup = /**
       * JSON Schemaからgroupオブジェクトを生成
       * @param jsonSchema
       * @return FormGroup
       */
    function (jsonSchema, data) {
        var _this = this;
        var group = {};
        if (jsonSchema === undefined || jsonSchema === null || jsonSchema.properties === null) {
            throw new Error('abnormal JSON Schema: ' + jsonSchema);
            // throw new TypeError("型がちがうよ");
            // throw new SyntaxError("文法おかしいよ");
            // throw new URIError("URIちがうよ");
            // return group;
        }
        Object.keys(jsonSchema.properties).forEach(function (key) {
            if (jsonSchema.properties[key].type === 'array') {
                group[key] = _this.fb.array([]);
            }
            else if (jsonSchema.properties[key].type === 'object') {
                // group[key] = this.fb.array([]);
                // group[key] = new FormGroup({prop: new FormControl('test', null )});
                group[key] = _this.createFormGroup(jsonSchema.properties[key], data[key]);
            }
            else {
                group[key] = _this.createFormItem('', jsonSchema.required, jsonSchema.properties, key, data);
            }
        });
        return group;
    };
    JsfService.prototype.createFormGroup = function (schema, data) {
        var _this = this;
        var formControls = {};
        Object.keys(schema.properties).forEach(function (key) {
            if (schema.properties[key].type !== 'object') {
                formControls[key] = _this.createFormItem('', schema.required, schema.properties, key, data);
            }
            else {
                formControls[key] = _this.createFormGroup(schema.properties[key], data[key]);
            }
        });
        return new FormGroup(formControls);
    };
    /**
     * groupオブジェクトとJSON SchemaからFormGroupオブジェクトを生成
     * @param jsonSchema
     * @return FormGroup
     */
    /**
       * groupオブジェクトとJSON SchemaからFormGroupオブジェクトを生成
       * @param jsonSchema
       * @return FormGroup
       */
    JsfService.prototype.groupToFormGroup = /**
       * groupオブジェクトとJSON SchemaからFormGroupオブジェクトを生成
       * @param jsonSchema
       * @return FormGroup
       */
    function (group, jsonSchema, data) {
        var _this = this;
        var form = new FormGroup(group);
        // Arrayの初期化対応 2017/11/08
        // Array要素が複数ある時の障害対応 2017/11/10
        Object.keys(jsonSchema.properties).forEach(function (key) {
            if (jsonSchema.properties[key].type === 'array') {
                if (data[key] !== undefined) {
                    for (var i = 0; i < data[key].length; i++) {
                        _this.addItem(jsonSchema, form.controls, key, data, i);
                    }
                }
            }
        });
        return form;
    };
    /**
     * JSON SchemaからFormGroupオブジェクトを生成
     * @param jsonSchema
     * @return FormGroup
     */
    /**
       * JSON SchemaからFormGroupオブジェクトを生成
       * @param jsonSchema
       * @return FormGroup
       */
    JsfService.prototype.schemaToFormGroup = /**
       * JSON SchemaからFormGroupオブジェクトを生成
       * @param jsonSchema
       * @return FormGroup
       */
    function (jsonSchema, data) {
        var _this = this;
        var group = {};
        Object.keys(jsonSchema.properties).forEach(function (key) {
            if (jsonSchema.properties[key].type === 'array' ||
                jsonSchema.properties[key].type === 'object') {
                group[key] = _this.fb.array([]);
            }
            else {
                group[key] = _this.createFormItem('', jsonSchema.required, jsonSchema.properties, key, data);
            }
        });
        var form = new FormGroup(group);
        // Arrayの初期化対応 2017/11/08
        this.addArrayItems(form, jsonSchema, data);
        return form;
    };
    /**
     * form reset
     */
    /**
       * form reset
       */
    JsfService.prototype.resetForm = /**
       * form reset
       */
    function () {
        // remove all array
        this.removeAllArrayObject(this.form, this.schema, this.data);
        // form reset
        this.form.reset();
        // set all defaut value
        this.setAllDefult(this.form, this.schema, this.data);
        // rebuild array
        this.addArrayItems(this.form, this.schema, this.data);
    };
    /**
     * Array要素の削除
     * @param form
     * @param jsonSchema
     * @param data
     */
    /**
       * Array要素の削除
       * @param form
       * @param jsonSchema
       * @param data
       */
    JsfService.prototype.removeAllArrayObject = /**
       * Array要素の削除
       * @param form
       * @param jsonSchema
       * @param data
       */
    function (form, jsonSchema, data) {
        var _this = this;
        Object.keys(jsonSchema.properties).forEach(function (key) {
            if (jsonSchema.properties[key].type === 'array') {
                var controlsName = 'controls';
                var arrayNum = form.controls[key][controlsName].length;
                for (var i = 0; i < arrayNum; i++) {
                    _this.removeItem(form, key, 0); // 削除すると１個減るので常に０を削除
                }
            }
        });
    };
    JsfService.prototype.setAllDefult = function (form, jsonSchema, data) {
        var _this = this;
        Object.keys(jsonSchema.properties).forEach(function (key) {
            if (jsonSchema.properties[key].type !== 'array' &&
                jsonSchema.properties[key].type !== 'object') {
                // 日付データの初期値処理
                var d = _this.getDefault(data[key]);
                form.controls[key].setValue(d);
            }
        });
    };
    /**
     * Array要素の追加
     *  Array要素が複数ある時の障害対応 2017/11/10
     * @param form
     * @param jsonSchema
     * @param data
     */
    /**
       * Array要素の追加
       *  Array要素が複数ある時の障害対応 2017/11/10
       * @param form
       * @param jsonSchema
       * @param data
       */
    JsfService.prototype.addStructuredItems = /**
       * Array要素の追加
       *  Array要素が複数ある時の障害対応 2017/11/10
       * @param form
       * @param jsonSchema
       * @param data
       */
    function (group, jsonSchema, data) {
        var _this = this;
        Object.keys(jsonSchema.properties).forEach(function (key) {
            if (jsonSchema.properties[key].type === 'object') {
                console.log(_this.form);
                var n1 = 'structured';
                var n2 = 'controls';
                _this.form.controls[n1][n2].push(_this.createFormItem(key, jsonSchema.required, jsonSchema, 'prop', data));
            }
        });
    };
    JsfService.prototype.addArrayItems = function (form, jsonSchema, data) {
        var _this = this;
        Object.keys(jsonSchema.properties).forEach(function (key) {
            if (jsonSchema.properties[key].type === 'array') {
                if (data[key] !== undefined) {
                    for (var i = 0; i < data[key].length; i++) {
                        _this.addItem(jsonSchema, form.controls, key, data, i);
                    }
                }
            }
        });
    };
    /**
     * Arrayオブジェクトの追加（初期時の他、動的追加に使用）
     * Arrayの初期化対応 2017/11/08 indexを追加
     * @param jsonSchema
     * @param form
     */
    /**
       * Arrayオブジェクトの追加（初期時の他、動的追加に使用）
       * Arrayの初期化対応 2017/11/08 indexを追加
       * @param jsonSchema
       * @param form
       */
    JsfService.prototype.addArray = /**
       * Arrayオブジェクトの追加（初期時の他、動的追加に使用）
       * Arrayの初期化対応 2017/11/08 indexを追加
       * @param jsonSchema
       * @param form
       */
    function (jsonSchema, form, data, index) {
        var _this = this;
        if (index === void 0) { index = 0; }
        Object.keys(jsonSchema.properties).forEach(function (key) {
            if (jsonSchema.properties[key].type === 'array' ||
                jsonSchema.properties[key].type === 'object') {
                _this.addItem(jsonSchema, form.controls, key, data, index);
            }
        });
    };
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
    JsfService.prototype.addItem = /**
       * Array内のitemを追加
       * Arrayの初期化対応 2017/11/08 indexを追加
       *  履歴
       *    2017/11/24 propertiesがない場合の処理を追加
       *    2017/11/24 ２段Arrayサポート（ただし、既定値は１個だけ）
       * @param jsonSchema
       * @param form
       * @param key
       */
    function (jsonSchema, controls, key, data, index) {
        var _this = this;
        if (index === void 0) { index = 0; }
        var group = {};
        var _schema = jsonSchema.properties !== undefined ? jsonSchema.properties[key].items : jsonSchema[key].items;
        var schema = _schema;
        if (_schema.properties !== undefined && _schema.properties !== null) {
            schema = _schema.properties;
        }
        Object.keys(schema).forEach(function (_key) {
            if (schema[_key].type === 'array') {
                var subgroup_1 = {};
                var subIndex_1 = 0; // TODO 既定値は１個だけ
                Object.keys(schema[_key].items).forEach(function (__key) {
                    if (__key !== 'properties') {
                        subgroup_1[__key] = _this.createFormItem(_key, schema[_key].required, schema[_key].items, __key, data[key][subIndex_1], index);
                    }
                });
                group[_key] = _this.fb.group(subgroup_1);
            }
            else {
                group[_key] = _this.createFormItem(key, _schema.required, schema, _key, data, index);
            }
        });
        // const control = <FormArray>form.controls[key];
        var control = controls[key];
        control.push(new FormGroup(group));
    };
    /**
     * Array内のitemを削除
     * @param form
     * @param key
     * @param i
     */
    /**
       * Array内のitemを削除
       * @param form
       * @param key
       * @param i
       */
    JsfService.prototype.removeItem = /**
       * Array内のitemを削除
       * @param form
       * @param key
       * @param i
       */
    function (form, key, i) {
        var control = form.controls[key];
        control.removeAt(i);
    };
    /**
     * items内の全chackboxに指定flagを設定する
     * TODO sectionのネストには未対応
     * @param form
     * @param items
     * @param flag
     */
    /**
       * items内の全chackboxに指定flagを設定する
       * TODO sectionのネストには未対応
       * @param form
       * @param items
       * @param flag
       */
    JsfService.prototype.allSelect = /**
       * items内の全chackboxに指定flagを設定する
       * TODO sectionのネストには未対応
       * @param form
       * @param items
       * @param flag
       */
    function (form, items, flag) {
        var _this = this;
        Object.keys(items).forEach(function (key) {
            if (items[key].type === 'section') {
                _this.selectFromSection(form, items[key], flag);
            }
            else if (items[key].type === 'checkbox') {
                form.controls[items[key].key].setValue(flag);
            }
        });
    };
    /**
     * section内のchackboxに指定flagを設定する
     * @param form
     * @param section
     * @param flag
     */
    /**
       * section内のchackboxに指定flagを設定する
       * @param form
       * @param section
       * @param flag
       */
    JsfService.prototype.selectFromSection = /**
       * section内のchackboxに指定flagを設定する
       * @param form
       * @param section
       * @param flag
       */
    function (form, section, flag) {
        if (section.items !== undefined) {
            for (var _i = 0, _a = Object.keys(section.items); _i < _a.length; _i++) {
                var item = _a[_i];
                if (section.items[item].type !== undefined &&
                    section.items[item].type === 'checkbox') {
                    form.controls[section.items[item].key].setValue(flag);
                }
            }
        }
    };
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
    JsfService.prototype.createFormItem = /**
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
    function (kind, required, jsonSchema, key, data, index) {
        if (index === void 0) { index = 0; }
        var v = new Array();
        var i = 0;
        // 必須項目チェック
        if (this.isRequired(key, required)) {
            v[i++] = Validators.required;
        }
        // typeチェック
        if (!isEmpty(jsonSchema[key].type)) {
            v[i++] = CustomValidators.type(jsonSchema[key].type);
        }
        // formatチェック
        if (!isEmpty(jsonSchema[key].format)) {
            v[i++] = CustomValidators.format(jsonSchema[key].format);
        }
        // enum
        if (!isEmpty(jsonSchema[key].enum)) {
            v[i++] = CustomValidators.enum(jsonSchema[key].enum);
        }
        // パターンチェック
        if (!isEmpty(jsonSchema[key].pattern)) {
            v[i++] = CustomValidators.pattern(jsonSchema[key].pattern);
        }
        // minLengthチェック
        if (!isEmpty(jsonSchema[key].minLength)) {
            v[i++] = CustomValidators.minLength(jsonSchema[key].minLength);
        }
        // maxLengthチェック
        if (!isEmpty(jsonSchema[key].maxLength)) {
            v[i++] = CustomValidators.maxLength(jsonSchema[key].maxLength);
        }
        // multipleOf
        if (!isEmpty(jsonSchema[key].multipleOf)) {
            v[i++] = CustomValidators.multipleOf(jsonSchema[key].multipleOf);
        }
        // minimumチェック
        if (!isEmpty(jsonSchema[key].minimum)) {
            v[i++] = CustomValidators.minimum(jsonSchema[key].minimum);
        }
        // exclusiveMinimumチェック
        if (!isEmpty(jsonSchema[key].exclusiveMinimum)) {
            v[i++] = CustomValidators.exclusiveMinimum(jsonSchema[key].exclusiveMinimum);
        }
        // maximumチェック
        if (!isEmpty(jsonSchema[key].maximum)) {
            v[i++] = CustomValidators.maximum(jsonSchema[key].maximum);
        }
        // exclusiveMaximumチェック
        if (!isEmpty(jsonSchema[key].exclusiveMaximum)) {
            v[i++] = CustomValidators.exclusiveMaximum(jsonSchema[key].exclusiveMaximum);
        }
        // 以下は複合バリデータ
        if (!isEmpty(jsonSchema[key].oneOf)) {
            v[i++] = CompositeValidators.oneOf(jsonSchema[key].oneOf);
        }
        if (!isEmpty(jsonSchema[key].allOf)) {
            v[i++] = CompositeValidators.allOf(jsonSchema[key].allOf);
        }
        if (!isEmpty(jsonSchema[key].anyOf)) {
            v[i++] = CompositeValidators.anyOf(jsonSchema[key].anyOf);
        }
        if (!isEmpty(jsonSchema[key].not)) {
            v[i++] = CompositeValidators.not(jsonSchema[key].not);
        }
        // TODO 規定値の設定がまだ行われていない。
        // Array data ?
        var d = '';
        if (kind !== '') {
            if (data[kind] !== undefined && data[kind][index] !== undefined) {
                d = this.getDefault(data[kind][index][key]);
            }
            else if (data[kind] !== undefined && data[kind][key] !== undefined) {
                d = this.getDefault(data[kind][key]);
            }
        }
        else {
            if (data !== undefined) {
                d = this.getDefault(data[key]);
            }
        }
        return new FormControl(d, v);
    };
    /**
     * バリデーション処理
     * @param form
     * @param key
     * @param dirty
     */
    /**
       * バリデーション処理
       * @param form
       * @param key
       * @param dirty
       */
    JsfService.prototype.validation = /**
       * バリデーション処理
       * @param form
       * @param key
       * @param dirty
       */
    function (pageID, form, key, dirty) {
        if (dirty === void 0) { dirty = false; }
        var formError = '';
        var control = form.get(key);
        if (control && (control.dirty || dirty) && !control.valid) {
            // control.errorsの存在チェックを行わないとnullエラーが発生する。
            if (control.errors !== undefined && control.errors !== null) {
                for (var _i = 0, _a = Object.keys(control.errors); _i < _a.length; _i++) {
                    var error = _a[_i];
                    var validateType = error.toString().toLowerCase();
                    switch (validateType) {
                        case 'pattern':
                            formError = this.i18n.getValidationMessage(pageID, validateType, key, '\'' + control.errors[validateType].requiredPattern + '\'');
                            break;
                        case 'multipleof':
                            formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].multipleOf);
                            break;
                        case 'max':
                            formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].max);
                            break;
                        case 'exclusivemaximum':
                            formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].exclusiveMaximum);
                            break;
                        case 'min':
                            formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].min);
                            break;
                        case 'exclusiveminimum':
                            formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].exclusiveMinimum);
                            break;
                        case 'minlength':
                            formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].requiredLength);
                            break;
                        case 'maxlength':
                            formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].requiredLength);
                            break;
                        case 'items':
                            // 検証不要
                            break;
                        case 'additionalitems':
                            // 検証不要
                            break;
                        case 'maxitems':
                            // 検証不要：レイアウトで制限する->Array時に必要か？
                            break;
                        case 'minitems':
                            // 検証不要：レイアウトで制限する->Array時に必要か？
                            break;
                        case 'uniqueitems':
                            // 未実装（Objectsのユニーク性の実装は困難？）->Array時に必要か？
                            break;
                        case 'contains':
                            // 未実装
                            break;
                        case 'maxproperties':
                            // 未実装　フォームバリデーションでは不要と思われるため
                            break;
                        case 'minproperties':
                            // 未実装　フォームバリデーションでは不要と思われるため
                            break;
                        case 'required':
                            formError = this.i18n.getValidationMessage(pageID, validateType, key);
                            break;
                        case 'patternproperties':
                            // 未実装　フォームバリデーションでは不要と思われるため
                            break;
                        case 'additionalproperties':
                            // 未実装　フォームバリデーションでは不要と思われるため
                            break;
                        case 'dependencies':
                            // TODO 依存関係の検証をどのタイミングで行うのか検証が必要。
                            break;
                        case 'propertynames':
                            // 未実装　フォームバリデーションでは不要と思われるため
                            break;
                        case 'enum':
                            formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].enumList);
                            break;
                        case 'type':
                            formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].type);
                            break;
                        case 'oneof':
                            // 一つの条件のみ満たすケース
                            formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType]);
                            break;
                        case 'anyof':
                            // 一つの条件のみ満たすケース
                            formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType]);
                            break;
                        case 'not':
                            // 条件を満たさないケース
                            formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType]);
                            break;
                        case 'format':
                            formError = this.i18n.getValidationMessage(pageID, validateType, key, control.errors[validateType].format);
                            break;
                    }
                }
            }
        }
        return formError;
    };
    /**
     * 指定されたデータが日付の場合、日付型を返却
     * undefinedの場合は、nullを返却
     * それ以外は、指定した値自身を返却
     * @param d
     */
    /**
       * 指定されたデータが日付の場合、日付型を返却
       * undefinedの場合は、nullを返却
       * それ以外は、指定した値自身を返却
       * @param d
       */
    JsfService.prototype.getDefault = /**
       * 指定されたデータが日付の場合、日付型を返却
       * undefinedの場合は、nullを返却
       * それ以外は、指定した値自身を返却
       * @param d
       */
    function (d) {
        var ret = d;
        if (d !== undefined) {
            // 日付チェック
            if (this.isValidDate(d)) {
                var ms = Date.parse(d);
                ret = new Date(ms);
            }
            else {
                ret = d;
            }
        }
        else {
            ret = null;
        }
        return ret;
    };
    /**
     * 指定の文字列が日付かどうかをチェックする
     * 例
     *  2017-09-02T15:00:00.000Z
     *  2017/09/02
     * 履歴
     *  2017/11/24 数字が日付とみなされる障害対応
     * @param s
     */
    /**
       * 指定の文字列が日付かどうかをチェックする
       * 例
       *  2017-09-02T15:00:00.000Z
       *  2017/09/02
       * 履歴
       *  2017/11/24 数字が日付とみなされる障害対応
       * @param s
       */
    JsfService.prototype.isValidDate = /**
       * 指定の文字列が日付かどうかをチェックする
       * 例
       *  2017-09-02T15:00:00.000Z
       *  2017/09/02
       * 履歴
       *  2017/11/24 数字が日付とみなされる障害対応
       * @param s
       */
    function (s) {
        var ret = false;
        var ms = Date.parse(s);
        if (s !== null && s !== undefined && s.length < 20) {
            var matches = /^(\d+)\/(\d+)\/(\d+)$/.exec(s);
            if (matches) {
                var y = parseInt(matches[1], 10);
                var m = parseInt(matches[2], 10);
                var d = parseInt(matches[3], 10);
                if (m < 1 || m > 12 || d < 1 || d > 31) {
                    ret = false;
                }
                else {
                    var dt = new Date(y, m - 1, d, 0, 0, 0, 0);
                    if (dt.getFullYear() !== y
                        || dt.getMonth() !== m - 1
                        || dt.getDate() !== d) {
                        ret = false;
                    }
                    else {
                        ret = true;
                    }
                }
            }
        }
        return ret;
    };
    /**
     * JSON Schemaの必須項目配列に指定のパラメタ存在チェックを行う。
     * @param key
     * @param dic
     */
    /**
       * JSON Schemaの必須項目配列に指定のパラメタ存在チェックを行う。
       * @param key
       * @param dic
       */
    JsfService.prototype.isRequired = /**
       * JSON Schemaの必須項目配列に指定のパラメタ存在チェックを行う。
       * @param key
       * @param dic
       */
    function (key, dic) {
        var ret = false;
        if (dic !== undefined && dic !== null && dic.length > 0) {
            for (var i = 0; i < dic.length; i++) {
                if (dic[i] === key) {
                    ret = true;
                }
            }
        }
        return ret;
    };
    /**
     * スキーマからページタイトルを取得
     * @param jsonSchema
     */
    /**
       * スキーマからページタイトルを取得
       * @param jsonSchema
       */
    JsfService.prototype.getPageTitle = /**
       * スキーマからページタイトルを取得
       * @param jsonSchema
       */
    function (jsonSchema) {
        var pageTitle = 'not defined';
        if (jsonSchema !== null && jsonSchema !== undefined) {
            pageTitle = jsonSchema.title;
        }
        return pageTitle;
    };
    /**
     * 選択肢取得処理 マスターデータがない場合は、スキーマから取得
     * @param master マスタデータ
     * @param properties
     * @param key 取得するマスタのキー
     */
    /**
       * 選択肢取得処理 マスターデータがない場合は、スキーマから取得
       * @param master マスタデータ
       * @param properties
       * @param key 取得するマスタのキー
       */
    JsfService.prototype.getMaster = /**
       * 選択肢取得処理 マスターデータがない場合は、スキーマから取得
       * @param master マスタデータ
       * @param properties
       * @param key 取得するマスタのキー
       */
    function (master, properties, key) {
        var selectList;
        if (master !== null && master !== undefined) {
            selectList = master[key];
            if (selectList === null || selectList === undefined) {
                selectList = [];
                var i = 0;
                var enumList = null;
                if (properties[key] === undefined) {
                    throw new Error('master not found.');
                }
                else if (properties[key].type === 'array') {
                    enumList = properties[key].items.enum;
                }
                else if (properties[key].type === 'object') {
                    // console.log(properties[key]);
                }
                else {
                    enumList = properties[key].enum;
                }
                try {
                    for (var _i = 0, _a = Object.keys(enumList); _i < _a.length; _i++) {
                        var p = _a[_i];
                        selectList[i++] = {
                            key: enumList[p],
                            value: enumList[p]
                        };
                    }
                }
                catch (err) {
                    throw new Error('master not found.');
                }
            }
        }
        else {
            throw new Error('master not found.');
        }
        return selectList;
    };
    /**
     * 入力値の取得
     * @param form FormGroup
     * @param master マスタ
     * @param option widgetオプション
     * @param filterValue サブマスタ使用時のfilter値　未使用時は''を指定すること
     */
    /**
       * 入力値の取得
       * @param form FormGroup
       * @param master マスタ
       * @param option widgetオプション
       * @param filterValue サブマスタ使用時のfilter値　未使用時は''を指定すること
       */
    JsfService.prototype.getValue = /**
       * 入力値の取得
       * @param form FormGroup
       * @param master マスタ
       * @param option widgetオプション
       * @param filterValue サブマスタ使用時のfilter値　未使用時は''を指定すること
       */
    function (form, master, option, filterValue) {
        if (filterValue === void 0) { filterValue = ''; }
        var ret = form.controls[option.key].value;
        if (master !== null && master !== undefined) {
            if (option.master !== null && option.master !== undefined) {
                var selectList_1 = master[option.master];
                if (selectList_1 === null || selectList_1 === undefined) {
                    console.error('Exx: マスターデータが未登録です。');
                }
                else {
                    if (filterValue !== '') {
                        selectList_1 = selectList_1[filterValue];
                    }
                    Object.keys(selectList_1).forEach(function (i) {
                        if (selectList_1[i].value === ret) {
                            ret = selectList_1[i].key;
                        }
                    });
                }
            }
        }
        else {
            console.error('Exx: マスターが未登録です。');
        }
        return ret;
    };
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
    JsfService.prototype.getHint = /**
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
    function (master, kind, value, filterValue) {
        if (filterValue === void 0) { filterValue = ''; }
        var ret = {
            name: '',
            hint: '',
            pattern: ''
        };
        if (master !== null && master !== undefined) {
            var selectList_2 = master[kind];
            if (selectList_2 === null || selectList_2 === undefined) {
                console.error('Exx: マスターデータが未登録です。');
            }
            else {
                if (filterValue !== '') {
                    selectList_2 = selectList_2[filterValue];
                }
                if (selectList_2.group !== undefined) {
                    Object.keys(selectList_2.group).forEach(function (i) {
                        Object.keys(selectList_2.group[i].items).forEach(function (j) {
                            if (selectList_2.group[i].items[j].value === value) {
                                ret.name = selectList_2.group[i].items[j].key;
                                ret.hint = selectList_2.group[i].items[j].example;
                                ret.pattern = selectList_2.group[i].items[j].pattern;
                            }
                        });
                    });
                }
                else {
                    Object.keys(selectList_2).forEach(function (i) {
                        if (selectList_2[i].value === value) {
                            ret.name = selectList_2[i].key;
                            ret.hint = selectList_2[i].example;
                            ret.pattern = selectList_2[i].pattern;
                        }
                    });
                }
            }
        }
        return ret;
    };
    /**
     * 条件付き表示制御
     * @param form
     * @param option
     */
    /**
       * 条件付き表示制御
       * @param form
       * @param option
       */
    JsfService.prototype.viewCondition = /**
       * 条件付き表示制御
       * @param form
       * @param option
       */
    function (form, option) {
        var ret = true;
        if (option.dispCondition !== undefined) {
            var conditionOr = option.dispCondition.split('|');
            if (conditionOr.length <= 1) {
                var condition = option.dispCondition.split(',');
                for (var i = 0; i < condition.length; i++) {
                    var cond = condition[i].split('=');
                    if (cond[1] === 'true') {
                        if (form.controls[cond[0]].value === false) {
                            ret = false;
                            break;
                        }
                    }
                    else if (cond[1] === 'false') {
                        if (form.controls[cond[0]].value === true) {
                            ret = false;
                            break;
                        }
                    }
                    else if (form.controls[cond[0]].value !== cond[1]) {
                        ret = false;
                        break;
                    }
                }
            }
            else {
                ret = false;
                for (var i = 0; i < conditionOr.length; i++) {
                    ret = this.viewConditionAnd(conditionOr[i], form, option);
                    if (ret) {
                        return ret;
                    }
                }
            }
        }
        return ret;
    };
    JsfService.prototype.viewConditionAnd = function (condisionAnd, form, option) {
        var ret = true;
        if (condisionAnd !== undefined) {
            var condition = condisionAnd.split(',');
            for (var i = 0; i < condition.length; i++) {
                var cond = condition[i].split('=');
                if (cond[1] === 'true') {
                    if (form.controls[cond[0]].value === false) {
                        ret = false;
                        break;
                    }
                }
                else if (cond[1] === 'false') {
                    if (form.controls[cond[0]].value === true) {
                        ret = false;
                        break;
                    }
                }
                else if (form.controls[cond[0]].value !== cond[1]) {
                    ret = false;
                    break;
                }
            }
        }
        return ret;
    };
    JsfService.prototype.checkError = function (parentGroup, option, dimension, formErrors, pageID, key, dirty) {
        if (dirty === void 0) { dirty = false; }
        var p = parentGroup;
        if (this.isCustomWidget(option.type)) {
            // カスタマイズwidgetの場合
            var cName = 'controls';
            // array要素の場合、formオブジェクトの参照先を変更
            if (parentGroup.controls[option.key] !== null && parentGroup.controls[option.key][cName] !== undefined) {
                p = parentGroup.controls[option.key][cName][dimension];
            }
            // keyがnullの場合は変更箇所を特定できないので、全部を確認する
            if (key === null) {
                // 以下の処理は実行されていないが、なぜか正常に動作している。？？？
                for (var _i = 0, _a = Object.keys(p[cName]); _i < _a.length; _i++) {
                    var _key = _a[_i];
                    formErrors[_key] = this.validation(pageID, p, _key, dirty);
                }
            }
            else {
                formErrors[key] = this.validation(pageID, p, key, dirty);
            }
        }
        else {
            formErrors[option.key] = this.validation(pageID, parentGroup, option.key, dirty);
        }
    };
    JsfService.prototype.isCustomWidget = function (key) {
        var ret = true;
        if (key.match(/tabs|section|array|input|radio|checkbox|select|categorySelect|toggle|icon|date|file|display|label|test/)) {
            ret = false;
        }
        return ret;
    };
    JsfService.instance = null;
    JsfService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    JsfService.ctorParameters = function () { return [
        { type: FormBuilder, },
        { type: I18nService, },
    ]; };
    return JsfService;
}());
export { JsfService };
