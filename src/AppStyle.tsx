import React, { FC, Fragment } from 'react';
import { Global, css } from '@emotion/react';
import { Color } from './constants';

const style = css`
  html {
    height: 100vh;
    width: 100vw;
  }

  body {
    background-color: ${Color.blue};
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
