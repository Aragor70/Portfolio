import React, { Fragment, useContext } from 'react';

import leftArrow from '../style/left-arrow.png';/* 
import homeBtn from '../style/home.png';
 */
import dsBtn from '../style/ds.png';
import sdBtn from '../style/sd.png';
import cvBtn from '../style/cv.png';
import atBtn from '../style/at.png';

import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';
import { withRouter } from 'react-router-dom';
import { PageTitleContext } from '../context/PageTitleContext';

const Header = ({ location: { pathname }, history }: any) => {

    // <img src={leftArrow} style={{ width: "55px", marginRight: '7.5px' }}  />

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
                        <hr />
                    </div>
            </header>
        </Fragment>
            
    );
}
export default withRouter(Header);