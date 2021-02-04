import React, { Fragment, useEffect } from 'react';


import { withRouter } from 'react-router-dom';

const AT = ({ location, pageTitle, setPageTitle, match }: any) => {

    useEffect(() => {
        setPageTitle('contact')

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])

    return (
        <Fragment>
            <div className="section-content">
                <div className="params">
                
                <p>Text me</p>
                    mikey.prus@gmail.com
                
                <p>in : www.linkedin.com/in/mikolaj-prus</p>
                <p>hr : www.hackerrank.com/mikey_prus</p>
                    


                </div>
            </div>
        </Fragment>
            
    );
}
export default withRouter(AT);