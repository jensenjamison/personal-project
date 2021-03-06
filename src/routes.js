import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./components/Home";
import Surveys from "./components/Surveys";
import Create from "./components/Create";
import RegisterEdit from  "./components/RegisterEdit";
import LoginUser from "./components/LoginUser";
import Survey from "./components/Survey";


export default(
    <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/create" component={Create}></Route>
        <Route path="/surveys/:survey_id" component={Survey}></Route>
        <Route path="/surveys" component={Surveys}></Route>
        <Route path="/register" component={RegisterEdit}></Route>
        <Route path="/edit" component={RegisterEdit}></Route>
        <Route path="/login" component={LoginUser}></Route>

    </Switch>
)