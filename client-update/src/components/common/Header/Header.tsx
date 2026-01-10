import React, { Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import leftArrow from '/assets/icons/left-arrow.png';
import dsBtn from '/assets/icons/ds.png';
import sdBtn from '/assets/icons/sd.png';
import cvBtn from '/assets/icons/cv.png';
import atBtn from '/assets/icons/at.png';
import { PageTitleContext } from '../../../context/PageTitleContext';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher';
import { SettingsContext, SettingsContextType } from '../../../context/SettingsContext';

import styles from "./Header.module.scss";
import { Translate } from '../../Translate/Translate';

const Header = ({pathname}: any) => {
    const { pageTitle } = useContext(PageTitleContext);
    const history = useHistory();

    const { menu } = useContext<SettingsContextType>(SettingsContext);

    return (
        <Fragment>
            <header className={styles.headerContent}>
                <div className={styles.pageTitle}>
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
                {
                    !menu.state && (
                        <label className={styles.menuButton} onClick={() => {
                            menu.setState(true)
                        }}>
                            <span><Translate tKey={"label.menu.open"} /></span><i className="fas fa-bars"></i>
                        </label>
                    )
                }
                </div>
            </header>
        </Fragment>
            
    );
}
export default Header