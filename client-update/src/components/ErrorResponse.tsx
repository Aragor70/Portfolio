import React, { Fragment } from 'react';
import { Translate } from './Translate';

/* 
import { ReactComponent as CommitSvg} from '../style/icons/code-commit-solid.svg'
import { ReactComponent as UpdateSvg} from '../style/icons/refresh-outline.svg'
import { ReactComponent as CreateSvg} from '../style/icons/create-outline.svg' */

const ErrorResponse = ( props: any ) => {

    const { style } = props;
    const { message } = props;


    return (
        <Fragment>
            <article className={ style?.className || '' } style={{ ...style?.css, display: 'flex' }}>
                
                <div className="params" style={{ textAlign: 'center' }}>
                    <Translate tKey={message} />
                </div>
            </article>
        </Fragment>
    );
}
export default ErrorResponse;