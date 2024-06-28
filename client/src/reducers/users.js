const usersInitialState = [];

// Reducer para los usuarios
const usersReducer = (state = usersInitialState, action) => {
  switch (action.type) {
    // Caso para obtener todos los usuarios
    case "GET_ALL_USERS": {
      return [...action.payload];
    }
    // Caso para agregar un usuario
    case "ADD_USER": {
      return [...state, action.payload];
    }
    // Caso para editar un usuario
    case "EDIT_USER": {
      return [...state].map((user) => {
        if (user._id === action.payload._id) {
          return Object.assign(user, action.payload);
        }
        return user;
      });
    }
    // Caso para eliminar un usuario
    case "REMOVE_USER": {
      return [...state].filter((user) => user._id !== action.payload);
    }
    default: {
      return [...state];
    }
  }
};

export default usersReducer;
