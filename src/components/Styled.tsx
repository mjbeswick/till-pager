import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Color } from '../constants';

export const ViewHeader = styled.div`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  fill: ${Color.white};
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${Color.midGrey};
`;

export const ViewBody = styled.div<{ dark?: boolean }>`
  flex-grow: 1;
  background: ${({ dark }) => (dark ? Color.lightGrey : Color.white)};
  color: ${Color.body};
  overflow-y: auto;
`;

export const ViewFooter = styled.div<{ show?: boolean }>`
  background: ${Color.white};
  color: ${Color.body};
  display: flex;
  flex-direction: row;
  justify-content: center;
  display: ${({ show = true }) => (show ? 'flex' : 'none')};
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
`;
