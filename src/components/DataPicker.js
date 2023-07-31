import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { Error } from "./Error";
import Column from "./Column";


export const FormDatePicker = ({ name, label, options }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Column>
            <label>{label}</label>
            <DatePicker
            className="form-control"
            dateFormat="dd-MM-yyyy"
            
              selected={field.value}
              onChange={(d) => field.onChange(d)}
            />
            <div>
              {error && error.message && <Error>{error.message}</Error>}
            </div>
          </Column>
        );
      }}
    />
  );
};
