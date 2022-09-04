// 封装fetch请求
import qs from "qs";
const apiUrl = process.env.REACT_APP_API_URL;
import * as auth from "auth-provider";
// RequestInit 类型来源于fetch
interface Config extends RequestInit {
  data?: string;
  token?: object;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/endpoint`, config).then(async (response) => {
    if (response.status === 401) {
      // 退出登录
      await auth.logout();
      window.location.reload(); // 刷新页面
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};
