import { OnInit, OnDestroy } from '@angular/core';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
export declare class Material2CheckboxComponent extends JsfBaseComponent implements OnInit, OnDestroy {
    jsf: JsfService;
    dispConditionTarget: string;
    dispConditionValue: any;
    selectList: any;
    currentValue: boolean;
    busy: boolean;
    badges: string;
    idDimension: string;
    constructor(jsf: JsfService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * 条件付き表示制御
     */
    viewCondition(): boolean;
    checkboxChange(): void;
}
