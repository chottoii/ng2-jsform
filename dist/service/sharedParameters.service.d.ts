import { Observable } from 'rxjs/Observable';
export declare class SharedParametersService {
    private sharedPara;
    sharedPara$: Observable<string[]>;
    sendPara(jsonData: any): void;
}
