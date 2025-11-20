import {
  batch,
  createContext,
  createRoot,
  createSignal,
  For,
  JSX,
  ParentComponent,
  Show,
  useContext,
} from 'solid-js';
import { createStore, produce } from 'solid-js/store';

type ModalFactory = (index: number) => JSX.Element;

type ModalDisposer = () => void;

type ModalHandler = {
  create: ModalFactory;
  dispose: ModalDisposer;
};

export type ModalContextValue = {
  openModal: (modalFactory: ModalFactory) => void;
  hideModal: () => void;
  isCurrentModal: (index: number) => boolean;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider: ParentComponent = (props) => {
  const [getModalCount, setModalCount] = createSignal<number>(0);

  const [modalHandlers, setModalHandlers] = createStore<ModalHandler[]>([]);

  const addModalHandler = (modalHandler: ModalHandler): void => {
    batch(() => {
      setModalCount((prev) => prev + 1);
      setModalHandlers(produce((modalHandlers) => modalHandlers.push(modalHandler)));
    });
  };

  const popModalHandler = (): void => {
    if (modalHandlers.length === 0) {
      return;
    }

    batch(() => {
      setModalCount((prev) => prev - 1);
      setModalHandlers(produce((modalHandlers) => modalHandlers.pop()));
    });
  };

  const getCurrentModalIndex = (): number => {
    return modalHandlers.length - 1;
  };

  const getCurrentModalHandler = (): ModalHandler | undefined => {
    const index = getCurrentModalIndex();

    if (index === -1) {
      return undefined;
    }

    return modalHandlers[index];
  };

  const isCurrentModal = (index: number): boolean => {
    return index === getCurrentModalIndex();
  };

  const openModal = (modalFactory: ModalFactory): void => {
    const modalDisposer = createRoot((dispose) => {
      return dispose;
    });

    const modalHandler: ModalHandler = {
      create: modalFactory,
      dispose: modalDisposer,
    };

    addModalHandler(modalHandler);
  };

  const hideModal = (): void => {
    if (modalHandlers.length === 0) {
      return;
    }

    const currentHandler = getCurrentModalHandler()!;

    batch(() => {
      currentHandler.dispose();
      popModalHandler();
    });
  };

  return (
    <ModalContext.Provider value={{ openModal, hideModal, isCurrentModal }}>
      {props.children}

      <Show when={getModalCount() > 0}>
        <For each={modalHandlers}>{(modalHandler, index) => modalHandler.create(index())}</For>
      </Show>
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const contextValue = useContext(ModalContext);

  if (contextValue === null) {
    throw new Error('ModalProvider missing');
  }

  return contextValue;
};
