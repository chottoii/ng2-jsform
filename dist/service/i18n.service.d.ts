export declare class I18nService {
    private cachedMessages;
    constructor();
    setDictionary(message: any): void;
    getMessage(page: string, key: string, isNullable: boolean): string;
    getValidationMessage(pageID: string, key: string, protertyName: string, option?: string, isNullable?: boolean): string;
    /**
     * {0} と　{1}を置き換える
     * @param template
     * @param replacement
     */
    templateReplace(template: any, replacement: any): any;
}
