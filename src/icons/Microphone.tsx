import * as React from 'react';
import { SVGProps } from 'react';

export const Microphone = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 34 34"
    width="1em"
    height="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>{'microphone-line'}</title>
    <path
      d="M18 24c3.9 0 7-3.1 7-7V9c0-3.9-3.1-7-7-7s-7 3.1-7 7v8c0 3.9 3.1 7 7 7zM13 9c0-2.8 2.2-5 5-5s5 2.2 5 5v8c0 2.8-2.2 5-5 5s-5-2.2-5-5V9z"
      className="clr-i-outline clr-i-outline-path-1"
    />
    <path
      d="M30 17h-2c0 5.5-4.5 10-10 10S8 22.5 8 17H6c0 6.3 4.8 11.4 11 11.9V32h-3c-.6 0-1 .4-1 1s.4 1 1 1h8c.6 0 1-.4 1-1s-.4-1-1-1h-3v-3.1c6.2-.5 11-5.6 11-11.9z"
      className="clr-i-outline clr-i-outline-path-2"
    />
    <path fill="none" d="M0 0h36v36H0z" />
  </svg>
);
