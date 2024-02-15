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

## React Compontents:

App
├── TaskManager
│   ├── TaskList
│   │   ├── Task (repeating for each task)
│   │       ├── Title
│   │       ├── Status (dropdown for todo, in progress, completed)
│   │       ├── Priority (dropdown for high, medium, low)
│   │       ├── DueDate (input field)
│   │       ├── DeleteButton
│   │       ├── EditButton
│   ├── AddTaskForm
│   │   ├── TitleInput
│   │   ├── StatusSelect (dropdown for todo, in progress, completed)
│   │   ├── PrioritySelect (dropdown for high, medium, low)
│   │   ├── DueDateInput (input field)
│   │   └── SubmitButton
│   ├── EditTaskForm (hidden initially)
│   │   ├── TitleInput (populated with existing data)
│   │   ├── StatusSelect (pre-populated with existing selection)
│   │   ├── PrioritySelect (pre-populated with existing selection)
│   │   ├── DueDateInput (pre-populated with existing date)
│   │   └── SaveChangesButton
│   └── FilterBar
│   │   ├── TodayButton (filters for tasks due today)
│   │   ├── PriorityDropdown (filters by selected priority)
│   │   └── StatusDropdown (filters by selected status)
│   └── SaveLoadBar
│       ├── SaveButton
│       ├── LoadButton
│       └── FileInput
└── ExitButton
