import { Component, JSX } from 'solid-js';

export type DateTimePickerInputProps = {
  id?: string;
  name?: string;
  label?: string | JSX.Element;
  value: Date;
  onChange: (newValue: Date) => void;
  required?: boolean;
  disabled?: boolean;
  min?: Date;
  max?: Date;
};

const getLocalDatetimeValue = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // date.toISOString(); will be in UTC
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const DateTimePickerInput: Component<DateTimePickerInputProps> = (props) => {
  const handleInput = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
    const date = new Date(e.currentTarget.value);

    props.onChange(date);
  };

  return (
    <div class="mb-6">
      {props.label && (
        <label class="block mb-2 text-sm font-bold text-pallete-4" for={props.id}>
          {props.label}
        </label>
      )}

      <input
        id={props.id}
        name={props.name}
        type="datetime-local"
        value={getLocalDatetimeValue(props.value)}
        onInput={handleInput}
        required={props.required}
        disabled={props.disabled}
        min={props.min ? getLocalDatetimeValue(props.min) : undefined}
        max={props.max ? getLocalDatetimeValue(props.max) : undefined}
        class="block w-full py-2 px-3 border rounded shadow focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};
