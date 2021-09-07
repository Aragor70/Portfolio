import React, { Fragment, useEffect } from 'react';

import imgEngineers from '../style/icons/engineers.png';

import { withRouter } from 'react-router-dom';

const AT = ({ setPageTitle }: any) => {

    useEffect(() => {
        setPageTitle('Contact')

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])

    return (
        <Fragment>
            <div className="section-content">
                <div className="params">
                
                <p style={{ display: 'flex', justifyContent: "center" }}><img src={imgEngineers} /></p>

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