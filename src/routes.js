import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./components/Home";
import Surveys from "./components/Surveys";
import Create from "./components/Create";
import Register from  "./components/Register";
import LoginUser from "./components/LoginUser";

export default(
    <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/create" component={Create}></Route>
        <Route path="/surveys" component={Surveys}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={LoginUser}></Route>

    </Switch>
)