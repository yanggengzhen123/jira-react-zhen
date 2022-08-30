export const List = ({ list, users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <th>{project.name}</th>
            <th>
              {users.find((user) => user.id === project.personId)?.name ||
                "未知"}
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
