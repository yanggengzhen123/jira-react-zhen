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
  const fetchProjects = () =>
    client("projects", { data: cleanObject(param || {}) });
  useEffect(() => {
    // 获取项目列表
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [param]);
  return result;
};
// 编辑
export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
// 添加
export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
