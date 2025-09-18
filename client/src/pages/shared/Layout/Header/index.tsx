import { Component } from 'solid-js';

export const Header: Component = () => {
  return (
    <header class="border-b border-solid border-gray-300 bg-gray-50">
      <div class="container mx-auto flex items-center justify-center py-6 px-4">
        <h1 class="text-3xl font-bold text-pallete-6">Santa Los</h1>
      </div>
    </header>
  );
};
