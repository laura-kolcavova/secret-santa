import { ParentComponent } from 'solid-js';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';
import { Toaster } from 'solid-toast';
import { ModalProvider } from '~/modals/ModalProvider';

export const Layout: ParentComponent = (props) => {
  return (
    <>
      <Toaster position="bottom-right" gutter={24} />

      <ModalProvider>
        <Header />
        <Main>{props.children}</Main>
        <Footer />
      </ModalProvider>
    </>
  );
};
