import React, { FC, Fragment, useEffect, useState } from 'react';

interface TimePastProps {
  time: number;
  updateSeconds?: number;
}

export const TimePast: FC<TimePastProps> = ({ time, updateSeconds = 1 }) => {
  const [state, setState] = useState('0s');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const ms = Date.now() - time;
      const seconds = (ms / 1000) % 60 ^ 0;
      const minutes = (ms / 60000) ^ 0;
      const secondsPadded = seconds.toString().padStart(2, '0');

      if (minutes) {
        setState(minutes + ':' + secondsPadded + 'm');
      } else {
        setState(seconds + 's');
      }
    }, updateSeconds * 1000);

    return () => {
      clearTimeout(timeout);
    };
  });

  return state as any;
};
