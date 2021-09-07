import React, { Fragment, useEffect } from 'react';


import { withRouter } from 'react-router-dom';

const DS = ({ setPageTitle }: any) => {

    useEffect(() => {
        setPageTitle('data science')

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])

    return (
        <Fragment>
            <div className="section-content">
                <div className="params">
                
                I learn data processing to build data analisis.
                Data Science analysis have been made to describe the business problem and get to know the right solution.
                


                </div>
            </div>
        </Fragment>
            
    );
}
export default withRouter(DS);