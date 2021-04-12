
import ServerPage from './ServerPage';
import PropertyPage from './PropertyPage';
import ApplicationPage from './ApplicationPage';
import LoginPage from './LoginPage';
import React from "react";
import ProtectedRoute from '../components/ProtectedRoute';
import {
    Route, Switch
} from "react-router-dom";
const RouterPage = () => {
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <ProtectedRoute path="/application" component={ApplicationPage} />
            <ProtectedRoute path="/server" component={ServerPage} />
            <ProtectedRoute path="/property" component={PropertyPage} />
        </Switch>
    );
};
export default RouterPage;