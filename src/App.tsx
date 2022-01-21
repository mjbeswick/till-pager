import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppStyle } from './AppStyle';
import { Login } from './views/Login';
import { Notifications } from './views/Notifications';
import { Buttons } from './views/Buttons';
import { Peers } from './views/Peers';
import './lib/gun';

export function App() {
  return (
    <AppStyle>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/peers" element={<Peers />} />
        </Routes>
      </BrowserRouter>
    </AppStyle>
  );
}
