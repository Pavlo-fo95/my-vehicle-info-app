declare module 'react-debounce-input' {
    import * as React from 'react';
  
    export interface DebounceInputProps {
      minLength?: number;
      debounceTimeout?: number;
      onChange?: React.ChangeEventHandler<HTMLInputElement>;
      className?: string;
      placeholder?: string;
    }
  
    export class DebounceInput extends React.Component<DebounceInputProps> {}
  }