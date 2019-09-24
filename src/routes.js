import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./components/Home";
import Surveys from "./components/Surveys";
import Create from "./components/Create";

export default(
    <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/create" component={Create}></Route>
        <Route exact path="/surveys" component={Surveys}></Route>

    </Switch>
)