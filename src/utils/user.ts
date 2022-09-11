import { User } from "screens/project-list/search-panel";
import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject, useMount } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useMount(() => {
    // 获取项目列表
    run(client("users", { data: cleanObject(param || {}) }));
  });
  return result;
};
