import React, { Fragment, useEffect } from 'react';


import { withRouter } from 'react-router-dom';
import { Translate } from '../components/Translate';

const CV = ({ setPageTitle }: any) => {

    useEffect(() => {
        setPageTitle(<Translate tKey="home.menu.skills" />)
        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])

    return (
        <Fragment>
            <div className="section-content">
                <div className="params">
                <h3><Translate tKey="cv.sections.summary.title" /></h3>
                    <Translate tKey="cv.sections.summary.text" />
                </div>

                <div className="params">
                <h3><Translate tKey="cv.sections.tech.title" /></h3>
                    <Translate tKey="cv.sections.tech.text" />
                
                </div>
                <div className="params">
                <h3><Translate tKey="cv.sections.languages.title" /></h3>
                    <Translate tKey="cv.sections.languages.text" />
                    
                <h3><Translate tKey="cv.sections.services.title" /></h3>
                    <Translate tKey="cv.sections.services.text" />

                </div>
            </div>
        </Fragment>
            
    );
}
export default withRouter(CV);