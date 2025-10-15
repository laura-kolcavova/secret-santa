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

  const handleAddButtonClick = () => {
    addHobby();
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      addHobby();
      setInputValue('');
    }
  };

  return (
    <>
      <div class="flex flex-row gap-2">
        <input
          id={props.id}
          type="text"
          autocomplete="off"
          maxLength="256"
          class='"block w-full py-2 px-3 border rounded shadow focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100'
          placeholder={formatMessage(messages.enterHobbyAndPressEnter)}
          value={getInputValue()}
          onInput={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          type="button"
          class="px-3 py-2 rounded-md text-base font-normal cursor-pointer bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
          onClick={handleAddButtonClick}
          disabled={!getHobbyFromInput()}>
          <PlusIcon class="size-5" />
        </button>
      </div>
    </>
  );
};
