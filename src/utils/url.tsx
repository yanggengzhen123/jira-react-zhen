import { useSearchParams } from "react-router-dom";

// 返回页面url中，指定键的参数值（拿到url上的参数，赋值给input）
export const useUrlQueryParam = (keys: string[]) => {
  // setSearchParams用来改变url query的参数值
  const [searchParams, setSearchParams] = useSearchParams();
  // 返回两个参数
  return [
    keys.reduce((prev, key) => {
      return { ...prev, [key]: searchParams.get(key) || "" };
    }, {} as { [key in string]: string }),
    setSearchParams,
  ] as const;
};
