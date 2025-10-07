import {
  batch,
  createContext,
  createRoot,
  createSignal,
  JSX,
  ParentComponent,
  Show,
  useContext,
} from 'solid-js';

export type ModalFactory = () => JSX.Element;

export type ModalContextValue = {
  openModal: (modalFactory: ModalFactory) => void;
  hideModal: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider: ParentComponent = (props) => {
  const [getIsModalOpen, setIsModalOpen] = createSignal<boolean>(false);
  const [getModal, setModal] = createSignal<ModalFactory | null>(null);

  let disposeModal: (() => void) | null = null;

  const openModal = (modal: ModalFactory): void => {
    if (disposeModal) {
      disposeModal();
    }

    disposeModal = createRoot((dispose) => {
      batch(() => {
        setModal(() => modal);
        setIsModalOpen(true);
      });

      return dispose;
    });
  };

  const hideModal = (): void => {
    if (disposeModal) {
      disposeModal();
      disposeModal = null;
    }

    batch(() => {
      setModal(null);
      setIsModalOpen(false);
    });
  };

  return (
    <ModalContext.Provider value={{ openModal, hideModal }}>
      {props.children}

      <Show when={getIsModalOpen()}>{getModal()?.()}</Show>
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
