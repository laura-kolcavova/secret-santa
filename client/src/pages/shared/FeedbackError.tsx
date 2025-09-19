import { Component } from 'solid-js';

export type FeedbackErrorProps = {
  errorMessage: string;
};

export const FeedbackError: Component<FeedbackErrorProps> = (props) => {
  return <div class="mt-2 text-sm text-red-700">{props.errorMessage}</div>;
};
