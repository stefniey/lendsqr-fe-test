import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Importation of pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <Router>
      <div className="App-header">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard results={[]} />} />
          <Route path="/User" element={<User results={[]} />} />
          <Route path="/UserDetails" element={<UserDetails />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
