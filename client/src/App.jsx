import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import React, { useEffect } from 'react';


/**
 * Importing other components
 */
import LoginForm from './components/LoginForm'; // Import the Login component
import Home from './components/Home';
import Contact from './components/Contact';
import MainApp from './components/mainApp';

const App = () => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'q' && !event.ctrlKey && !event.metaKey) {
        if (confirm('Are you sure you want to exit?')) {
          //window.close();
          window.location.href = ''; // Change location to an empty string

        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <Router>
      <div className="container">
        <header>
          <nav>
            <ul className="header-nav"> {/* Apply a class name to the ul element */}
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/mainApp">MainApp</Link>
              </li>
              <li>
                <Link to="/Contact">Contact</Link>
              </li>
              <li>
                <Link to="/loginForm">Login</Link> {/* Add a link to the login page */}
              </li>
            </ul>
          </nav>
        </header>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainApp" element={<MainApp />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/loginForm" element={<LoginForm />} /> {/* Add the route for the login page */}
        </Routes>

        <footer>
          <p>Developed by: Mobina Mobaraki</p>
          <p>&copy; 2024 Certification Project III, CiC Program</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;