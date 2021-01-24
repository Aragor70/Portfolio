import React, { Fragment } from 'react';


import { withRouter } from 'react-router-dom';

const Header = ({ location, pageTitle, match }: any) => {

    

    return (
        <Fragment>
            <div className="page-title">
                {
                    location.pathname === "/" ? null : <Fragment>
                        back, home
                    </Fragment>
                }
                <p>{pageTitle}</p>
                <hr />
            </div>
        </Fragment>
            
    );
}
export default withRouter(Header);