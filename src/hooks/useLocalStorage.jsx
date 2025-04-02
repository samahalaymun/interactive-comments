import { useEffect, useState } from "react";

function getSavedValue(key, initValue) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (value) return value;
    if (initValue instanceof Function) return initValue();
    return initValue;
  } catch (error) {}
}
export default function useLocalStorage(key, initValue) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initValue);
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  }, [value]);

  return [value, setValue];
}
