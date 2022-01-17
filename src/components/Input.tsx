import React, { InputHTMLAttributes, FC } from 'react';
import styled from '@emotion/styled';

const StyledInput = styled.input`
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  /* margin: 0.5rem 1rem; */
  background: #eee;
  border-radius: 100px;
  font-size: inherit;
`;

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <StyledInput {...props} />;
};
