import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/navBar';
import Home from './pages/home';
import Attendance from './pages/attendance/Attendance_track';
import Submissions from './pages/submissions/submission';
import Todo from './pages/todo/ToDolist';

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/ToDo" element={<Todo />} />
        <Route path="/signup" element={<signup />} />
        <Route path="/login" element={<login />} />
      </Routes>
    </div>
  );
}

export default App;

