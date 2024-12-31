import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

import textSvg from '/assets/icons/textIcon.svg'
import { Translate } from "../Translate/Translate";

import styles from "./ContactMe.module.scss";

const ContactMe = () => {

    const history = useHistory();

    return (
        <Fragment>
            <section className={styles.contactMe} onClick={() => history.push('/contact_mikolaj')}>
                <label>
                    <img src={textSvg} alt="contact-me" />
                </label>
                <span>
                    <Translate tKey="contact.me" />
                </span>
            </section>
        </Fragment>
    );
}
export default ContactMe;