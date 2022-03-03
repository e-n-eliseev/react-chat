import { useState, useEffect } from 'react';
//хук позволяет записывать и извлекать значения в локальном хранилище браузера, 
//используем его для сохранения имени и идентификатора пользователя между сессиями браузера.
export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue
  });

  useEffect(() => {
    const item = JSON.stringify(value)
    window.localStorage.setItem(key, item)
    //можем отключить eslint, чтобы не получать предупреждений об 
    //отсутствии зависимости key
    // eslint-disable-next-line
  }, [value]);

  return [value, setValue];
}
