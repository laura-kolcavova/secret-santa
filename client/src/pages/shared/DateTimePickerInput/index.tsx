import { Component, JSX } from 'solid-js';

export type DateTimePickerInputProps = {
  id?: string;
  name?: string;
  label?: string | JSX.Element;
  value: Date;
  onChange: (newValue: Date) => void;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
};

export const DateTimePickerInput: Component<DateTimePickerInputProps> = (props) => {
  const handleInput = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
    const date = new Date(e.currentTarget.value);

    props.onChange(date);
  };

  // Convert UTC ISO string to local datetime format for datetime-local input
  const getLocalDatetimeValue = (): string => {
    const date = props.value;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
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
        value={getLocalDatetimeValue()}
        onInput={handleInput}
        required={props.required}
        disabled={props.disabled}
        min={props.min}
        max={props.max}
        class="block w-full py-2 px-3 border rounded shadow focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};
