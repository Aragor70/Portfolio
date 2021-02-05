import React, { Fragment } from 'react';

import leftArrow from '../style/left-arrow.png';
import homeBtn from '../style/home.png';

import dsBtn from '../style/ds.png';
import sdBtn from '../style/sd.png';
import cvBtn from '../style/cv.png';
import atBtn from '../style/at.png';


import { withRouter } from 'react-router-dom';

const Header = ({ location: { pathname}, pageTitle, match, history }: any) => {

    // <img src={leftArrow} style={{ width: "55px", marginRight: '7.5px' }}  />

    return (
        <Fragment>
            <div className="page-title">
            <p>
                {
                    pathname === "/" ? null : <Fragment>
                        <img src={leftArrow} style={{ width: "35px", marginRight: '7.5px' }} className="btn" onClick={e=> history.goBack()} alt="leftArrow"  />
                        
                        {
                            pathname.split('/')[1] === 'software_development' && <img src={sdBtn} style={{ width: "35px" , marginRight: '7.5px'}} alt="SD" />
                        }
                        {
                            pathname.split('/')[1] === 'data_science' && <img src={dsBtn} style={{ width: "35px" , marginRight: '7.5px'}} alt="DS" />
                        }
                        {
                            pathname.split('/')[1] === 'curriculum_vitae' && <img src={cvBtn} style={{ width: "35px" , marginRight: '7.5px'}} alt="CV" />
                        }
                        {
                            pathname.split('/')[1] === 'contact_mikolaj' && <img src={atBtn} style={{ width: "35px" , marginRight: '7.5px'}} onClick={e=> history.push('/')} alt="AT" />
                        }
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