import React, { CSSProperties, FC } from 'react';
import styled from '@emotion/styled';
import { Color } from '../constants';

export const ModalContainer = styled.div<{ show?: boolean }>`
  display: flex;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100px;
  width: 80%;
  max-width: 400px;
  padding: 1rem;
  background: ${Color.white};
  flex-direction: column;
  justify-content: center;
  visibility: ${({ show = true }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show = true }) => (show ? 1 : 0)};
  transition: opacity 100ms ease-in-out;
  z-index: 2;
  transition-delay: 100ms;
  row-gap: 1rem;
  color: ${Color.body};
  border-radius: 1.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
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

interface ModalProps {
  show: boolean;
  style?: CSSProperties | undefined;
}

export const Modal: FC<ModalProps> = ({ show, children, style }) => {
  return (
    <ModalOverlay show={show}>
      <ModalContainer show={show} style={style}>
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
};

export const ModalHeader = styled.div`
  padding-bottom: 0.5rem;
  font-size: 2rem;
  text-align: center;
`;

export const ModalFooter = styled.div`
  padding-top: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 1rem;
  row-gap: 1rem;
`;

export const ModalBody = styled.div`
  flex-grow: 1;
  background: ${Color.white};
  color: ${Color.body};
  overflow-y: auto;
`;
