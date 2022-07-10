import { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './auth/Login';
import Register from './auth/Register';
import ScrollTopButton from './components/ScrollTopButton';
import SocialMediaGroup from './components/SocialMediaGroup';

import AdminDashboard from './interface/AdminDashboard';
import AT from './interface/AT';
import CV from './interface/CV';
/* import DS from './interface/DS'; */
import Education from './interface/Education';
import Experience from './interface/Experience';

import Home from './interface/Home';
import Messages from './interface/Messages';
import SD from './interface/SD';

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