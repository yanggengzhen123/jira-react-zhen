import { useState } from "react";

export const SearchPanel = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  // 负责人
  const [users, setUsers] = useState([]);
  // 项目列表
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch("").then(async (response) => {
      if (response.ok) {
      }
    });
  }, [param]);
  return (
    <form>
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(evt) =>
            setParam({
              ...param,
              personId: evt.target.value,
            })
          }
        >
          <option value={""}>负责人</option>
          {users.map((user) => {
            <option value={user.id}>{user.name}</option>;
          })}
        </select>
      </div>
    </form>
  );
};
