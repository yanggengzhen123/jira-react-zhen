// 封装请求
import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

// 封装请求项目列表
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  //   const { run, isLoading, error, data: list } = useAsync<Project[]>();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    // 获取项目列表
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};
