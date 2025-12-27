import Attacher from "@/components/Attacher/Attacher";
import Loading from "@/components/Loading/Loading";
import { Translate } from "@/components/Translate/Translate";
import HtmlParser from 'react-html-parser';
import React, { Fragment } from "react";
import clsx from "clsx";

import { ProjectType, SingleImage } from "../../../types/Project";
import GithubStats from "../../GithubStats/GithubStats";

import styles from "./Presentation.module.scss";

interface SingleProjectPresentationProps extends ProjectType {
    pageTitle: string,
    pageMessage?: string,
    otherLngVersion: boolean,
    fadeInUpElement: any
}
const SingleProjectPresentation = ({ pageTitle, pageMessage, otherLngVersion, fadeInUpElement, ...project }: SingleProjectPresentationProps) => {

    return (
        <Fragment>
            {
                Boolean(project?.images?.length) && <div className={styles.mainImage} >{
                
                    project.images.map((element: SingleImage, index: number) => <Fragment key={index}>
                        <img className={styles.gridOne} src={ '/assets/images/' + element?.name } alt={element?.name || "project-image 1"} />
                        <img className={styles.gridTwo} src={ '/assets/images/' + element?.name } alt={element?.name || "project-image 2" } />
                        <img className={styles.gridThree} src={ '/assets/images/' + element?.name } alt={element?.name || "project-image 3"} />
                    </Fragment>)
                    
                }</div>
            }
            <Attacher filePath={"/assets/attachments/Mikolaj_Prus.pdf"} />
            <article className={clsx(styles.singleContent, styles.gapSingle)}>
                
                <div className={styles.sectionImage}>
                    <label style={{ width: '100%', alignItems: 'center', display: 'flex' }}>
                        <img style={{ borderRadius: '25px', width: '50%', margin: '134px auto' }} src={ '/assets/images/' + project?.images[0]?.name } alt={project?.images[0]?.name || "project-logo 3"} />
                    </label>
                </div>
                <div ref={fadeInUpElement} className={styles.noOpacity}>
                    <h3><Translate tKey="project.section.project.name" /></h3>
                    
                    <h3><span style={{ fontSize: '45px' }}>{pageTitle}</span></h3>
                    <hr />
                    <h3><Translate tKey="project.section.project.description" /></h3>
                    {
                        Boolean(pageMessage) && HtmlParser(pageMessage)
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
                        Boolean(otherLngVersion) && <p style={{ color: 'orange' }}><Translate tKey='wrong.language.version' /></p>
                    }
                    
                    <h3><Translate tKey="project.section.project.icons" /></h3>
                    
                    <ul className={styles.icons}>
                        {
                            Boolean(project.icons?.length) && project?.icons?.map((element: SingleImage) => element.isFile ? <li key={element.id} className={styles.icon}><img src={`/assets/icons/${element.name}`} alt={element.label} /><span>{element.label}</span></li> : <li className={styles.icon}  key={element.id}><i className={element.name}></i><span>{element.label}</span></li>)
                        }
                    </ul>
                    <ul className={styles.moreAbout}>

                        {
                            Boolean(project.repositories?.length) && <li className={styles.iconBox} onClick={() => window.open(project?.repositories[0]?.url, "_blank")}><i className="fas fa-code fa"></i></li>
                        }
                        {
                            Boolean(project.website) && <li className={styles.iconBox} onClick={() => window.open(project.website, "_blank")}><i className="fab fa-chrome fa"></i></li>
                        }
                        
                    </ul>
                </div>
                
            </article>
                        
        </Fragment>
    )
}
export default SingleProjectPresentation;