const userInitialState = null;

// Reducer para usuario
const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    // Caso para loguear un usuario
    case "LOGIN_USER": {
      return { ...action.payload };
    }
    // Caso para desloguear un usuario
    case "LOGOUT_USER": {
      return null;
    }
    default: {
      return { ...state };
    }
  }
};

export default userReducer;
