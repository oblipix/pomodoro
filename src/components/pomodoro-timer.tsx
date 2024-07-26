/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */

import React, { useEffect, useState, useCallback } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';
import { secondsToTime } from '../utils/seconds-to-time';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/mixkit-achievement-bell-600.wav');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/mixkit-bell-notification-933.wav');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props) {
  const [mainTime, setMainTime] = useState(() => {
    const savedTime = localStorage.getItem('pomodoroMainTime');
    return savedTime ? parseInt(savedTime, 10) : props.pomodoroTime;
  });
  const [timeCounting, setTimeCounting] = useState(() => {
    const savedTimeCounting = localStorage.getItem('pomodoroTimeCounting');
    return savedTimeCounting === 'true';
  });
  const [working, setWorking] = useState(() => {
    const savedWorking = localStorage.getItem('pomodoroWorking');
    return savedWorking === 'true';
  });
  const [resting, setResting] = useState(() => {
    const savedResting = localStorage.getItem('pomodoroResting');
    return savedResting === 'true';
  });
  const [cyclesQtdManager, setCyclesQtdManager] = useState(() => {
    const savedCycles = localStorage.getItem('pomodoroCyclesQtdManager');
    return savedCycles
      ? JSON.parse(savedCycles)
      : new Array(props.cycles - 1).fill(true);
  });

  const [completedCycles, setCompletedCycles] = useState(() => {
    const savedCompletedCycles = localStorage.getItem(
      'pomodoroCompletedCycles',
    );
    return savedCompletedCycles ? parseInt(savedCompletedCycles, 10) : 0;
  });
  const [fullWorkingTime, setFullWorkingTime] = useState(() => {
    const savedFullWorkingTime = localStorage.getItem(
      'pomodoroFullWorkingTime',
    );
    return savedFullWorkingTime ? parseInt(savedFullWorkingTime, 10) : 0;
  });
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(() => {
    const savedNumberOfPomodoros = localStorage.getItem(
      'pomodoroNumberOfPomodoros',
    );
    return savedNumberOfPomodoros ? parseInt(savedNumberOfPomodoros, 10) : 0;
  });

  useInterval(
    () => {
      setMainTime((prevTime) => {
        const newTime = prevTime - 1;
        if (working) setFullWorkingTime(fullWorkingTime + 1);
        return newTime;
      });
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    audioStartWorking.play();
  }, [props.pomodoroTime]);

  const configureRest = useCallback(
    (Long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      if (Long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }

      audioStopWorking.play();
    },
    [props.longRestTime, props.shortRestTime],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('resting');

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles((prev) => prev + 1);
    }

    if (working) setNumberOfPomodoros((prev) => prev + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    configureRest,
    configureWork,
    cyclesQtdManager,
    numberOfPomodoros,
    props.cycles,
  ]);

  useEffect(() => {
    localStorage.setItem('pomodoroMainTime', mainTime.toString());
    localStorage.setItem('pomodoroTimeCounting', timeCounting.toString());
    localStorage.setItem('pomodoroWorking', working.toString());
    localStorage.setItem('pomodoroResting', resting.toString());
    localStorage.setItem(
      'pomodoroCyclesQtdManager',
      JSON.stringify(cyclesQtdManager),
    );
    localStorage.setItem('pomodoroCompletedCycles', completedCycles.toString());
    localStorage.setItem('pomodoroFullWorkingTime', fullWorkingTime.toString());
    localStorage.setItem(
      'pomodoroNumberOfPomodoros',
      numberOfPomodoros.toString(),
    );
  }, [
    mainTime,
    timeCounting,
    working,
    resting,
    cyclesQtdManager,
    completedCycles,
    fullWorkingTime,
    numberOfPomodoros,
  ]);

  return (
    <div className="pomodoro">
      <h2>Você está {working ? 'Trabalhando' : 'Descansando'}</h2>

      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button text="Work" onClick={() => configureWork()}></Button>
        <Button text="Rest" onClick={() => configureRest(false)}></Button>
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
        ></Button>
      </div>

      <div className="details">
        <p> Ciclos Concluídos: {completedCycles} </p>
        <p> Horas Trabalhadas: {secondsToTime(fullWorkingTime)} </p>
        <p> Pomodoros Concluídos: {numberOfPomodoros} </p>
      </div>
    </div>
  );
}
