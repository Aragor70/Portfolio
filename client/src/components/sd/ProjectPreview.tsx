import React, { Fragment, useEffect, useState } from 'react';
import HtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import { Language } from '../../utils/constant';
import GithubStats from '../GithubStats';
import { Translate } from '../Translate';
/* 
import { ReactComponent as CommitSvg} from '../style/icons/code-commit-solid.svg'
import { ReactComponent as UpdateSvg} from '../style/icons/refresh-outline.svg'
import { ReactComponent as CreateSvg} from '../style/icons/create-outline.svg' */

const ProjectPreview = ( props: any ) => {

    const { languageCode = Language.ENGLISH } = props;
    const { style } = props;

    const [ text, setText ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ otherLngVersion, setOtherLngVersion ] = useState(false)


    useEffect(() => {

        const value = props?.languageVersions?.filter((element: any) => element.languageCode === languageCode)[0];

        setText(value?.text || '')
        setTitle(value?.title || '')

        if (!value && props.languageVersions?.length) {
            setOtherLngVersion(true)
        } else {
            setOtherLngVersion(false)
        }

    }, [languageCode, props.languageVersions])

    return (
        <Fragment>
            <article className={ style?.className || ''}>

                <div className="section-image">
                    {
                        !!props.images?.length && <img src={props?.images[0]?.name} alt={props.images[0]?.label} onError={(e: any) => {e.target.style.display = 'none'}} />
                    }
                    
                </div>
                <div className="params">

                    {
                        title && <h3 className="content-center"><span style={{ fontSize: '45px' }}>{title}</span></h3>
                    }
                    {
                        text && HtmlParser(text)
                    }
                    
                    {
                        (!props?.repos || (props?.loadingRepos || !props?.repositories[0])) ? null : <GithubStats repos={props?.repos} name={props.repositories[0]?.name} />
                    }

                    
                    {
                        otherLngVersion && <p style={{ color: 'orange' }}><Translate tKey='wrong.language.version' /></p>
                    }


                    <ul className="icons">
                        {
                            !!props.icons?.length && props?.icons?.map((element: any) => element.isFile ? <li key={element.id} className="icon"><img src={`/assets/icons/${element.name}`} alt={element.label} /><span>{element.label}</span></li> : <li className="icon"  key={element.id}><i className={element.name}></i><span>{element.label}</span></li>)
                        }
                    </ul>
                    
                    <ul className="more-about" >
                        {
                            !!props.name && <Link to={`/software_projects/${props.name}`}><Translate tKey='sd.project.link.show.details' /></Link>
                        }
                        {
                            !!props.repositories?.length && <li className="icon-box" onClick={() => window.open(props?.repositories[0]?.url, "_blank")}><i className="fas fa-code fa"></i></li>
                        }
                        {
                            !!props.website && <li className="icon-box" onClick={() => window.open(props.website, "_blank")}><i className="fab fa-chrome fa"></i></li>
                        }
                        
                    </ul>
                
                </div>
                
            </article>
        </Fragment>
    );
}
export default ProjectPreview;