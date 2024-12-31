import React from "react";
import clsx from "clsx";

import styles from "./NaviButton.module.scss";

const NaviButton = ({ label, useCase, icon, onClick }: any) => {

    
    return (
        <div className={clsx(styles.naviButton, {
            [styles[useCase]]: useCase
        })} onClick={onClick}>
            <img src={icon} alt={useCase} />
            <nav>{label}</nav>
        </div>
    )
}
export default NaviButton;