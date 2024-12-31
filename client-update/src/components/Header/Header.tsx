import React, { Fragment, useContext } from 'react';

import leftArrow from '/assets/icons/left-arrow.png';
import dsBtn from '/assets/icons/ds.png';
import sdBtn from '/assets/icons/sd.png';
import cvBtn from '/assets/icons/cv.png';
import atBtn from '/assets/icons/at.png';

import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PageTitleContext } from '../../context/PageTitleContext';

interface HeaderTypes extends RouteComponentProps {}

const Header = ({ location: { pathname }, history }: HeaderTypes) => {

    const { pageTitle } = useContext(PageTitleContext);
    return (
        <Fragment>

            <div className='header-element'></div>
                        
                <header className='header-content'>

                    <div className="page-title">
                    <p>
                        {
                            pathname === "/" ? null : <Fragment>
                                <img src={leftArrow} style={{ width: "35px", marginRight: '7.5px' }} className="btn" onClick={() => history.goBack()} alt="leftArrow"  />
                                
                                {
                                    pathname.split('/')[1] === 'off' && <img src={sdBtn} style={{ width: "35px" , marginRight: '7.5px'}} alt="SD" />
                                }
                                {
                                    pathname.split('/')[1] === 'off' && <img src={dsBtn} style={{ width: "35px" , marginRight: '7.5px'}} alt="DS" />
                                }
                                {
                                    pathname.split('/')[1] === 'off' && <img src={cvBtn} style={{ width: "35px" , marginRight: '7.5px'}} alt="CV" />
                                }
                                {
                                    pathname.split('/')[1] === 'off' && <img src={atBtn} style={{ width: "35px" , marginRight: '7.5px'}} onClick={() => history.push('/')} alt="AT" />
                                }
                            </Fragment>
                        }
                        <span style={pageTitle === 'home' ? { cursor: 'pointer' } : {}}>{pageTitle}</span>
                    </p>
                        <LanguageSwitcher />
                    </div>
            </header>
        </Fragment>
            
    );
}
export default withRouter(Header);