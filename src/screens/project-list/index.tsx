import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useState } from "react";
import { useDebounce, useDocumentTitle } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "../../utils/url";
export const ProjectListScreen = () => {
  // 浏览器标题
  useDocumentTitle("项目列表", false);
  // 状态提升
  const [, setParam] = useState({
    name: "",
    personId: "",
  });
  // 重点（基本类型，可以放到依赖里，组件状态可以放到依赖里，非组件状态的对象，绝不可以放到依赖里）
  // const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  // const [param] = useUrlQueryParam(keys);
  const [param] = useUrlQueryParam(["name", "personId"]);
  // 防抖：把param改造成debouncedParam
  const debouncedParam = useDebounce(param, 2000);
  // 请求获取项目列表
  const { isLoading, error, data: list } = useProjects(debouncedParam);
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
