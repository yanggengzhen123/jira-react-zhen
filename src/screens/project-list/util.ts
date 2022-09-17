// 项目列表搜索的参数
import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

export const useProjectsSearchParams = () => {
  // 重点（基本类型，可以放到依赖里，组件状态可以放到依赖里，非组件状态的对象，绝不可以放到依赖里）
  // const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  // const [param] = useUrlQueryParam(keys);
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // 把string转化为number
  return [
    // 解决 引用类型重复渲染的问题
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};
