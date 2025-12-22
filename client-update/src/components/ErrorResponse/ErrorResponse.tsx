import clsx from 'clsx';
import React, { Fragment } from 'react';
import { Translate } from '../Translate/Translate';
/* 
import { ReactComponent as CommitSvg} from '../style/icons/code-commit-solid.svg'
import { ReactComponent as UpdateSvg} from '../style/icons/refresh-outline.svg'
import { ReactComponent as CreateSvg} from '../style/icons/create-outline.svg' */
import styles from "./ErrorResponse.module.scss";
const ErrorResponse = ( props: any ) => {
    const { style } = props;
    const { message } = props;
    return (
        <Fragment>
            <article className={style?.className} style={{ ...style?.css, display: 'flex' }}>
                
                <div className={clsx(styles.param, styles.textCenter, styles.noShadow)}>
                    <Translate tKey={message} />
                </div>
            </article>
        </Fragment>
    );
}
export default ErrorResponse;