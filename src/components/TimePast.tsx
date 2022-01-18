import React, { FC, Fragment, useEffect, useReducer, useState } from 'react';

interface TimePastProps {
  time: number;
  updateSeconds?: number;
}

export const TimePast: FC<TimePastProps> = ({ time }) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const ms = Date.now() - time;
  const seconds = (ms / 1000) % 60 ^ 0;
  const minutes = (ms / 60000) ^ 0;
  const secondsPadded = seconds.toString().padStart(2, '0');
  let text: string;
  if (minutes) {
    text = (minutes + ':' + secondsPadded + 'm') as any;
  } else {
    text = (seconds + 's') as any;
  }

  useEffect(() => {
    const timeoutMs = ms >= 5000 ? 5000 - (ms % 5000) : 1000 - (ms % 1000);

    const timeout = setTimeout(() => {
      forceUpdate();
    }, timeoutMs) as any;

    return () => {
      clearTimeout(timeout);
    };
  }, [time, text]);

  return text as any;
};
