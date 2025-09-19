import { Component } from 'solid-js';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

export const Layout: Component = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};
