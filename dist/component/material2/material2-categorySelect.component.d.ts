import { OnInit, OnDestroy } from '@angular/core';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
export declare class Material2CategorySelectComponent extends JsfBaseComponent implements OnInit, OnDestroy {
    jsf: JsfService;
    /** 選択リスト */
    selectList: any;
    constructor(jsf: JsfService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    selectValue(value: string): void;
}
