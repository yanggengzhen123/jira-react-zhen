import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "./screens/project-list/index";
// authenticated-app 已经登录的组件
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={() => logout}>登出</button>
      <ProjectListScreen />
    </div>
  );
};
