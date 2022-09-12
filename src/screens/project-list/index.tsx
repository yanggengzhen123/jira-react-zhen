import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useState } from "react";
import { useDebounce } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
export const ProjectListScreen = () => {
  // 状态提升
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  // 防抖：把param改造成debouncedParam
  const debouncedParam = useDebounce(param, 2000);
  // 请求获取项目列表
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  // 获取用户列表(负责人)
  const { data: users } = useUsers();
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
const Container = styled.div`
  padding: 3.2rem;
`;
