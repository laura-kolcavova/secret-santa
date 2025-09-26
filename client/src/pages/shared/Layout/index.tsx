import { ParentComponent } from 'solid-js';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

export const Layout: ParentComponent = (props) => {
  return (
    <>
      <Header />
      <Main>{props.children}</Main>
      <Footer />
    </>
  );
};
