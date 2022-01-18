import Gun from 'gun';
import 'gun/lib/unset';

declare global {
  interface Window {
    gunDB: ReturnType<typeof Gun>;
  }
}

localStorage.clear();

// export const gunDB = Gun(['https://gunjs.herokuapp.com/gun']);
export const gunDB = Gun([
  'http://localhost:/8081',
  'http://192.168.0.202:/8081',
  'https://gunjs.herokuapp.com/gun',
]);

window.gunDB = gunDB;
