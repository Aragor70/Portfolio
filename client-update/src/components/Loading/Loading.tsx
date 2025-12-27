import React from "react";
import { Translate } from "../Translate/Translate";

import styles from "./Loading.module.scss";

const Loading = () => 
    <div className={styles.loading}>
        <h2>
            <Translate tKey="loading" />
        </h2>
    </div>
export default Loading;