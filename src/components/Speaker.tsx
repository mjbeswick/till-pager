import React from 'react';
import styled from '@emotion/styled';
import { SVGProps } from 'react';
import { Color } from '../constants';

const SVG = styled.svg`
  &.speaker-icon {
    overflow: visible;
    .waves {
      transform-origin: 15px 9px;
      opacity: 0;
      transform: scale(0) translateX(0);
      animation: audioWaves 1s ease-in-out infinite;
      fill: ${Color.blue};
    }
  }

  @keyframes audioWaves {
    0% {
      opacity: 1;
      transform: scale(0) translateX(0);
    }
    100% {
      opacity: 0;
      transform: scale(2) translateX(3px);
    }
  }
`;

export const Speaker = (props: SVGProps<SVGSVGElement>) => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon speaker-icon"
    viewBox="0 0 20 20"
    width={50}
    height={50}
    {...props}
  >
    <path
      className="speaker"
      d="M11.117 2.836a.393.393 0 0 0-.203.11L8.836 5.022l-1.592 1.59H2.43a.4.4 0 0 0-.399.399v5.976a.4.4 0 0 0 .399.399h4.816l3.668 3.668a.393.393 0 0 0 .436.086.398.398 0 0 0 .244-.368V3.227a.397.397 0 0 0-.244-.368zm-.32 1.353v11.622l-2.988-2.989V7.178zM2.828 7.41h4.184v5.18H2.828zm13.239-2.334"
    />
    <path
      className="waves x-first"
      d="M16.067 5.076a.41.41 0 0 0-.149.059.401.401 0 0 0-.113.552 7.986 7.986 0 0 1 1.314 4.364c0 1.518-.454 3.059-1.314 4.36a.4.4 0 0 0 .113.554s.144.064.219.064a.4.4 0 0 0 .334-.178 8.792 8.792 0 0 0 1.445-4.802c0-1.672-.5-3.368-1.445-4.801a.396.396 0 0 0-.404-.172zm-1.454 1.436a.398.398 0 0 0-.3.592c.507.9.775 1.917.775 2.945a6 6 0 0 1-.775 2.945.397.397 0 0 0 .345.594.4.4 0 0 0 .348-.2 6.855 6.855 0 0 0 .879-3.34c0-1.15-.303-2.32-.879-3.34a.396.396 0 0 0-.393-.196zM13.14 7.99a.398.398 0 0 0-.371.55c.194.477.293.985.293 1.509 0 .524-.1 1.031-.293 1.507a.4.4 0 0 0 .367.551.401.401 0 0 0 .37-.248 4.748 4.748 0 0 0 .353-1.81c0-.627-.12-1.237-.354-1.81a.4.4 0 0 0-.365-.249z"
    />
  </SVG>
);
