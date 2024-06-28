const userInitialState = {};

const singleUserReducer = (state = userInitialState, action) => {
  switch (action.type) {
    // actualizar el usuario
    case "SINGLE_USER": {
      return { ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default singleUserReducer;
