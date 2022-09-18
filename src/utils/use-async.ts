import { useCallback, useState } from "react";
import { useMountedRef } from "./index";
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
  // 是否是组件卸载状态，如果是卸载状态，则是false，只有在为true的情况下，才能setDate，否则组件卸载的情况下，在promise后setData时会报错
  const mountedRef = useMountedRef();
  // retry重新刷新一遍，跑一遍run
  // useState直接传入函数的含义是惰性初始化，所以，要用useState保存函数，不能直接传入函数，可以使用useState(() => () => {})避免该问题，或者使用useRef保存该函数
  const [retry, setRetry] = useState(() => () => {}); //如果是() => {}的话,retry的值为void（原因是惰性初始化）,所以是() => () => {}

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: "success",
        error: null,
      }),
    []
  );
  const setError = useCallback(
    (error: Error) =>
      setState({
        data: null,
        stat: "error",
        error,
      }),
    []
  );
  // 重要（run是用来触发异步请求的）
  // 由于run是函数（引用类型），可能会造成循环渲染的问题，所以要用useCallback包起来
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入promise类型数据");
      }
      // 保存住promise,再跑一遍run (使用上一次的promise跑一次)
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      // 初始化(由于useCallback中有state的依赖，会造成重复渲染，所以不能用下面这个更新state,要改成setState的函数式用法)
      // setState({ ...state, stat: "loading" });
      setState((prevState) => ({ ...prevState, stat: "loading" }));
      return promise
        .then((data) => {
          if (mountedRef.current) setData(data);
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
    },
    [config.throwOnError, mountedRef, setData, setError]
  );
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    // retry 被调用时重新跑一遍run,使得state刷新一遍
    retry,
    ...state,
  };
};
