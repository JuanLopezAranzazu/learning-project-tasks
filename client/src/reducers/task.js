const tasksInitialState = [];

// Reducer para las tareas
const tasksReducer = (state = tasksInitialState, action) => {
  switch (action.type) {
    // Caso para obtener todas las tareas
    case "GET_ALL_TASKS": {
      return [...action.payload];
    }
    // Caso para agregar una tarea
    case "ADD_TASK": {
      return [...state, action.payload];
    }
    // Caso para editar una tarea
    case "EDIT_TASK": {
      return [...state].map((task) => {
        if (task._id === action.payload._id) {
          return Object.assign(task, action.payload);
        }
        return task;
      });
    }
    // Caso para eliminar una tarea
    case "REMOVE_TASK": {
      return [...state].filter((task) => task._id !== action.payload);
    }
    default: {
      return [...state];
    }
  }
};

export default tasksReducer;
