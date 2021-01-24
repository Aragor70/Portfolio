import React, { Fragment, useEffect } from 'react';


import { withRouter } from 'react-router-dom';

const DS = ({ location, pageTitle, setPageTitle, match }: any) => {

    useEffect(() => {
        setPageTitle('data science')
    }, [])

    return (
        <Fragment>
            data science
        </Fragment>
            
    );
}
export default withRouter(DS);