import React from 'react';
import { Route, Switch, withRouter, useRouteMatch, BrowserRouter as Router } from 'react-router-dom';
import Project from './Project';
import EducationPresentation from '../components/education/EducationPresentation/EducationPresentation';

const Education = () => {
    
    const { path } = useRouteMatch();
    return (
        <Router>
            <Switch>
                <Route exact path={`${path}/:project_name`}>
                    <Project />
                </Route>
                <Route exact path={path}>
                    <EducationPresentation />
                </Route>
            </Switch>
        </Router>
            
    );
}
export default withRouter(Education);