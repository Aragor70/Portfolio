import React, { Fragment } from 'react';

import leftArrow from '../style/left-arrow.png';
import homeBtn from '../style/home.png';

import { withRouter } from 'react-router-dom';

const Header = ({ location, pageTitle, match, history }: any) => {

    // <img src={leftArrow} style={{ width: "55px", marginRight: '7.5px' }}  />

    return (
        <Fragment>
            <div className="page-title">
            <p>
                {
                    location.pathname === "/" ? null : <Fragment>
                        <img src={leftArrow} style={{ width: "55px", marginRight: '7.5px' }}  />
                        <img src={homeBtn} style={{ width: "55px" , marginRight: '7.5px'}} onClick={e=> history.push('/')} />
                    </Fragment>
                }
                <span>{pageTitle}</span>
            </p>
                <hr />
            </div>
        </Fragment>
            
    );
}
export default withRouter(Header);