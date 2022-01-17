import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Input } from './Input';

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;

  input {
    margin: 0;
  }
`;

interface FieldProps {
  type: '' | 'text' | 'password';
  name: string;
  defaultValue?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Field: FC<FieldProps> = ({
  type,
  name,
  defaultValue,
  value,
  onChange,
}) => {
  return (
    <FieldContainer>
      <label htmlFor={name}>Password</label>
      <Input
        name={name}
        type={type}
        defaultValue={defaultValue}
        value={value}
      />
    </FieldContainer>
  );
};
