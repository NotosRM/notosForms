import { ComponentSwitcherProps } from "../components/FormModel/ComponentSwitcher/ComponentSwitcher";
import { GroupLayoutProps } from "../components/Form/FieldGroup/FieldGroup";
import { FieldLayoutProps } from "../components/Form/FieldLayout/FieldLayout";
import { FormLayoutProps } from "../components/Form/FormLayout/FormLayout";

export type ObjectComponent = IFieldGroup & GroupLayoutProps;
export type FieldComponent = IField & FieldLayoutProps;
export type FormComponent = ObjectComponent | FieldComponent | CompositionComponent;
export type CompositionComponent = oneOfComponent | anyOfComponent;

export enum FormComponentType {
    "field",
    "fieldGroup",
    "oneOfComponent",
    "anyOfComponent"
}
export interface FormModel extends FormLayoutProps {
    components?: FormComponent[];
}
export interface IFieldGroup {
    type: FormComponentType.fieldGroup;
    components?: FormComponent[];
}
export interface IField {
    type: FormComponentType.field;
}
export interface oneOfComponent extends ComponentSwitcherProps {
    type: FormComponentType.oneOfComponent;
    key?: string;
}
export interface anyOfComponent extends ComponentSwitcherProps {
    type: FormComponentType.anyOfComponent;
    key?: string;
}





