// 判断为0的情况
export const isFalsy = (value) => {
  return value === 0 ? false : !value;
};
// url参数清空
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
