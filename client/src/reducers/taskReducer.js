import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  isLoading: true,
  selectedFilters: {},
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const updatedTaskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks[updatedTaskIndex] = action.payload;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload.id
      );
    },
    setFilter: (state, action) => {
      state.selectedFilters = { ...state.selectedFilters, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    updateTask: (state, action) => {
      // Find the index of the task to update
      const updatedTaskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      // Update the task if found
      if (updatedTaskIndex !== -1) {
        state.tasks[updatedTaskIndex] = action.payload;
      }
    },
  },
});

export const { addTask, editTask, deleteTask, setFilter, setLoading, setTasks, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
