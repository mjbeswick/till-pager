import React, { FC } from 'react';
import { Button } from '../components/Button';
import { Field } from '../components/Field';
import { Form } from '../components/Form';
import { CenterContainer } from '../components/CenterContainer';

export const Login: FC = () => {
  return (
    <CenterContainer>
      <Form action="/">
        <h1>Login</h1>
        <Field type="text" name="username" />
        <Field type="password" name="password" />
        <Button color="blue">Login</Button>
      </Form>
    </CenterContainer>
  );
};
