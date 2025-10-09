import { Accessor, Component, For, Show, batch, createSignal } from 'solid-js';
import { useDepartmentsQuery } from './hooks/useDepartmentsQuery';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from '../../NewProfile/messages';

export type DepartmentSelectProps = {
  setDepartment: (newDepartment: string) => void;
  getDepartment: Accessor<string>;
  id?: string;
  name?: string;
};

export const DepartmentSelect: Component<DepartmentSelectProps> = (props) => {
  const [data] = useDepartmentsQuery();
  const [isOpen, setIsOpen] = createSignal(false);

  const selectDepartment = (department: string) => {
    batch(() => {
      setIsOpen(false);
      props.setDepartment(department);
    });
  };

  const isDeparmentSelected = () => !!props.getDepartment();

  return (
    <Show when={!data.loading}>
      <div class="relative">
        <select
          id={props.id}
          name={props.name}
          required
          class="sr-only"
          value={props.getDepartment()}>
          <option value=""></option>

          <For each={data()}>
            {(department) => <option value={department}>{department}</option>}
          </For>
        </select>

        <div
          class="block w-full py-2 px-3 border rounded shadow leading-tight focus:outline-none focus:shadow-outline bg-gray-100 border-gray-900 cursor-pointer"
          classList={{
            'text-gray-500': !isDeparmentSelected(),
            'text-gray-900': isDeparmentSelected(),
          }}
          onClick={() => setIsOpen(!isOpen())}>
          {props.getDepartment() || <FormattedMessage message={messages.selectDepartment} />}
        </div>

        <Show when={isOpen()}>
          <div class="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-auto">
            <For each={data()}>
              {(department) => (
                <div
                  class="py-2 px-3 hover:bg-gray-100 cursor-pointer text-gray-900"
                  onClick={() => selectDepartment(department)}>
                  {department}
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>
    </Show>
  );
};
