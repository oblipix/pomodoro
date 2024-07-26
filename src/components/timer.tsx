/* eslint-disable prettier/prettier */ /* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { secondsToMinutes } from '../utils/seconds-to-minutes';

interface Props {
  mainTime: number;
}

export function Timer(props: Props) {
  return <div className="timer"> {secondsToMinutes(props.mainTime)} </div>;
}
