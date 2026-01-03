import React, { useContext, useEffect, useRef, useState, Fragment } from 'react';
import ReactDOM from 'react-dom/server';
import clsx from 'clsx';

import gdansk1 from '/assets/images/gdansk1.jpg';
import koszalin1 from '/assets/images/koszalin1.jpg';
import { Translate } from '../../Translate/Translate';
import FilterElement from '../../FilterElement/FilterElement';
import { SettingsContext } from '../../../context/SettingsContext';
import ErrorResponse from '../../ErrorResponse/ErrorResponse';
import Loading from '../../Loading/Loading';
import ListPreview from '../../preview/ListPreview/ListPreview';
import { getEducations } from '../../../actions/education';
import ProjectPreview from '../../preview/ProjectPreview/ProjectPreview';
import { PageTitleContext } from '../../../context/PageTitleContext';
import { Language } from '../../../utils/LanguageConfig';
import Attacher from '../../Attacher/Attacher';
import EducationsTemplate from '../../../documents/EducationsTemplate';

import styles from "./EducationPresentation.module.scss";

const EducationPresentation = () => {
    const { setPageTitle } = useContext(PageTitleContext);
    useEffect(() => {
        setPageTitle(<Translate tKey="label.menu.education" />)
        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])
    
    const { language: {state: languageCode} } = useContext<{ language: {state: Language} }>(SettingsContext);
    const [loadingProjects, setLoadingProjects] = useState<boolean>(false)
    const [projects, setProjects] = useState([])
    const [errorResponse, setErrorResponse] = useState('')
    
    useEffect(() => {
        (async() => {
            setLoadingProjects(true)
            const res = await getEducations({ isVisible: true })
            if (typeof res === 'string') {
                setLoadingProjects(false)
                return setErrorResponse(res)
            }
            setErrorResponse('')
            setProjects(res)
            setLoadingProjects(false)
        })()
        return () => {
            setProjects([])
        }
    }, [languageCode])
    
    const fadeInUpElement = useRef(null)
    useEffect(() => {
        if (fadeInUpElement.current) {
            fadeInUpElement.current.classList.add(styles.animated)
            fadeInUpElement.current.classList.add(styles.fadeInUp)
            fadeInUpElement.current.classList.remove(styles.noOpacity)
        }
    }, [fadeInUpElement])
    return (
        <div className={styles.sectionContent}>
            <Attacher
                htmlFile={ReactDOM.renderToString(<EducationsTemplate projects={projects} />)}
                fileName="Education-Mikolaj_Prus.pdf"
            />
            
            <article>
                <div></div>
                <div className={clsx(styles.param, styles.noOpacity)} ref={fadeInUpElement}>
                    <p>
                        <Translate tKey="sd.overview" />
                    </p>
                </div>
            </article>
            <FilterElement languageCode={languageCode} setProjects={setProjects} loadValues={getEducations} />
                
            {
                loadingProjects ? <Loading /> : errorResponse ? <ErrorResponse message={errorResponse} style={{ css: { color: 'red' }}} /> : projects.length ? <Fragment>
                    <ListPreview status="current" title={<Translate tKey="education.section.current.headline" />} list={projects} Component={ProjectPreview} />
                    <ListPreview status="completed" title={<Translate tKey="education.section.completed.headline" />} list={projects} Component={ProjectPreview} />
                </Fragment> : (
                    <p className={styles.smallCenter}>
                        <Translate tKey="education.notfound" />
                    </p>
                )
            }
            <article>
                <div className={styles.sectionImage}>
                    <img src={gdansk1} alt="projects_image" />
                </div>
                <div className={styles.param}>
                <h3 className="content-center"><span style={{ fontSize: '45px', textAlign: 'left' }}>Computer science and econometrics, Master's degree </span></h3>
                    
                    <p>University of Gdansk, Poland 09/2017 {"–"} 03/2022</p>
                    <p>A combination of solid theoretical foundations in terms of mathematics and computer science. The study program is constantly consulted with employers from the IT industry.</p>
                    
                    <ul className={styles.icons}>
                    </ul>
                    <ul className={styles.moreAbout}>
                        <li className={styles.iconBox} onClick={() => window.open("https://en.ug.edu.pl/", "_blank")}><i className="fab fa-chrome fa"></i></li>
                    </ul>
                
                </div>
            
                <div className={styles.sectionImage}>
                    <img src={koszalin1} alt="projects_image" />
                </div>
                <div className={styles.param}>
                <h3 className="content-center"><span style={{ fontSize: '45px', textAlign: 'left' }}>Economy and real estate management, Bachelor's degree</span></h3>
                    
                    <p>University of Technology Koszalin, Poland 03/2013 {"–"} 09/2017</p>
                    <p>Economics and mathematics science, Real estate appraisal, consultancy, trading and brokerage, and management.</p>
                    
                    <ul className={styles.icons}>
                    </ul>
                    <ul className={styles.moreAbout} >
                        <li className={styles.iconBox} onClick={() => window.open("https://tu.koszalin.pl/", "_blank")}><i className="fab fa-chrome fa"></i></li>
                    </ul>
                
                </div>
            </article>
        </div>
    )
}
export default EducationPresentation;