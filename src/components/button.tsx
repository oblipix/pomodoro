/* eslint-disable prettier/prettier */ /* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';

interface Props {
  text: string;
  onClick?: () => void;
  className?: string;
}

export function Button(props: Props) {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.text}
    </button>
  );
}
