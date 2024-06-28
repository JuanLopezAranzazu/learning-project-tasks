const taskInitialState = {};

const singleTaskReducer = (state = taskInitialState, action) => {
  switch (action.type) {
    // actualizar la tarea
    case "SINGLE_TASK": {
      return { ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default singleTaskReducer;
