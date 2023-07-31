import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { Error } from "./Error";
import Column from "./Column";
import { Form } from "react-bootstrap";

export const TextInput = ({ name, label,...others}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, } }) => {
        return (
          <Column>
            <label>{label}</label>
            <Form.Control {...field} {...others}/>
            <div>
             { error && error.message && <Error>{error.message}</Error>}
            </div>
          </Column>
        );
      }}
    />
  );
};
