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
                
                <p style={{ display: 'flex', justifyContent: "center" }}><img src={imgEngineers} alt="engineer" /></p>

                <p>Text me</p>
                    mikey.prus@gmail.com
                <p>
                    
                <div className="icon-box" onClick={() => window.open("https://www.linkedin.com/in/mikolaj-prus", "_blank")}><i className="fab fa-linkedin fa-2x"></i></div>
                </p>

                </div>
            </div>
        </Fragment>
            
    );
}
export default withRouter(AT);