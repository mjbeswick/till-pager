import React, { ButtonHTMLAttributes, FC, FormHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { Button } from './Button';
import { Field } from './Field';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 1rem;

  & > * {
    margin: 0.5rem 0;
  }

  & > button {
    margin: 1rem 0;
  }
`;

export const Form: FC<FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  ...props
}) => {
  return <StyledForm {...props}>{children}</StyledForm>;
};
