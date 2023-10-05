import React from 'react';
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navBar';
import Home from './pages/home';
import Attendance from './pages/attendance/Attendance_track';
import Submissions from './pages/submissions/submission';
import Todo from './pages/todo/ToDolist';
import EmailPasswordRegister from './pages/auth/Emailregister'
import GoogleRegister from './pages/auth/Googleregister'
import Dashboard from "./pages/auth/Dashboard";
import PrivateRoute from "./pages/auth/PrivateRoute"
function App() {
  return (
    <div className="app">
      <NavBar />
      {/* <Router> */}
        <Routes>
      
      <Route path="/login">
          <EmailPasswordRegister />
          <GoogleRegister />
      </Route>
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/" element={<Home />} />
        <PrivateRoute path="/submissions" element={<Submissions />} />
        <PrivateRoute path="/attendance" element={<Attendance />} />
        <PrivateRoute path="/ToDo" element={<Todo />} />
        {/* <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} /> */}

      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;

