import Gun from 'gun';
import 'gun/lib/unset';

declare global {
  interface Window {
    gunDB: ReturnType<typeof Gun>;
  }
}

localStorage.clear();

// export const gunDB = Gun(['https://gunjs.herokuapp.com/gun']);
export const gunDB = Gun(['http://192.168.0.202:8090/gun']);
// export const gunDB = Gun([
// 'http://192.168.0.2:8090/gun',
// 'https://gunjs.herokuapp.com/gun',
// ]);

window.gunDB = gunDB;
