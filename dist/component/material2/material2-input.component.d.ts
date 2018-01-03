/**
 * history
 *  2017/12/21 動的バリデーション機能
 */
import { OnInit, OnDestroy } from '@angular/core';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
export declare class Material2InputComponent extends JsfBaseComponent implements OnInit, OnDestroy {
    jsf: JsfService;
    hintPosition: string;
    hint: string;
    idDimension: string;
    constructor(jsf: JsfService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
