import { useState } from 'react';

/**
 *  @description useLocalStorage를 사용하여 LocalStorage에 저장된 값을 가져올 수 있습니다.
 *  @params 저장 할 key 값
 *  @params 초기값
 *  @returns [저장된 값, setState 함수]
 
 *  @example
 *  const [name, setName] = useLocalStorage("name", "Bob");
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStorageItem = (key: string, initialValue: any) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(error);
    return initialValue;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setStorageItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    return getStorageItem(key, initialValue);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setValue = (value: (arg0: any) => any) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    setStorageItem(key, valueToStore);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
