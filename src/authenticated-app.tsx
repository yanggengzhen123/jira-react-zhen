import { Button } from "antd";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "./screens/project-list/index";
// authenticated-app 已经登录的组件
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <Button onClick={logout} type={"primary"}>
        登出
      </Button>
      <ProjectListScreen />
    </div>
  );
};
