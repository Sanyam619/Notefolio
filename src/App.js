import "./App.css";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./compnonents/Navbar";
import Home from "./compnonents/Home";
import About from "./compnonents/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./compnonents/Alert";
import Login from "./compnonents/Login";
import Signup from "./compnonents/Signup";
import { useState } from "react";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
          <Switch>
            <Route exact path="/">
              <Home showAlert={showAlert}/>
            </Route>
            <Route exact path="/About">
              <About />
            </Route>
            <Route exact path="/login">
              <Login showAlert={showAlert} />
            </Route>
            <Route exact path="/signup">
              <Signup showAlert={showAlert} />
            </Route>
          </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
