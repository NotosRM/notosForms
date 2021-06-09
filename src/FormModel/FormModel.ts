
export interface ICompositions {
    oneOf?: IOneOf;
    anyOf?: IOneOf;
    allOf?: any;
}
export interface IOneOf {
    selector: {
        elements: string[];
        code: string;
    };
    components: any[];
}