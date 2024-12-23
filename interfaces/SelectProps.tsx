import { OptionsProps } from "./OptionsProps";

export interface SelectProps{
    name: string;
    control: any;
    placeholder: string;
    error?: string;
    options: OptionsProps[]
}