import { GroupLayoutProps } from "../components/Form/FieldGroup/FieldGroup";
import { FieldLayoutProps } from "../components/Form/FieldLayout/FieldLayout";
import { FormLayoutProps } from "../components/Form/FormLayout/FormLayout";

export type ObjectComponent = IFieldGroup & GroupLayoutProps;
export type FieldComponent = IField & FieldLayoutProps;
export type FormComponent = ObjectComponent | FieldComponent;

export interface FormModel extends FormLayoutProps {
    components?: FormComponent[];
}
export interface IFieldGroup {
    type: "fieldGroup";
    components?: FormComponent[];
    oneOf?: IOneOf;
}
export interface IField {
    type: "field"
}
export interface IOneOf {

}


