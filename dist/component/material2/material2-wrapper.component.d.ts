import { OnInit, OnDestroy } from '@angular/core';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
export declare class Material2WrapperComponent extends JsfBaseComponent implements OnInit, OnDestroy {
    jsf: JsfService;
    sectionkind: string;
    wrapperOpened: boolean;
    idDimension: string;
    constructor(jsf: JsfService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * ボタン制御による表示制御
     * @param flag
     */
    opened(flag: boolean): void;
}
