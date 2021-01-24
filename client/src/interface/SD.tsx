import React, { Fragment, useEffect } from 'react';


import { withRouter } from 'react-router-dom';

const SD = ({ location, pageTitle, setPageTitle, match }: any) => {

    useEffect(() => {
        setPageTitle('sotfware development')
    }, [])

    return (
        <Fragment>
            sotfware development
        </Fragment>
            
    );
}
export default withRouter(SD);