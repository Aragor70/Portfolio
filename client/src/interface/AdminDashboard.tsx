import React, { Fragment, useEffect } from 'react';

import { withRouter } from 'react-router-dom';

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
                
                    <div className="navi-buttons box3">
                        <div className="navi-button" onClick={() => history.push('/login')}>
                            <nav><Translate tKey="home.menu.login" /></nav>
                        </div>
                        <div className="navi-button" onClick={() => history.push('/register')}>
                            <nav><Translate tKey="home.menu.register" /></nav>
                        </div>
                    </div>

            </div>
        </Fragment>
    );
}
export default withRouter(AdminDashboard);