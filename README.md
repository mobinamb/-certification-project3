# certification-project3
An interactive quiz task list application.

## Features:

a. The user can exit the application when they wish with a special reserved character, such as ‘q’.
b. The user can add, delete, and update tasks, with the following critera in the task: priority (high, medium, low), completion status (todo, in progress, completed), and due date (date).
c. The user can display (print to console) tasks according to the following categories, if selected by user (today’s tasks, priority, 
completion status).
d. The user can save a set of tasks to a json file, or load a set of tasks from a json file. When it comes to saving a set of tasks, according to priority or completion status specified by the user.
e. The user can specify which json file they are writing to, or reading from


## Technical Skills:
React component structure and hierarchy.
Form handling and data manipulation.
Asynchronous file operations with fs module.
State management using useState (initially).
Redux integration for advanced state management.

# Component Tree Diagram

App
├── Home
├── MainApp
│   ├── AddTaskForm
│   ├── FilterBar
│   ├── TaskList
│   │   ├── Task
│   │   └── TaskEdit
└── Contact

## Description of each component:

# App Component

Functionality: Serves as the main entry point for the application, providing routing capabilities using React Router.
Props: None.
State: None.
Functions:
handleKeyDown: Listens for a key press event and prompts the user to confirm exit if 'q' is pressed.

# MainApp Component

Functionality: Represents the main application interface where users can manage tasks.
Props: None.
State:
tasks: Stores the list of tasks.
selectedFilters: Stores selected filters for task display.
isLoading: Tracks the loading state of tasks.
filteredTasks: Stores filtered tasks based on selected filters.
file: Stores the selected JSON file.
Functions:
readTasksFromFile: Reads tasks from a JSON file.
saveTasksToFile: Saves tasks to a JSON file.
handleSaveButtonClick: Handles saving filtered tasks to a JSON file.
handleFileChange: Handles file selection and loading tasks from the selected file.
fetchTasks: Fetches tasks from the selected file.
handleTaskAdd: Handles the addition of a new task.
handleTaskDelete: Handles the deletion of a task.
handleTaskEdit: Handles the editing of a task.
handleFilterChange: Handles changes in filter options.
filterTasks: Filters tasks based on selected filters.
isToday: Checks if a task is due today.

# AddTaskForm Component

Functionality: Provides a form for users to add new tasks.
Props:
onTaskAdd: Callback function to handle the addition of a new task.
State:
title: Stores the title of the task.
priority: Stores the priority of the task.
completion: Stores the completion status of the task.
dueDate: Stores the due date of the task.
errors: Stores validation errors.
Functions:
handleSubmit: Handles form submission and task addition.
validateForm: Validates form fields.

# FilterBar Component

Functionality: Provides filter options for users to filter tasks based on priority, completion status, and due date.
Props:
onFilterChange: Callback function to handle filter changes.
State:
selectedPriority: Stores the selected priority filter.
selectedStatus: Stores the selected completion status filter.
selectedDateOption: Stores the selected due date filter option.
Functions:
handlePriorityChange: Handles changes in priority filter.
handleStatusChange: Handles changes in completion status filter.
handleDateOptionChange: Handles changes in due date filter option.

# TaskList Component

Functionality: Displays a list of tasks and manages task editing functionality.
Props:
tasks: Array of tasks to display.
onTaskDelete: Callback function to handle task deletion.
setTasks: Setter function to update the tasks.
State:
editedTaskId: Stores the ID of the task being edited.
Functions:
handleEditTask: Handles initiating task editing.
handleCloseEdit: Handles closing task editing.
handleUpdateTask: Handles updating task data.

# Task Component

Functionality: Represents an individual task item and manages task editing state.
Props:
task: Task object containing task details.
onTaskEdit: Callback function to handle task editing.
onTaskUpdate: Callback function to handle task updates.
onTaskDelete: Callback function to handle task deletion.
State:
isEditing: Tracks whether the task is being edited.
updatedTask: Stores the updated task data.
Functions:
handleSubmit: Handles form submission during task editing.
handleInputChange: Handles input changes during task editing.

# TaskEdit Component

Functionality: Provides a form for editing task details.
Props:
task: Task object containing task details.
onTaskUpdate: Callback function to handle task updates.
onClose: Callback function to handle closing the edit form.
State:
title: Stores the title of the task being edited.
priority: Stores the priority of the task being edited.
completion: Stores the completion status of the task being edited.
dueDate: Stores the due date of the task being edited.
Functions:
handleSubmit: Handles form submission during task editing.
