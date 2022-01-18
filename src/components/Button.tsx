import React, { ButtonHTMLAttributes, FC } from 'react';
import styled from '@emotion/styled';
import { Color } from '../constants';

const StyledButton = styled.button<{
  color: keyof typeof Color;
  outline?: boolean;
  disabled?: boolean;
}>`
  font-size: inherit;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  background: #eee;
  border-radius: 100px;
  flex-grow: 1;
  color: ${({ outline = false, color }) => {
    if (outline) {
      return Color[color];
    } else {
      return Color.white;
    }
  }};
  border-color: ${({ outline = false, color }) => {
    if (outline) {
      return Color[color];
    } else {
      return Color.white;
    }
  }};
  background: ${({ outline = false, color }) => {
    if (outline) {
      return 'transparent';
    } else {
      return Color[color];
    }
  }};
  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const Button: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    color: keyof typeof Color;
    outline?: boolean;
  }
> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
