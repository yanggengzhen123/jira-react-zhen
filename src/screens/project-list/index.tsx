import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useState } from "react";
import { useDebounce, useDocumentTitle } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "../../utils/url";
import { useProjectsSearchParams } from "./util";
export const ProjectListScreen = () => {
  // 浏览器标题
  useDocumentTitle("项目列表", false);
  // 状态提升
  const [param, setParam] = useProjectsSearchParams();
  // 防抖：把param改造成debouncedParam
  // 请求获取项目列表
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 2000));
  // 获取用户列表(负责人)
  const { data: users } = useUsers();
  // 获取url上的参数

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users || []}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      ></List>
    </Container>
  );
};
// ProjectListScreen.whyDidYouRender = true;
const Container = styled.div`
  padding: 3.2rem;
`;
