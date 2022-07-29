import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ScrollTopButton from './components/ScrollTopButton';
import SocialMediaGroup from './components/SocialMediaGroup';

import AdminDashboard from './pages/AdminDashboard';
import AT from './pages/AT';
import CV from './pages/CV';
/* import DS from './interface/DS'; */
import Education from './pages/Education';
import Experience from './pages/Experience';

import Home from './pages/Home';
import Messages from './pages/Messages';
import SD from './pages/SD';

const Routing = () => {


    return (
        <Fragment>
            <Switch>
                <Route exact path="/">
                    <Home />
                    <SocialMediaGroup />
                </Route>
                <Route path="/work_experience">
                    <Experience />
                </Route>
                <Route exact path="/education">
                    <Education />
                </Route>
                <Route path="/software_projects">
                    <SD />
                </Route>
                <Route exact path="/skills">
                    <CV />
                </Route>
                <Route exact path="/contact_mikolaj">
                    <AT />
                </Route>
                <Route exact path="/messages">
                    <Messages />
                </Route>
                
                <Route exact path="/admin">
                    <AdminDashboard />
                </Route>

                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>

                    
            </Switch>
            
            <Switch>
                <Route render={({ location }) => location.pathname !== '/' && <ScrollTopButton />} />
            </Switch>
        </Fragment>
    )
}
export default Routing;