import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import logo from "/assets/images/logo.png";

import { SettingsContext, SettingsContextType } from "../../context/SettingsContext";
import { Translate } from "../Translate/Translate";

import styles from "./SideNav.module.scss";
import useWindowSize from "../../hooks/useWindowSize";

const SideNav = ({ links }: any) => {

    const history = useHistory();
    const { width } = useWindowSize();

    const { menu } = useContext<SettingsContextType>(SettingsContext);

    useEffect(() => {

        if (width >= 1023) {
            menu.setState(true)
        }
        
        return () => {
            if (width < 1023) {
                menu.setState(false)
            }
        }
    }, []) 

    if (!menu.state) return null;

    return (
        <aside className={styles.aside}>
            <header className={styles.aside__header}>
                <div className={styles.aside__header__pageTitle}>
                    <div>
                        <label className={styles.menuButton} onClick={() => {
                            menu.setState(!menu.state)
                        }}>
                            <span><Translate tKey={"label.menu.close"} /></span><i className="fas fa-times"></i>
                        </label>
                    </div>
                </div>
            </header>
            <div className={styles.aside__content}>
                <div className={styles.naviButtons}>
                    {links.map(({ path, icon, name }) => (
                        <div key={path} onClick={() => history.push(path)}>
                            <nav><Translate tKey={`label.${name}`} /></nav>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
export default SideNav;