import { Component, createSignal } from 'solid-js';
import { PlusIcon } from './icons/PlusIcon';
import { useLocalization } from '~/translation/useLocalization';
import { messages } from '../NewProfile/messages';

export type HobbiesInputProps = {
  hobbies: string[];
  addHobby: (addedHobby: string) => void;
  id?: string;
};

export const HobbiesInput: Component<HobbiesInputProps> = (props) => {
  const { formatMessage } = useLocalization();

  const [getInputValue, setInputValue] = createSignal<string>('');

  const getHobbyFromInput = () => {
    return getInputValue().trim();
  };

  const addHobby = () => {
    const hobby = getHobbyFromInput();

    if (hobby && !props.hobbies.includes(hobby)) {
      props.addHobby(hobby);
    }
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    addHobby();

    setInputValue('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="flex flex-row gap-2">
          <input
            id={props.id}
            type="text"
            autocomplete="off"
            class='"block w-full py-2 px-3 border rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100'
            placeholder={formatMessage(messages.enterHobbyAndPressEnter)}
            value={getInputValue()}
            onInput={(e) => setInputValue(e.currentTarget.value)}
          />

          <button
            class="px-3 py-2 rounded-md text-base font-normal cursor-pointer bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
            onClick={addHobby}
            disabled={!getHobbyFromInput()}>
            <PlusIcon class="size-5" />
          </button>
        </div>
      </form>
    </>
  );
};
