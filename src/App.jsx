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
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/mainApp">MainApp</Link>
          </li>
          <li>
            <Link to="/Contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainApp" element={<MainApp />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;