import { Fragment, useContext, useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';

import Footer from './components/Footer';
import Uploader from './components/Uploader';
import { UserContext } from './context/UserContext';

import Header from './interface/Header';
import Routing from './Routing';

import setAuthToken from './utils/setAuthToken';
/* import SideNav from './components/SideNav'; */


const Layout = () => {

    const { user } = useContext(UserContext)

  
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
                
                {
                    user && <div style={{ position: 'fixed', top: 0, left: '30px', zIndex: 1000 }}>YOU ARE LOGGED IN</div>
                }
                
                <Routing />

            </main>
            <footer>
                <Footer />
            </footer>

        </Fragment>
    )
}
export default Layout;