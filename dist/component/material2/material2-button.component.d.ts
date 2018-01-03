/**
 * history
 *  2017/10/30 iconボタンサポート
 */
import { OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsfBaseComponent } from '../jsf-base.component';
import { JsfService } from '../../service/jsf.service';
import { MatDialog, MatDialogRef } from '@angular/material';
export declare class Material2ButtonComponent extends JsfBaseComponent implements OnInit, OnDestroy {
    jsf: JsfService;
    dialog: MatDialog;
    auxiliaryForm: FormGroup;
    toggleFlag: string;
    idDimension: string;
    constructor(jsf: JsfService, dialog: MatDialog);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onToggle(): void;
    onClick(kind: any, target: string): void;
    /**
     * 補助入力用dialog処理
     */
    openDialog(): void;
}
export declare class AuxiliaryInputDialogComponent {
    dialogRef: MatDialogRef<AuxiliaryInputDialogComponent>;
    data: any;
    constructor(dialogRef: MatDialogRef<AuxiliaryInputDialogComponent>, data: any);
    onNoClick(): void;
    buttonClicked(event: any): void;
}
