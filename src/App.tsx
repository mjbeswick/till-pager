import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppStyle } from './AppStyle';
import { Login } from './views/Login';
import { Notifications } from './views/Notifications';
import Gun from 'gun';
import { Buttons } from './views/Buttons';

// export const gun = Gun('https://gunjs.herokuapp.com/gun');
const nodeKey = 'notifications-0';
export const gun = Gun('http://localhost:4001/gun');
export const notificationsNode = gun.get(nodeKey);

(window as any).gun = gun;

export function App() {
  return (
    <AppStyle>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/buttons" element={<Buttons />} />
        </Routes>
      </BrowserRouter>
    </AppStyle>
  );
}
