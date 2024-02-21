import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      
      <h1>Welcome to Certification Project III</h1>
      <p>This interactive quiz task list application is designed to help users manage their tasks efficiently.</p>
      
      <h2>Features:</h2>
      <ul>
        <li>The user can exit the application anytime using a special character.</li>
        <li>Tasks can be added, deleted, and updated with priority, completion status, and due date.</li>
        <li>Tasks can be displayed based on different categories such as today's tasks, priority, and completion status.</li>
        <li>Users can save and load sets of tasks from JSON files, based on priority or completion status.</li>
        <li>Users can specify the JSON file for saving or loading tasks.</li>
      </ul>
      
      <h2>Technical Skills Utilized:</h2>
      <ul>
        <li>React component structure and hierarchy.</li>
        <li>Form handling and data manipulation.</li>
        <li>Asynchronous file operations.</li>
        <li>State management using useState (initially).</li>
        <li>Redux integration for advanced state management.</li>
      </ul>
      
      <h2>Component Tree Diagram:</h2>

      <div class="component-diagram">
    <ul class="component-tree">
        <li>
            <span class="component-name">App</span>
            <ul>
                <li>
                    <span class="component-name">Home</span>
                </li>
                <li>
                    <span class="component-name">MainApp</span>
                    <ul>
                        <li>
                            <span class="component-name">AddTaskForm</span>
                        </li>
                        <li>
                            <span class="component-name">FilterBar</span>
                        </li>
                        <li>
                            <span class="component-name">TaskList</span>
                            <ul>
                                <li>
                                    <span class="component-name">Task</span>
                                </li>
                                <li>
                                    <span class="component-name">TaskEdit</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <span class="component-name">Contact</span>
                </li>
            </ul>
        </li>
    </ul>
</div>

      
      <h2>Description of Each Component:</h2>
      <p>For detailed descriptions of each component and their functionalities, refer to the component descriptions provided in the README file.</p>
    </div>
  );
};

export default Home;
