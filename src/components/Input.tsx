import React, { InputHTMLAttributes, FC } from 'react';
import styled from '@emotion/styled';
import { Color } from '../constants';

const StyledInput = styled.input`
  border: 1px solid ${Color.inputBorder};
  background-color: ${Color.inputBackground};
  box-shadow: inset 0 0 0.25rem 1px{Color.red};
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: inherit;
`;

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <StyledInput {...props} />;
};
