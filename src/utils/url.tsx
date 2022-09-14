import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "./index";

// 返回页面url中，指定键的参数值（拿到url上的参数，赋值给input）
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // setSearchParams用来改变url query的参数值
  const [searchParams, setSearchParams] = useSearchParams();
  // 返回两个参数
  return [
    // 使用useMemo 对第一个引用类型进行依赖项，只有searchParams更新才会重新触发到引用类型改变，从而避免死循环
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    // 为了满足setParam的对象是K中key有的
    (params: Partial<{ [key in K]: string }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(o);
    },
  ] as const;
};
