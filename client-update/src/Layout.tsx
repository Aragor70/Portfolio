import React, { Fragment, useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';

import Footer from './components/Footer';

import Header from './components/Header';
import Routing from './Routing';

import setAuthToken from './utils/setAuthToken';

import './style/sass/front.scss';
import '/src/style/sass/style.scss'
import '/src/style/sass/header.scss';
import '/src/style/sass/section.scss';
import '/src/style/sass/contact.scss';
import '/src/style/sass/auth.scss';
import '/src/style/sass/timeline.scss';
import '/src/style/sass/filterElement.scss';
import '/src/style/sass/admin.scss';
import '/src/style/sass/contact-me.scss';
import '/src/style/sass/aside.scss';
import '/src/style/sass/attacher.scss';

const Layout = () => {

  
    useEffect(() => {
      if (localStorage?.token) {
        setAuthToken(localStorage.token);
      }
    }, [])


    return (
        <Fragment>

            <Switch>
                <Route render={({ location: { pathname } }) => pathname !== '/' && <Header />} />
            </Switch>

            <main className="output">
                
                <Routing />

            </main>
            <footer>
                <Footer />
            </footer>

        </Fragment>
    )
}
export default Layout;