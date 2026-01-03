import React, { Fragment, useEffect, useRef } from "react";
import ReactDOM from 'react-dom/server';
import clsx from "clsx";

import FilterElement from "../../FilterElement/FilterElement";
import { Translate } from "../../Translate/Translate";
import ExperiencesTemplate from "../../../documents/ExperiencesTemplate";
import ProjectPreview from "../../preview/ProjectPreview/ProjectPreview";
import ListPreview from "../../preview/ListPreview/ListPreview";
import ErrorResponse from "../../ErrorResponse/ErrorResponse";
import Attacher from "../../Attacher/Attacher";
import Loading from "../../Loading/Loading";

import imgMongoDB from '/assets/icons/mongodb.png';
import imgMysql from '/assets/icons/mysql.png'
import imgRedux from '/assets/icons/redux.png';
import imgTypescript from '/assets/icons/typescript-icon.svg';
import brikkapp1 from '/assets/images/brikkapp1.svg';
import data4you3 from '/assets/images/data4you3.png';

import styles from "./ExperiencePresentation.module.scss";

const ExperiencePresentation = ({ projects, loadingProjects, errorResponse, languageCode, setProjects, getExperiences }) => {

    const fadeInUpElement = useRef(null)
    useEffect(() => {
        (() => {
            if (fadeInUpElement.current) {
                fadeInUpElement.current.classList.add(styles.animated)
                fadeInUpElement.current.classList.add(styles.fadeInUp)
                fadeInUpElement.current.classList.remove(styles.noOpacity)
            }
        })()
    }, [fadeInUpElement])

    return (
        <div className={clsx(styles.sectionContent, styles.experience)}>
                <Attacher htmlFile={ReactDOM.renderToString(<ExperiencesTemplate projects={projects} />)} fileName="Work_Experience-Mikolaj_Prus.pdf" />
            
                <article>
                    <div>
                    
                    </div>
                    <div className={clsx(styles.param, styles.noOpacity)} ref={fadeInUpElement}>
                        
                        <p>
                            <Translate tKey="sd.overview" />
                        </p>
                        
                    </div>
                </article>
            <FilterElement languageCode={languageCode} setProjects={setProjects} loadValues={getExperiences} />
                
                {
                    loadingProjects ? <Loading /> : errorResponse ? <ErrorResponse message={errorResponse} style={{ css: { color: 'red' }}} /> : projects.length ? <Fragment>
                        <ListPreview status="current" title={<Translate tKey="experience.section.current.headline" />} list={projects} Component={ProjectPreview} />
                        <ListPreview status="completed" title={<Translate tKey="experience.section.completed.headline" />} list={projects} Component={ProjectPreview} />
                    </Fragment> : (
                        <p className={styles.smallCenter}>
                            <Translate tKey="experience.notfound" />
                        </p>
                    )
                }
                <article>

                    <div className={styles.sectionImage}>
                        {/* <img src={brikkapp1} alt="projects_image" /> */}
                        <label className={styles.hexagon}>
                            <img src={brikkapp1} alt="projects_image" />
                        </label>
                    </div>
                <div className={styles.param}>
                    <h3 className={styles.contentCenter}><span style={{ fontSize: '45px', textAlign: 'left' }}>Junior Full-Stack Software Engineer at BrikkApp</span></h3>
                        
                        <p>Prague, Czech Republic 03/2021 – 07/2022</p>
                        <p>Developing React Web Applications with financial market processes along with the client-server infrastructure.</p>
                        
                        <p>Providing server-side financial investments data management with Object-Oriented Programming modules with JavaScript and TypeScript. </p>
                        
                        <p className={styles.icons}>
                            <li className={styles.icon}><i className="fab fa-js fa-2x"></i><span>JavaScript</span></li>
                            <li className={styles.icon}><img src={imgTypescript} alt="typeScript" /><span>TypeScript</span></li>
                            <li className={styles.icon}><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></li>
                            <li className={styles.icon}><i className="fab fa-react fa-2x"></i><span>React JS</span></li>
                            <li className={styles.icon}><i className="fab fa-node fa-2x"></i><span>Node JS</span></li>
                            <li className={styles.icon}><img src={imgRedux} alt="reduxJs" /><span>Redux JS</span></li>
                            <li className={styles.icon}><img src={imgMongoDB} alt="mongoDB" /><span>MongoDB</span></li>
                            <li className={styles.icon}><img src={imgMysql} alt="MySQL" /><span>MySQL</span></li>
                            <li className={styles.icon}><i className="fab fa-github fa-2x"></i><span>GitHub</span></li>
                            <li className={styles.icon}><i className="fab fa-laravel fa-2x"></i><span>Laravel</span></li>
                        </p>
                        <ul className={styles.moreAbout}>
                            {/* <span></span> */}
                            {/* <div className="icon-box"><i className="fas fa-code fa"></i></div> */}
                            <li className={styles.iconBox} onClick={() => window.open("https://brikkapp.com/", "_blank")}><i className="fab fa-chrome fa"></i></li>
                        </ul>
                    
                </div>

                <div className={styles.sectionImage}>
                    <label className={styles.hexagon}>
                        <img src={data4you3} alt="projects_image" />
                    </label>
                    {/* <img src={data4you1} alt="projects_image" /> */}
                </div>
                <div className={styles.param}>
                    <h3 className={styles.contentCenter}><span style={{ fontSize: '45px', textAlign: 'left' }}>Bootcamp mentor at Data4you</span></h3>
                    <p>Prague, Czech Republic 03/2021 – 07/2022</p>
                    <p>Supporting dozens of students to fully use the skills such as HTML, CSS, SASS, JavaScript ES6, and React investing in their growth by preparing them with the skills of tomorrow.</p>
                    <p>Helping students to gain a solid base of fundamental programming, computer science knowledge, and experience with languages, frameworks, and libraries.</p>
                    <ul className={styles.icons}>
                        <li className={styles.icon}><i className="fab fa-js fa-2x"></i><span>JavaScript</span></li>
                        <li className={styles.icon}><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></li>
                        <li className={styles.icon}><i className="fab fa-react fa-2x"></i><span>React JS</span></li>
                        <li className={styles.icon}><img src={imgMysql} alt="MySQL" /><span>MySQL</span></li>
                        <li className={styles.icon}><i className="fab fa-laravel fa-2x"></i><span>Laravel</span></li>
                        <li className={styles.icon}><i className="fab fa-github fa-2x"></i><span>GitHub</span></li>
                    </ul>
                    <ul className={styles.moreAbout}>
                        {/* <span></span> */}
                        {/* <div className="icon-box"><i className="fas fa-code fa"></i></div> */}
                        <li className={styles.iconBox} onClick={() => window.open("https://data4you.cz/", "_blank")}><i className="fab fa-chrome fa"></i></li>
                    </ul>
                    
                </div>
            </article>
        </div>
    )
}
export default ExperiencePresentation;