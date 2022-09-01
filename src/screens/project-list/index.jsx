import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useState, useEffect } from "react";
import qs from "qs";
import { cleanObject, useDebounce } from "utils";
import { useMount } from "./../../utils/index";
export const ProjectListScreen = () => {
  // 状态提升
  // 负责人
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  // 防抖：把param改造成debouncedParam
  const debouncedParam = useDebounce(param, 2000);
  // 项目列表
  const [list, setList] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    // 获取项目列表
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);
  // 获取用户列表
  useMount(() => {
    // 获取项目列表
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  );
};
