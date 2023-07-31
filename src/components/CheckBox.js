import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { Error } from "./Error";
import Column from "./Column";

export const CheckBox = ({ name, label,...others}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, } }) => {
        return (
          <Column>
            <label>{label}</label>
            <input {...field} {...others} type="checkbox"/>
            <div>
             { error && error.message && <Error>{error.message}</Error>}
            </div>
          </Column>
        );
      }}
    />
  );
};
