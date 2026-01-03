import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import _ from "lodash";

import logo from "/assets/images/logo.png";

import { SettingsContext, SettingsContextType } from "../../context/SettingsContext";
import { Translate } from "../Translate/Translate";

import styles from "./SideNav.module.scss";
import useWindowSize from "../../hooks/useWindowSize";

const SideNav = ({ links }: any) => {

    const history = useHistory();
    const location = useLocation();
    const { width } = useWindowSize();

    const { menu } = useContext<SettingsContextType>(SettingsContext);

    useEffect(() => {

        if (width >= 1023) {
            menu.setState(true)
        }
        
        return () => {
        menu.setState(false)
        }
    }, []) 

    if (!menu.state) return null;

    return (
        <aside className={styles.aside}>
            <div className={styles.aside__wrapper}>
                <div>
                    <p>
                        <img src={logo} />
                    </p>
                </div>
                <div>
                    {
                        _.map(links, element => (
                            <p key={element.path} style={location.pathname === element.path ? { color: "lightblue" } : {}} onClick={() => {
                                history.push(element.path)
                                menu.setState(false)
                            }}><Translate tKey={`label.${element.name}`} /></p>
                        ))
                    }
                </div>
                <div>
                    <p>
                        <button className={styles.closeButton} onClick={() => menu.setState(false)}>
                            <span className={styles.icon}><i className="fas fa-times fa-2x"></i><span>Close navigation</span></span>
                        </button>
                    </p>
                </div>
            </div>
        </aside>
    );
}
export default SideNav;