import React, { Fragment, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Translate } from '../components/Translate/Translate';
import { PageTitleContext } from '../context/PageTitleContext';

// eslint-disable-next-line
const AdminDashboard = ({ history }: any) => {
    const { setPageTitle } = useContext(PageTitleContext);
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
                            <nav><Translate tKey="label.menu.login" /></nav>
                        </div>
                        <div className="navi-button" onClick={() => history.push('/register')}>
                            <nav><Translate tKey="label.menu.register" /></nav>
                        </div>
                    </div>
            </div>
        </Fragment>
    );
}
export default withRouter(AdminDashboard);