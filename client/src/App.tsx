import React, { Fragment, useEffect, useRef, useState } from 'react';


import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import AT from './interface/AT';
import CV from './interface/CV';
/* import DS from './interface/DS'; */
import Education from './interface/Education';
import Experience from './interface/Experience';
import Header from './interface/Header';
import Home from './interface/Home';
import Messages from './interface/Messages';
import SD from './interface/SD';

import { handleScrollToTop } from './utils/autoHandlers';

const App = ({ location }: any) => {

  const [pageTitle, setPageTitle] = useState('')

  const scrollTo = useRef<any>(null)
  const scrollButton = useRef<any>(null)

  const handleScroll = () => {
      const position = window.pageYOffset;

      if (position > 150 && scrollButton.current) {
        scrollButton.current.style.opacity = '1';
      } else if (position <= 150 && scrollButton.current) {
        scrollButton.current.style.opacity = '0';
      }
  };
  
  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return (
    <Fragment>
        
        <header className="header-content">

          <Header pageTitle={pageTitle} setPageTitle={setPageTitle} />
        
        </header>
        
        
        <main className="output" ref={scrollTo}>
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
            <Route exact path="/login">
              <Login pageTitle={pageTitle} setPageTitle={setPageTitle} />
            </Route>
            <Route exact path="/register">
              <Register pageTitle={pageTitle} setPageTitle={setPageTitle} />
            </Route>
            <Route exact path="/messages">
              <Messages pageTitle={pageTitle} setPageTitle={setPageTitle} />
            </Route>

            
          </Switch>
          {
            location.pathname === "/" ? <Fragment>
              <ul className="pop-up" style={{ opacity: '1' }}>
                <li>
                    <div className="icon-box" onClick={() => window.open("https://www.linkedin.com/in/mikolaj-prus", "_blank")}><i className="fab fa-linkedin fa-2x"></i></div>
                </li>
                <li>
                    <div className="icon-box" onClick={() => window.open("https://github.com/Aragor70", "_blank")}><i className="fab fa-github-square fa-2x"></i></div>
                </li>
              </ul>
            </Fragment> : <Fragment>
              <ul className="scroll-up" ref={scrollButton}>
                <li>
                    <div className="icon-box" onClick={() => handleScrollToTop(window)}><i className="fas fa-angle-double-up fa-3x"></i></div>
                </li>
              </ul>
            </Fragment>
          }
        </main>
        <footer>
          <p>© Nicolai 2021</p>
        </footer>
          
    </Fragment>
  );
}
export default withRouter(App);