import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
// import GoalSet from './pages/GoalSet';
import "antd/dist/antd.css";

const App = () => {
  return (
    <div className="App">
      <Route exact component={SignIn} path="/" />
      <Route component={SignIn} path="/SignIn" />
      <Route component={SignUp} path="/SignUp" />
      {/* <Route component={GoalSet} path="/GoalSet"/> */}
    </div>
  );
}

export default App;
