import moment from 'moment';
import React, { Fragment } from 'react';

import { ReactComponent as CommitSvg} from '/assets/icons/code-commit-solid.svg'
import { ReactComponent as UpdateSvg} from '/assets/icons/refresh-outline.svg'
import { ReactComponent as CreateSvg} from '/assets/icons/create-outline.svg'

import styles from "./GithubStats.module.scss";

const GithubStats = ({ repos, name }: any) => {
    const repository : any = (repos.filter((element: any) => element?.name?.toLowerCase() === name?.toLowerCase()))[0] || null
    
    if (!repository) return null;
    
    return (
        <Fragment>
            <p className={styles.commits}>
                <span>
                    <CommitSvg /> <span>{repository?.commits?.length || 0} commits</span>
                </span>
            
                <span>
                    <CreateSvg /> { moment(repository?.created_at)?.format('DD-MM-YYYY') || ''}
                </span>
                {Boolean(repository?.commits?.length) && <span><UpdateSvg /> {moment(repository?.commits[0]?.commit?.author?.date).format('DD-MM-YYYY')}</span>}
            </p>
        </Fragment>
    );
}
export default GithubStats;