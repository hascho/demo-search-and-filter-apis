import { useReducer, useEffect, useRef } from "react";

type State<T> = {
  isLoading: boolean;
  isError: boolean;
  data?: T;
};

type Action<T> =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_FAILURE" };

export const useFetchData = <T extends unknown>(
  url: string,
  initialData: T
): State<T> => {
  const cancelRequest = useRef<boolean>(false);

  const initialState = {
    isLoading: false,
    isError: false,
    data: initialData
  };

  const dataFetchReducer = (state: State<T>, action: Action<T>) => {
    switch (action.type) {
      case "FETCH_INIT": {
        return {
          ...state,
          isLoading: true,
          isError: false
        };
      }
      case "FETCH_SUCCESS": {
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload
        };
      }
      case "FETCH_FAILURE": {
        return {
          ...state,
          isLoading: false,
          isError: true
        };
      }
      default: {
        // throw new Error(`Could not match action.type: ${action.type}`);
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`An error has occured: ${response.status}`);
        }

        const data = (await response.json()) as T;
        if (cancelRequest.current) {
          return;
        }

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        if (cancelRequest.current) {
          return;
        }
        dispatch({ type: "FETCH_FAILURE" });
      }
    };

    fetchData();

    // Avoid warning about ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
};
