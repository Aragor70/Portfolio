import React from 'react';
import ContactMe from './ContactMe';




const Footer = ({ location }: any) => {



    return (
        <div>
            {
                location.pathname !== '/contact_mikolaj' && <ContactMe />
            }
            <p>© Nicolai 2021</p>
        </div>
    );
}
export default Footer;