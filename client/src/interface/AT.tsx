import React, { Fragment, useEffect } from 'react';


import { withRouter } from 'react-router-dom';

const AT = ({ location, pageTitle, setPageTitle, match }: any) => {

    useEffect(() => {
        setPageTitle('contact')
    }, [])

    return (
        <Fragment>
            contact
        </Fragment>
            
    );
}
export default withRouter(AT);