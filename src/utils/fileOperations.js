export const readTasksFromFile = async () => {
  try {
    const tasksJSON = await localStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
  } catch (error) {
    console.error('Error reading tasks from file:', error);
    return []; // Return an empty array on error
  }
};

export const writeTasksToFile = async (tasks) => {
  try {
    await localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error writing tasks to file:', error);
  }
};
