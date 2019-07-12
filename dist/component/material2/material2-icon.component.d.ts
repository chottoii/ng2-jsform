import { OnInit, OnDestroy } from '@angular/core';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
export declare class Material2IconComponent extends JsfBaseComponent implements OnInit, OnDestroy {
    jsf: JsfService;
    idDimension: string;
    constructor(jsf: JsfService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onClick(form: any, kind: string): void;
}
