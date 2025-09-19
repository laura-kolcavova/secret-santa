import { Component } from 'solid-js';

export const Footer: Component = () => {
  return (
    <footer class="border-t border-solid border-gray-300 bg-gray-50">
      <div class="container mx-auto flex flex-row justify-center items-center py-6 px-4">
        <div class="text-sm text-pallete-6">{new Date().getFullYear()} Santa Los.</div>
      </div>
    </footer>
  );
};
