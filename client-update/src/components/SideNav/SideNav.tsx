import React from "react";

import styles from "./SideNav.module.scss";

const SideNav = () => {

    return (
        <aside className={styles.aside}>
            <div>
                <p>
                    <span>
                        Mp
                    </span>
                </p>
            </div>
            <div>
                <p>
                    EXP
                </p>
                <p>
                    SD
                </p>
                <p>
                    CV
                </p>
                <p>
                    EDU
                </p>
                <p>
                    AT
                </p>
            </div>
            <div>
                <p>
                    Account
                </p>
            </div>
        </aside>
    );
}
export default SideNav;