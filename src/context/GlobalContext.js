import { createContext, useReducer } from "react";
import appReducer from "./AppReducer.js";
import { v4 } from "uuid";

const initialState = {
  tasks: [
    {
      id: "1",
      title: "title one",
      description: "some description",
      done: false,
    },
    {
      id: "2",
      title: "title two",
      description: "some description 2",
      done: false,
    },
  ],
};

export const GlobalContext = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addTask = (task) =>
    dispatch({ type: "ADD_TASK", payload: { ...task, id: v4() } });
  

  const deleteTask = (id) => 
    dispatch({ type: "DELETE_TASK", payload: id });

  const updateTask = (task) =>
  dispatch({type: "UPDATE_TASK", payload: task})
  

  return (
    <GlobalContext.Provider value={{ ...state, addTask, deleteTask, updateTask }}>
      {children}
    </GlobalContext.Provider>
  );
};
