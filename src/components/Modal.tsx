import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Color } from '../constants';

export const ModalContainer = styled.div<{ show?: boolean }>`
  display: flex;
  /* transform: translate(-50%, -50%); */
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60%;
  padding: 1rem;
  background: ${Color.white};
  border: 1px solid ${Color.lightGrey};
  flex-direction: column;
  justify-content: center;
  visibility: ${({ show = true }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show = true }) => (show ? 1 : 0)};
  transform: ${({ show = true }) =>
    show ? 'translate(-50%, -50%)' : 'translate(-50%, -75%) '};
  transition: all 100ms ease-in-out;
  z-index: 2;
  transition-delay: 100ms;
  row-gap: 1rem;
`;

export const ModalOverlay = styled.div<{ show?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ show = true }) =>
    show ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
  z-index: 1;
  visibility: ${({ show = true }) => (show ? 'visible' : 'hidden')};
  transition: all 400ms ease-in-out;
  will-change: auto;
`;

export const Modal: FC<{ show: boolean }> = ({ show, children }) => {
  return (
    <ModalOverlay show={show}>
      <ModalContainer show={show}>{children}</ModalContainer>
    </ModalOverlay>
  );
};
