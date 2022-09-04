// 未登录（未注册）的组件
import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {isRegister ? <LoginScreen /> : <RegisterScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到 {isRegister ? "注册" : "登录"}
      </button>
    </div>
  );
};
