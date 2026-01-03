import React, { Fragment, useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import clsx from 'clsx';

import '/src/styles/style.scss';
import '/src/style/sass/style.scss';
import '/src/style/sass/auth.scss';
import '/src/style/sass/admin.scss';

import Routing from './Routing';
import Footer from './components/Footer/Footer';
import setAuthToken from './utils/setAuthToken';
import SideNav from './components/SideNav/SideNav';
import { navigationButtons } from './utils/constant';
import Header from './components/common/Header/Header';
import { SettingsContext, SettingsContextType } from './context/SettingsContext';

import styles from "./Layout.module.scss";

const Layout = () => {
    useEffect(() => {
      if (localStorage?.token) {
        setAuthToken(localStorage.token);
      }
    }, [])

    const { menu } = useContext<SettingsContextType>(SettingsContext);
    const links = navigationButtons;

    return (
        <Fragment>
            <div className={clsx(styles.layout, {
                [styles.isMenuOpen]: menu.state
            })}>
                <Switch>
                    <Route render={({ location: { pathname } }) => pathname !== '/' && (
                        <Fragment>
                            <Header pathname={pathname} />
                            <SideNav links={links} />
                        </Fragment>
                    )} />
                </Switch>
                <main className="output">
                    <Routing />
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </Fragment>
    )
}
export default Layout;