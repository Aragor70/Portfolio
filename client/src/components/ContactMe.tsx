import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import textSvg from '../style/icons/textIcon.svg'
import { Translate } from "./Translate";

const ContactMe = ({ history }: any) => {


    return (
        <Fragment>
            <section className="contactMe" onClick={() => history.push('/contact_mikolaj')}>
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
export default withRouter(ContactMe);