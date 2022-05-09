import moment from 'moment';
import React, { Fragment } from 'react';

import { ReactComponent as CommitSvg} from '../style/icons/code-commit-solid.svg'
import { ReactComponent as UpdateSvg} from '../style/icons/refresh-outline.svg'
import { ReactComponent as CreateSvg} from '../style/icons/create-outline.svg'

const GithubStats = ({ repos, name }: any) => {

    const repository : any = (repos.filter((element: any) => element?.name === name))[0] || null
    
    if (!repository) return null;
    console.log(repository?.created_at)
    return (
        <Fragment>
            <p className="commits">
                <span>
                    <CommitSvg /> <span>{repository?.commits?.length || 0} commits</span>
                </span>
            
                <span>
                    <CreateSvg /> { moment(repository?.created_at)?.format('DD-MM-YYYY') || ''}
                </span>
                {!!repository?.commits?.length && <span><UpdateSvg /> {moment(repository?.commits[0]?.commit?.author?.date).format('DD-MM-YYYY')}</span>}
            </p>
        </Fragment>
    );
}
export default GithubStats;