import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { Error } from "./Error";
import Column from "./Column";

export const SelectBox = ({ name, label, options }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Column>
            <label>{label}</label>
            <Select
              {...field}
              options={options}
              value={field.value}
              onChange={(val) => field.onChange(val)}
              inputRef={field.ref}
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
