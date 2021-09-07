import React, { Fragment, useState } from 'react';


import { Route, Switch, withRouter } from 'react-router-dom';
import AT from './interface/AT';
import CV from './interface/CV';
/* import DS from './interface/DS'; */
import Education from './interface/Education';
import Experience from './interface/Experience';
import Header from './interface/Header';
import Home from './interface/Home';
import SD from './interface/SD';

const App = () => {

  const [pageTitle, setPageTitle] = useState('')

  return (
    <Fragment>
        
        <header className="header-content">

          <Header pageTitle={pageTitle} setPageTitle={setPageTitle} />
        
        </header>

        
        <main className="output">
          <Switch>
            <Route exact path="/">
              <Home pageTitle={pageTitle} setPageTitle={setPageTitle} />
            </Route>
            <Route path="/work_experience">
              <Experience pageTitle={pageTitle} setPageTitle={setPageTitle} />
            </Route>
            <Route exact path="/education">
              <Education pageTitle={pageTitle} setPageTitle={setPageTitle} />
            </Route>
            <Route exact path="/software_projects">
              <SD pageTitle={pageTitle} setPageTitle={setPageTitle} />
            </Route>
            <Route exact path="/skills">
              <CV pageTitle={pageTitle} setPageTitle={setPageTitle} />
            </Route>
            <Route exact path="/contact_mikolaj">
              <AT pageTitle={pageTitle} setPageTitle={setPageTitle} />
            </Route>

            
          </Switch>

        </main>
        <footer>
          <p>© Nicolai 2021</p>
        </footer>
          
    </Fragment>
  );
}
export default withRouter(App);