import React, { Fragment, useEffect } from 'react';


import { withRouter } from 'react-router-dom';

const DS = ({ location, pageTitle, setPageTitle, match }: any) => {

    useEffect(() => {
        setPageTitle('data science')
    }, [])

    return (
        <Fragment>
            <div className="section-content">
                <div className="params">
                
                I especially build statistic data analisis and algorithms. I share with you some data personal projects.
                Data Science analyses have been made to describe the business problem and get to know the right solution.
                


                </div>
            </div>
        </Fragment>
            
    );
}
export default withRouter(DS);