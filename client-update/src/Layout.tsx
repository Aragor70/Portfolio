import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/common/Header/Header';
import Routing from './Routing';
import setAuthToken from './utils/setAuthToken';

import '/src/styles/style.scss';
import '/src/style/sass/style.scss';
import '/src/style/sass/auth.scss';
import '/src/style/sass/admin.scss';

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