import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { LecDashboard } from "./pages/Lecturer/LecDashboard";
import { LecLogin } from "./pages/Lecturer/LecLogin";
import { StudentDashbaord } from "./pages/Student/StudentDashboard";
import { StudentLogin } from "./pages/Student/StudentLogin";
import { StudentRegister } from "./pages/Student/StudentRegister";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/student-dashbaord" component={StudentDashbaord} />
        <Route exact path="/student-login" component={StudentLogin} />
        <Route exact path="/student-register" component={StudentRegister} />
        <Route exact path="/lec-dashboard" component={LecDashboard} />
        <Route exact path="/lec-login" component={LecLogin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
