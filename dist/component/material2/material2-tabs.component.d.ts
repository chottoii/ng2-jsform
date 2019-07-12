import { OnInit, OnDestroy } from '@angular/core';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
export declare class Material2TabsComponent extends JsfBaseComponent implements OnInit, OnDestroy {
    jsf: JsfService;
    selectList: any;
    pGroup: any;
    flag: boolean;
    wrapStyle: {};
    itemStyle: {};
    constructor(jsf: JsfService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * child widgetのイベントをparentに転送する
     * @param event
     */
    buttonClicked(event: any): void;
}
