import Input, { InputProps } from "./Input";
import Radio, { RadioProps } from "./Radio";
import Checkbox, { CheckboxProps } from "./Checkbox";
import Select, { SelectProps } from "./Select";
import Textarea, { TextareaProps } from "./Textarea";
import { FieldLayoutProps, IFieldProps } from "../FieldLayout";
import { FieldInputProps } from "react-final-form";
export type ControlsProps = InputProps | TextareaProps | SelectProps | CheckboxProps | RadioProps;

const Controls: { [control: string]: any } = {
	input: Input,
	textarea: Textarea,
	select: Select,
	checkbox: Checkbox,
	radio: Radio
};
interface IControlProps<FieldValue = any, T extends HTMLElement = HTMLElement> {
	className: string;
	input: FieldInputProps<FieldValue, T>;
}
export type IControl<T extends ControlsProps = ControlsProps> = React.FC<FieldLayoutProps & IControlProps & T>;
export default Controls;
