// 判断为0的情况
import { useEffect } from "react";
import { useState } from "react";
export const isFalsy = (value: unknown) => {
  return value === 0 ? false : !value;
};
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
// url参数清空
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
// conponentDidMount
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
// custom hook 防抖
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // 每次在上一个useEffect处理完之后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
