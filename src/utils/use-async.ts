import { useState } from "react";
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success"; //idle状态还未发生
}
const defaultInitialState: State<null> = {
  stat: "idle",
  error: null,
  data: null,
};
const defaultConfig = {
  throwOnError: false,
};
// run catch return Promise.reject(error) 处理异步获取不到报错的情况

export const useAsync = <D>(
  initialState: State<D> = {
    stat: "idle",
    error: null,
    data: null,
  },
  throwOnError?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...throwOnError };
  // 默认值
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      data: null,
      stat: "error",
      error,
    });
  // 重要（run是用来触发异步请求的）
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入promise类型数据");
    }
    // 初始化
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        // return error 这样外界接收不到异常，应该改成Promise.reject(error);
        if (config.throwOnError) {
          return Promise.reject(error);
        } else {
          return error;
        }
      });
  };
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
