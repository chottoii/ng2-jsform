/**
 * 履歴
 *  2017/12/15 visibilityの採用によるデザイン補正
 */
import { OnInit, OnDestroy } from '@angular/core';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
export declare class Material2ArrayComponent extends JsfBaseComponent implements OnInit, OnDestroy {
    jsf: JsfService;
    selectList: any;
    pGroup: any;
    constructor(jsf: JsfService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
