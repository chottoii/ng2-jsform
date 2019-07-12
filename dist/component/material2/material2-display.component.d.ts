import { OnInit, OnDestroy } from '@angular/core';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
export declare class Material2DisplayComponent extends JsfBaseComponent implements OnInit, OnDestroy {
    jsf: JsfService;
    parameterValue: string;
    idDimension: string;
    constructor(jsf: JsfService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * 値の取得
     * TODO この方式は何度もコールされるため非効率である。
     */
    getValue(): void;
}
