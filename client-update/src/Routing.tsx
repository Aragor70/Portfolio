import React, { Fragment, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from './components/Loading/Loading';
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const ScrollTopButton = React.lazy(() => import('./components/ScrollTopButton/ScrollTopButton'));
const SocialMediaGroup = React.lazy(() => import('./components/SocialMediaGroup/SocialMediaGroup'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const AT = React.lazy(() => import('./pages/AT'));
const Education = React.lazy(() => import('./pages/Education'));
const Experience = React.lazy(() => import('./pages/Experience'));
const Home = React.lazy(() => import('./pages/Home'));
const Messages = React.lazy(() => import('./pages/Messages'));
const SD = React.lazy(() => import('./pages/SD'));
const CV = React.lazy(() => import('./pages/CV'));

/* import DS from './interface/DS'; */

const Routing = () => {

    return (
        <Fragment>
            <Suspense fallback={<Loading />}>
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
            </Suspense>
        </Fragment>
    )
}
export default Routing;