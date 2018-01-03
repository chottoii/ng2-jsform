import { OnInit, OnDestroy } from '@angular/core';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
export declare class Material2TestComponent extends JsfBaseComponent implements OnInit, OnDestroy {
    jsf: JsfService;
    selectList: any;
    pGroup: any;
    flag: boolean;
    wrapStyle: {};
    itemStyle: {};
    constructor(jsf: JsfService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
