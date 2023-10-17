import React from 'react';
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navBar';
import Home from './pages/home';
import Attendance from './pages/attendance/Attendance_track';
import Submissions from './pages/submissions/submission';
import Todo from './pages/todo/ToDolist';
import UserForm from './components/forms/userInfoFrorm';
import Timetable from './components/timetable';
// import EmailPasswordRegister from './pages/auth/Emailregister'
// import GoogleRegister from './pages/auth/Googleregister'
// import Dashboard from "./pages/auth/Dashboard";
// import PrivateRoute from "./pages/auth/PrivateRoute"
function App() {
  return (
    <div className="app">
      <NavBar />
         <Routes>
      
      {/* <Route path="/login">
          <EmailPasswordRegister />
          <GoogleRegister />
      </Route>  */}
        {/* <Route path="/dashboard" component={Dashboard} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/ToDo" element={<Todo />} />
        <Route path="/userInfo" element={<UserForm/>} />
        <Route path="/timetable" element={<Timetable/>} />
      </Routes>
     
    </div>
  );
}

export default App;

