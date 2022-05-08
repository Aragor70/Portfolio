import moment from 'moment';
import React, { Fragment } from 'react';

import { ReactComponent as CommitSvg} from '../style/icons/code-commit-solid.svg'

const GithubStats = ({ repos, name }: any) => {

    const repository : any = (repos.filter((element: any) => element?.name === name))[0] || null
    
    if (!repository) return null;

    return (
        <Fragment>
            <p className="commits">
                <CommitSvg /> <span>{repository?.commits?.length || 0} commits</span>
            </p>
            <p>
                <i className="fas fa-calendar-plus"></i> ver.{ moment(repository?.commits[0]?.commit?.author?.date).format('DD-MM-YYYY') || 'None'}
            </p>
        </Fragment>
    );
}
export default GithubStats;