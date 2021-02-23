import React, { Fragment, useState } from 'react';


import { Route, Switch, withRouter } from 'react-router-dom';
import AT from './interface/AT';
import CV from './interface/CV';
import DS from './interface/DS';
import Header from './interface/Header';
import Home from './interface/Home';
import SD from './interface/SD';

const App = ({ history }: any) => {

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
          
              <Route path="/software_development">
                <SD pageTitle={pageTitle} setPageTitle={setPageTitle} />
              </Route>
              <Route exact path="/data_science">
                <DS pageTitle={pageTitle} setPageTitle={setPageTitle} />
              </Route>
              <Route exact path="/curriculum_vitae">
                <CV pageTitle={pageTitle} setPageTitle={setPageTitle} />
              </Route>
              <Route exact path="/contact_mikolaj">
                <AT pageTitle={pageTitle} setPageTitle={setPageTitle} />
              </Route>

            
          </Switch>

        </main>
          
    </Fragment>
  );
}
export default withRouter(App);