//jshint esversion:6
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import Welcome from "./pages/Welcome";
import Todo from "./pages/Todo";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Welcome />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <Route exact path="/signin">
                        <Signin />
                    </Route>
                    <Route exact path="/todo">
                        <Todo />
                    </Route>
                    <Route exact path="/test">
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
