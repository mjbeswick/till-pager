import React, { InputHTMLAttributes, FC } from 'react';
import styled from '@emotion/styled';

const StyledSelect = styled.select`
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  /* margin: 0.5rem 1rem; */
  background: #eee;
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
