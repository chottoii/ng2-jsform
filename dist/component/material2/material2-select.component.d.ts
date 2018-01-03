/**
 * history
 *  2017/10/30 group機能追加
 *  2017/10/30 composite機能追加
 *  2017/12/21 リスト変更時にマスタのdefaultプロパティがtureの場合に、規定値を設定
 *  2017/12/21 リストフィルタリングで現在の設定値が、リスト内に無い場合、第１要素の選択
 *  2017/12/21 動的バリデーション機能
 */
import { OnInit, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
export declare class Material2SelectComponent extends JsfBaseComponent implements OnInit, OnChanges, OnDestroy {
    jsf: JsfService;
    /** 選択リスト */
    selectList: any;
    /** 関連選択リスト */
    selectSubList: any;
    filterdList: any;
    /** 共有データ */
    listArray: any[];
    filterValue: string;
    idDimension: string;
    constructor(jsf: JsfService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [propKey: string]: SimpleChange;
    }): void;
    setSelectList(): void;
    modelChange(event: any): void;
}
