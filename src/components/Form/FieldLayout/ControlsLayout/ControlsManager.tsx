import Input, { InputProps } from "./Input";
import Radio, { RadioProps } from "./Radio";
import Checkbox, { CheckboxProps } from "./Checkbox";
import Select, { SelectProps } from "./Select";
import Textarea, { TextareaProps } from "./Textarea";

export type ControlProps = InputProps | TextareaProps | SelectProps | CheckboxProps | RadioProps;

interface IControlProps {
	control?: string;
	options?: any;
	[otherProp: string]: any;
}
const Controls: { [control: string]: any } = {
	input: Input,
	textarea: Textarea,
	select: Select,
	checkbox: Checkbox,
	radio: Radio
};
export default Controls;
