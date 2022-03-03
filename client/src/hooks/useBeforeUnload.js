import { useEffect } from 'react';
//хук используется для вывода сообщения или выполнения функции в момент перезагрузки или закрытия страницы
export const useBeforeUnload = (value) => {
  const handleBeforeunload = (e) => {
    let returnValue;
    if (typeof value === 'function') {
      returnValue = value(e);
    } else {
      returnValue = value;
    }
    if (returnValue) {
      e.preventDefault();
      e.returnValue = returnValue;
    }
    return returnValue;
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeunload);
    return () => window.removeEventListener('beforeunload', handleBeforeunload);
    //можем отключить eslint, чтобы не получать предупреждений об 
    //отсутствии зависимости key
    // eslint-disable-next-line
  }, []);
}
