// actions.js
import { createAction } from '@reduxjs/toolkit';

export const addTask = createAction('tasks/addTask');
export const editTask = createAction('tasks/editTask');
export const deleteTask = createAction('tasks/deleteTask');
export const setFilter = createAction('tasks/setFilter');
export const setLoading = createAction('tasks/setLoading');
export const setTasks = createAction('tasks/setTasks');
