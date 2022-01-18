import React, { FC, Fragment, useReducer } from 'react';
import { ViewBody, ViewHeader } from '../components/Styled';
import { gunDB } from '../lib/gun';

export const Peers: FC = () => {
  const [, forceUPdate] = useReducer((x) => x + 1, 0);

  setTimeout(forceUPdate, 1000);

  return (
    <Fragment>
      <ViewHeader>Peers</ViewHeader>
      <ViewBody>
        <ul>
          {Object.keys((gunDB as any)._.opt.peers).map(
            (peer: any, i: number) => (
              <li key={i}>{peer}</li>
            )
          )}
        </ul>
      </ViewBody>
    </Fragment>
  );
};
