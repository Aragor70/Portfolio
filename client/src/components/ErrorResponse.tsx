import React, { Fragment, useEffect, useState } from 'react';
import HtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import { Language } from '../utils/constant';
import { Translate } from './Translate';

/* 
import { ReactComponent as CommitSvg} from '../style/icons/code-commit-solid.svg'
import { ReactComponent as UpdateSvg} from '../style/icons/refresh-outline.svg'
import { ReactComponent as CreateSvg} from '../style/icons/create-outline.svg' */

const ErrorResponse = ( props: any ) => {

    const { languageCode = Language.ENGLISH } = props;
    const { style } = props;
    const { message } = props;


    return (
        <Fragment>
            <article className={ style?.className || '' } style={{ ...style?.css }}>
                
                <div className="params" style={{ textAlign: 'center' }}>
                    <Translate tKey={message} />
                </div>
            </article>
        </Fragment>
    );
}
export default ErrorResponse;