// 未登录（未注册）的组件
import { Card } from "antd";
import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card>
        {isRegister ? <LoginScreen /> : <RegisterScreen />}
        <button onClick={() => setIsRegister(!isRegister)}>
          切换到 {isRegister ? "注册" : "登录"}
        </button>
      </Card>
    </div>
  );
};
