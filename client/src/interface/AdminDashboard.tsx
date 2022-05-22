import React, { Fragment, useEffect, useRef, useState } from 'react';

import { withRouter } from 'react-router-dom';

import LanguageSwitcher from '../components/LanguageSwitcher';
import { Translate } from '../components/Translate';


const AdminDashboard = ({ history, setPageTitle }: any) => {

    useEffect(() => {
        setPageTitle('Admin Dashboard')

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])
    


    return (
        <Fragment>
            <div className="admin-dashboard">
                
                <div className="navi-buttons">
                    <div className="navi-button" onClick={() => history.push('/login')}>
                        <nav style={{ width: '100%' }}><Translate tKey="home.menu.login" /></nav>
                    </div>
                    <div className="navi-button" onClick={() => history.push('/register')}>
                        <nav style={{ width: '100%' }}><Translate tKey="home.menu.register" /></nav>
                    </div>
                </div>

            </div>
        </Fragment>
    );
}
export default withRouter(AdminDashboard);