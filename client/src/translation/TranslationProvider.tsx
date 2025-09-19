import {
  createContext,
  createResource,
  createSignal,
  Show,
  useContext,
  type ParentComponent,
} from 'solid-js';

import * as i18n from '@solid-primitives/i18n';

export type Locale = 'en-gb' | 'cs-cz';

type RawDictionary = {
  [key: string]: string;
};

const fetchDictionary = async (locale: Locale): Promise<RawDictionary> => {
  const dictionary: RawDictionary = (await import(`~/i18n/${locale}.json`)).default;

  return dictionary;
};

export type TranslationContextValue = {
  translate: (messageId: string) => string | undefined;
};

const TranslationContext = createContext<TranslationContextValue | null>(null);

export const TranslationProvider: ParentComponent = (props) => {
  const [getLocale] = createSignal<Locale>('cs-cz');

  const [data] = createResource(getLocale, fetchDictionary);

  const translate = (messageId: string): string | undefined => {
    return i18n.translator(data)(messageId);
  };

  return (
    <TranslationContext.Provider value={{ translate }}>
      <Show when={!data.loading}>{props.children}</Show>
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const contextValue = useContext(TranslationContext);

  if (contextValue === null) {
    throw new Error('TranslationProvider missing');
  }

  return contextValue;
};
