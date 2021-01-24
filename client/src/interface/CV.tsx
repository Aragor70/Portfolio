import React, { Fragment, useEffect } from 'react';


import { withRouter } from 'react-router-dom';

const CV = ({ location, pageTitle, setPageTitle, match }: any) => {

    useEffect(() => {
        setPageTitle('curriculum vitae')
    }, [])

    return (
        <Fragment>
            curriculum vitae
        </Fragment>
            
    );
}
export default withRouter(CV);