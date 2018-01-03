import { OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
export declare class Material2SectionComponent extends JsfBaseComponent implements OnInit, OnDestroy {
    jsf: JsfService;
    sectionkind: string;
    pGroup: FormGroup;
    sectionOpened: boolean;
    idDimension: string;
    constructor(jsf: JsfService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * ボタン制御による表示制御
     * @param flag
     */
    opened(flag: boolean): void;
    /**
     * child widgetのイベントをparentに転送する
     * @param event
     */
    buttonClicked(event: any): void;
}
