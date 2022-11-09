import {
  ControllerFieldState,
  UseControllerProps,
  useController,
  useForm,
} from "react-hook-form";
import { useState } from "react";
import { useRifm } from "rifm";

const numberFormat = (str: string = "") => {
  const r = parseInt(str.replace(/[^\d]+/gi, ""), 10);
  return r ? r.toLocaleString("en") : "";
};

const useFormatController = function useFormatController<T>({
  accept,
  append,
  format,
  mask,
  onBlur,
  onChange,
  replace,
  ...props
}: UseControllerProps & {
  accept?: RegExp;
  append?: (value: string) => string;
  format: (value: string) => string;
  mask?: boolean;
  onBlur?: React.FocusEventHandler<T>;
  onChange?: React.ChangeEventHandler<T>;
  replace?: (value: string) => string;
}): [
  {
    ref: React.Ref<T>;
    name: string;
    onBlur?: React.FocusEventHandler<T>;
    onChange: React.ChangeEventHandler<T>;
    value: string;
  },
  ControllerFieldState
] {
  const { field, fieldState } = useController({
    name: props.name,
    control: props.control,
    defaultValue: props.defaultValue,
    rules: props.rules,
  });

  const rifm = useRifm<T>({
    accept,
    append,
    format,
    mask,
    onChange: field.onChange,
    replace,
    value: field.value,
  });

  return [
    {
      name: field.name,
      onBlur: (event) => {
        field.onBlur();
        onBlur?.(event);
      },
      onChange: (change) => {
        rifm.onChange(change);

        // Allow Rifm change to propagate
        setImmediate(() => {
          onChange?.(change);
        });
      },
      ref: field.ref,
      value: rifm.value,
    },
    fieldState,
  ];
};

export default function App() {
  const [view, setView] = useState({});

  const { control, handleSubmit, register } = useForm({
    mode: "onChange",
  });

  const [name2] = useFormatController<HTMLInputElement>({
    control,
    defaultValue: "1234",
    format: numberFormat,
    name: "name2",
    onBlur: () => {
      console.log("blur hit");
    },
    onChange: (change) => {
      console.log("change hit", change.target.value);
    },
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => setView(data))}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <label htmlFor="name1">Name_1</label>
        <input {...register("name1")} type="text" />

        <label htmlFor="name2">Name_2</label>
        <input {...name2} type="text" />

        <button type="submit">Submit</button>
      </form>
      <pre>{JSON.stringify({ view }, null, 2)}</pre>
    </div>
  );
}
