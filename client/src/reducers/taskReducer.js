import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

// Initial state for tasks slice
const initialTaskState = {
  tasks: [],
  isLoading: true,
  selectedFilters: {},
};

// Task slice reducer
const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialTaskState,
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
      const updatedTaskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (updatedTaskIndex !== -1) {
        state.tasks[updatedTaskIndex] = action.payload;
      }
    },
  },
});

// Initial state for taskLists slice
const initialTaskListState = {
  taskLists: [],
};

// TaskLists slice reducer
const taskListSlice = createSlice({
  name: 'taskLists',
  initialState: initialTaskListState,
  reducers: {
    addTaskList: (state, action) => {
      state.taskLists.push(action.payload);
    },
    deleteTaskList: (state, action) => {
      state.taskLists = state.taskLists.filter(
        (taskList) => taskList.id !== action.payload.id
      );
    },
    updateTaskList: (state, action) => {
      const updatedTaskListIndex = state.taskLists.findIndex(
        (taskList) => taskList.id === action.payload.id
      );
      if (updatedTaskListIndex !== -1) {
        state.taskLists[updatedTaskListIndex] = action.payload;
      }
    },
  },
});

// Combine reducers
const rootReducer = combineReducers({
  tasks: taskSlice.reducer,
  taskLists: taskListSlice.reducer,
});

export default rootReducer;
