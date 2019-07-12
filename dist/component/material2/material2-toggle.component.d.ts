import { OnInit, OnDestroy } from '@angular/core';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
export declare class Material2ToggleComponent extends JsfBaseComponent implements OnInit, OnDestroy {
    jsf: JsfService;
    selectList: any;
    idDimension: string;
    constructor(jsf: JsfService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
