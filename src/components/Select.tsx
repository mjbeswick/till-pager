import React, { InputHTMLAttributes, FC } from 'react';
import styled from '@emotion/styled';
import { Color } from '../constants';

const StyledSelect = styled.select`
  border: 1px solid ${Color.inputBorder};
  background-color: ${Color.inputBackground};
  box-shadow: inset 0 0 0.25rem 1px{Color.red};
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: inherit;
`;

export const Select: FC<
  InputHTMLAttributes<HTMLSelectElement> & { options: Record<string, string> }
> = (props) => {
  return (
    <StyledSelect {...props}>
      {Object.entries(props.options).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </StyledSelect>
  );
};
