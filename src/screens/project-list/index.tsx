import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useState, useEffect } from "react";
import { cleanObject, useDebounce } from "utils";
import { useMount } from "../../utils/index";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
export const ProjectListScreen = () => {
  // 状态提升
  // 负责人
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  // 防抖：把param改造成debouncedParam
  const debouncedParam = useDebounce(param, 2000);
  // 项目列表
  const [list, setList] = useState([]);
  const client = useHttp();
  useEffect(() => {
    setIsLoading(true);
    // 获取项目列表
    client("projects", { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch((err) => {
        setList([]);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [debouncedParam]);
  // 获取用户列表
  useMount(() => {
    // 获取项目列表
    client("users").then(setUsers);
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users} dataSource={list}></List>
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
