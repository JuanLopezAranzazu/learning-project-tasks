import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

// reducers
import userReducer from "../reducers/user";
import tasksReducer from "../reducers/task";
import singleTaskReducer from "../reducers/singleTask";

const configureStore = () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      tasks: tasksReducer,
      singleTask: singleTaskReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;
