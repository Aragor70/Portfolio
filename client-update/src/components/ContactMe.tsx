import React, { Fragment } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import textSvg from '/assets/icons/textIcon.svg'
import { Translate } from "./Translate";

interface ContactMeType extends RouteComponentProps {}

const ContactMe = ({ history }: ContactMeType) => {


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