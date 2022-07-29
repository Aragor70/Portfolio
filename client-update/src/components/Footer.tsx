import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ContactMe from './ContactMe';


const Footer = () => {

    return (
        <div>
            <Switch>
                <Route render={({ location }) => location.pathname !== '/contact_mikolaj' && <ContactMe />} />
            </Switch>

            <p>&#169; Nicolai 2021</p>
        </div>
    );
}
export default Footer;