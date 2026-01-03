import React from "react";
import clsx from "clsx";

import styles from "./NaviButton.module.scss";

interface NaviButtonProps {
    label: string,
    useCase: string,
    icon: any,
    onClick: any
}
const NaviButton = ({ label, useCase, icon, onClick }: NaviButtonProps) => {
    
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