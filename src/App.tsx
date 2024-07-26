/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */

import React from 'react';
import { PomodoroTimer } from './components/pomodoro-timer';

function App() {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={160}
        longRestTime={60}
        cycles={4}
      />
    </div>
  );
}

export default App;
