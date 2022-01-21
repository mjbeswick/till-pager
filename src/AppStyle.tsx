import React, { FC, Fragment } from 'react';
import { Global, css } from '@emotion/react';
import { Color } from './constants';

const style = css`
  html {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    height: -webkit-fill-available;
    overflow: hidden;
    background-color: ${Color.midGrey};
    opacity: 1;
    background: ${Color.midGrey};
  }

  body {
    background-color: ${Color.white};
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: ${Color.white};
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    /* min-height: 100%; */
  }
  @media only screen and (min-width: 600px) {
    body {
      max-width: 600px;
      max-height: 1000px;
      height: 1250px;
      margin: 0 auto;
      box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.2);
      /* border-radius: 1rem; */
      overflow: hidden;
    }
  }

  #root {
    display: contents;
  }
`;

export const AppStyle: FC = ({ children }) => {
  return (
    <Fragment>
      <Global styles={style} />
      {children}
    </Fragment>
  );
};
