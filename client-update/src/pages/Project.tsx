import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import HtmlParser from 'react-html-parser';

import { Language } from '../utils/LanguageConfig';
import { getProject } from '../actions/project';
import ErrorResponse from '../components/ErrorResponse/ErrorResponse';
import GithubStats from '../components/GithubStats/GithubStats';
import Loading from '../components/Loading/Loading';
import { Translate } from '../components/Translate/Translate';
import { LanguageContext } from '../context/LanguageContext';
import Attacher from '../components/Attacher/Attacher';
  
type SingleRepository = {
    id?: number,
    name?: string,
    url?: string
}
export type SingleImage = {
    id: number,
    name?: string,
    url?: string,
    isFile?: boolean,
    label?: string
}

export type ProjectType = {
    id?: number,
    name?: string | null,
    status?: string | null,
    isVisible?: string | null,
    website?: string | null,
    images?: SingleImage[] | null,
    repositories?: SingleRepository[],
    repos?: SingleRepository[] | null,
    icons?: SingleImage[] | null,
    loadingRepos?: false | true
}

// eslint-disable-next-line
const Project = ({ match }: any) => {

    const [ project, setProject ] = useState<null | ProjectType>(null)
    
    const [ loadingProject, setLoadingProject ] = useState<boolean>(false)

    const [ errorResponse, setErrorResponse ] = useState('')

    const { languageCode } = useContext(LanguageContext);

    const [ title, setTitle ] = useState<string | null>(null);
    const [ text, setText ] = useState<string | null>(null);

    const [ otherLngVersion, setOtherLngVersion ] = useState(false)

    const header = useRef(null)
    
    const fadeInUpElement = useRef(null)

    useEffect(() => {

        (async() => {
            
            setLoadingProject(true)

            const project_name: string = match.params.project_name

            if (project_name) {
                const res = await getProject(project_name)

                if (typeof res === 'string') {
                
                    setLoadingProject(false)
                    return setErrorResponse(res)
                    
                }

                const value = await res?.languageVersions?.filter((element: { languageCode: Language }) => element.languageCode === languageCode)[0];

                setText(value?.text || '')
                setTitle(value?.title || '')

                if (!value && res?.languageVersions?.length) {
                    setOtherLngVersion(true)
                } else {
                    setOtherLngVersion(false)
                }

                setErrorResponse('')
                setProject(res)

            }
            
            setLoadingProject(false)

            
            
            
        })()

    }, [match.params.project_name, languageCode])
    
    useEffect(() => {

        (() => {
            if (!loadingProject && fadeInUpElement.current) {
                fadeInUpElement.current.classList.add("animated");
                fadeInUpElement.current.classList.add("fadeInUp");
                fadeInUpElement.current.classList.remove("no-opacity");
            }
        })()

    }, [loadingProject, fadeInUpElement])

    useEffect(() => {
        
        if (header?.current) header?.current?.scrollIntoView({ block: "start", inline: "nearest" })

    }, [header, match.params.project_name, loadingProject])


    if (loadingProject) return <Loading />;

    if (!project) return null;

    if (errorResponse) return <ErrorResponse message={errorResponse} />



    return (
        <Fragment>

            {/* 
            
            <article className="single-title">

                <h3><span style={{ fontSize: '45px' }}>{title || 'Title'}</span></h3>

            </article> */}

            
            
            {
                !!project?.images?.length && <div className="main-image" >{
                
                    project.images.map((element: SingleImage, index: number) => <Fragment key={index}>
                        <img className="grid-one" src={ '/assets/images/' + element?.name } alt={element?.name || "project-image 1"} />
                        <img className="grid-two" src={ '/assets/images/' + element?.name } alt={element?.name || "project-image 2" } />
                        <img className="grid-three" src={ '/assets/images/' + element?.name } alt={element?.name || "project-image 3"} />
                    </Fragment>)
                    
                }</div>
            }

            <Attacher filePath={"/assets/attachments/Mikolaj_Prus.pdf"} />


            <article className="single-content gap-single">
                
                <div className="section-image">
                
                    <label style={{ width: '100%', alignItems: 'center', display: 'flex' }}>
                        <img style={{ borderRadius: '25px', width: '50%', margin: '134px auto' }} src={ '/assets/images/' + project?.images[0]?.name } alt={project?.images[0]?.name || "project-logo 3"} />
                    </label>
                
                </div>
                <div ref={fadeInUpElement} className="no-opacity">

                    <h3><Translate tKey="project.section.project.name" /></h3>
                    
                    <h3><span style={{ fontSize: '45px' }}>{title || 'Title'}</span></h3>

                    <hr />
                    <h3><Translate tKey="project.section.project.description" /></h3>
                    {
                        text && HtmlParser(text)
                    }
                    <hr />

                    {
                        project?.loadingRepos ? <Fragment><h3><Translate tKey="project.section.project.repository" /></h3><Loading /></Fragment> : (!project?.repos || !project?.repositories[0]) ? null : <Fragment>
                            
                        <h3><Translate tKey="project.section.project.repository" /></h3>
                        {
                            <GithubStats repos={project?.repos} name={project.repositories[0]?.name} />
                        }

                        <hr />

                        </Fragment>
                    }

                    
                    {
                        otherLngVersion && <p style={{ color: 'orange' }}><Translate tKey='wrong.language.version' /></p>
                    }

                    
                    <h3><Translate tKey="project.section.project.icons" /></h3>
                    
                    <ul className="icons">
                        {
                            !!project.icons?.length && project?.icons?.map((element: SingleImage) => element.isFile ? <li key={element.id} className="icon"><img src={`/assets/icons/${element.name}`} alt={element.label} /><span>{element.label}</span></li> : <li className="icon"  key={element.id}><i className={element.name}></i><span>{element.label}</span></li>)
                        }
                    </ul>
                    
                    
                    <ul className="more-about">


                        {
                            !!project.repositories?.length && <li className="icon-box" onClick={() => window.open(project?.repositories[0]?.url, "_blank")}><i className="fas fa-code fa"></i></li>
                        }

                        {
                            !!project.website && <li className="icon-box" onClick={() => window.open(project.website, "_blank")}><i className="fab fa-chrome fa"></i></li>
                        }
                        
                    </ul>

                </div>
                
            </article>
                        
            

        </Fragment>
    );
}
export default withRouter(Project);