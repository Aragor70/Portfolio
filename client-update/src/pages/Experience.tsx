import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Route, Switch, withRouter, useRouteMatch, BrowserRouter as Router } from 'react-router-dom';
import Project from './Project';
import ReactDOM from 'react-dom/server';

/* 
import pht from '../style/pht.jpg'; */
/* import typesImg from '../style/types.png'; */
/* 
import imgCss from '../style/icons/css.png'; */
/* import imgDjango from '../style/icons/django.png'; *//* 
import imgGithub from '../style/icons/github.png';
import imgHtml from '../style/icons/html-5.png';
import imgJavascript from '../style/icons/javascript.png'; */
/* import imgJest from '../style/icons/jest.png'; */
import imgMongoDB from '/assets/icons/mongodb.png';
import imgMysql from '/assets/icons/mysql.png';/* 
import imgNodejs from '../style/icons/nodejs.png';
import imgPython from '../style/icons/python.png';
import imgReact from '../style/icons/react.png'; */
import imgRedux from '/assets/icons/redux.png';
import imgTypescript from '/assets/icons/typescript-icon.svg';
/* import imgSocketio from '../style/icons/socketio.png'; *//* 
import imgPhp from '../style/icons/php.png'; */
/* import imgMocha from '../style/icons/mocha.png'; *//* 
import imgGoogleDrive from '../style/icons/Google-Drive.png'; */
/* import imgMachine from '../style/icons/machine.png'; */
import brikkapp1 from '/assets/images/brikkapp1.svg';
import data4you3 from '/assets/images/data4you3.png';
import { Translate } from '../components/Translate/Translate';
import { getExperiences } from '../actions/experience';
import { LanguageContext } from '../context/LanguageContext';
import FilterElement from '../components/FilterElement/FilterElement';
import Loading from '../components/Loading/Loading';
import ErrorResponse from '../components/ErrorResponse/ErrorResponse';
import ListPreview from '../components/preview/ListPreview/ListPreview';
import ProjectPreview from '../components/preview/ProjectPreview/ProjectPreview';
import { ScrollContext } from '../context/ScrollContext';
import { PageTitleContext } from '../context/PageTitleContext';
import { Language } from '../utils/LanguageConfig';
import Attacher from '@/components/Attacher/Attacher';
import ExperiencesTemplate from '@/documents/ExperiencesTemplate';

const Experience = () => {
    
    const { setPageTitle } = useContext(PageTitleContext);
    const { path } = useRouteMatch();
    useEffect(() => {
        setPageTitle(<Translate tKey="home.menu.experience" />)
        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])
    
    const { languageCode } = useContext<{ languageCode: Language }>(LanguageContext);
    
    const [loadingProjects, setLoadingProjects] = useState<boolean>(false)
    const [projects, setProjects] = useState([])
    const [errorResponse, setErrorResponse] = useState('')
    
    useEffect(() => {
        (async() => {
            setLoadingProjects(true)
            const res = await getExperiences({ isVisible: true })
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
        (() => {
            
            if (fadeInUpElement.current) {
                
    
                fadeInUpElement.current.classList.add('animated')
                fadeInUpElement.current.classList.add('fadeInUp')
                fadeInUpElement.current.classList.remove('no-opacity')
            }
        })()
    }, [fadeInUpElement])
    
    const [scrollPosition, setScrollPosition] = useState<number | null>(null);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
            setScrollPosition(null);
        };
    }, []);
    return (
        <Router>
        <ScrollContext.Provider value={{scrollPosition, setScrollPosition}}>
            <Switch>
                <Route exact path={`${path}/:project_name`}>
                    <Project />
                </Route>
                <Route exact path={path}>
                    <div className="section-content experience">
                    {/* <div className="params">
                    
                    </div> */}
                        <Attacher htmlFile={ReactDOM.renderToString(<ExperiencesTemplate projects={projects} />)} fileName="Work_Experience-Mikolaj_Prus.pdf" />
                    
                        <article>
                            <div>
                            
                            </div>
                            <div className="params no-opacity" ref={fadeInUpElement}>
                                
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
                                <p className="small-center">
                                    <Translate tKey="experience.notfound" />
                                </p>
                            )
                        }
                        <article>

                            <div className="section-image">
                                {/* <img src={brikkapp1} alt="projects_image" /> */}
                                <label className="hexagon">
                                    <img src={brikkapp1} alt="projects_image" />
                                </label>
                            </div>
                            <div className="params">
                            <h3 className="content-center"><span style={{ fontSize: '45px', textAlign: 'left' }}>Junior Full-Stack Software Engineer at BrikkApp</span></h3>
                                
                                <p>Prague, Czech Republic 03/2021 – 07/2022</p>
                                <p>Developing React Web Applications with financial market processes along with the client-server infrastructure.</p>
                                
                                <p>Providing server-side financial investments data management with Object-Oriented Programming modules with JavaScript and TypeScript. </p>
                                
                                <p className="icons">
                                    <li className="icon"><i className="fab fa-js fa-2x"></i><span>JavaScript</span></li>
                                    <li className="icon"><img src={imgTypescript} alt="typeScript" /><span>TypeScript</span></li>
                                    <li className="icon"><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></li>
                                    <li className="icon"><i className="fab fa-react fa-2x"></i><span>React JS</span></li>
                                    <li className="icon"><i className="fab fa-node fa-2x"></i><span>Node JS</span></li>
                                    <li className="icon"><img src={imgRedux} alt="reduxJs" /><span>Redux JS</span></li>
                                    <li className="icon"><img src={imgMongoDB} alt="mongoDB" /><span>MongoDB</span></li>
                                    <li className="icon"><img src={imgMysql} alt="MySQL" /><span>MySQL</span></li>
                                    <li className="icon"><i className="fab fa-github fa-2x"></i><span>GitHub</span></li>
                                    <li className="icon"><i className="fab fa-laravel fa-2x"></i><span>Laravel</span></li>
                                </p>
                                <ul className="more-about" >
                                    {/* <span></span> */}
                                    {/* <div className="icon-box"><i className="fas fa-code fa"></i></div> */}
                                    <li className="icon-box" onClick={() => window.open("https://brikkapp.com/", "_blank")}><i className="fab fa-chrome fa"></i></li>
                                </ul>
                            
                            </div>

                            <div className="section-image">
                                <label className="hexagon ">
                                    <img src={data4you3} alt="projects_image" />
                                </label>
                                {/* <img src={data4you1} alt="projects_image" /> */}
                            </div>
                            <div className="params">
                            <h3 className="content-center"><span style={{ fontSize: '45px', textAlign: 'left' }}>Bootcamp mentor at Data4you</span></h3>
                                
                                <p>Prague, Czech Republic 03/2021 – 07/2022</p>
                                <p>Supporting dozens of students to fully use the skills such as HTML, CSS, SASS, JavaScript ES6, and React investing in their growth by preparing them with the skills of tomorrow.</p>
                                <p>Helping students to gain a solid base of fundamental programming, computer science knowledge, and experience with languages, frameworks, and libraries.</p>
                                <ul className="icons">
                                    <li className="icon"><i className="fab fa-js fa-2x"></i><span>JavaScript</span></li>
                                    <li className="icon"><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></li>
                                    <li className="icon"><i className="fab fa-react fa-2x"></i><span>React JS</span></li>
                                    <li className="icon"><img src={imgMysql} alt="MySQL" /><span>MySQL</span></li>
                                    <li className="icon"><i className="fab fa-laravel fa-2x"></i><span>Laravel</span></li>
                                    <li className="icon"><i className="fab fa-github fa-2x"></i><span>GitHub</span></li>
                                </ul>
                                <ul className="more-about" >
                                    {/* <span></span> */}
                                    {/* <div className="icon-box"><i className="fas fa-code fa"></i></div> */}
                                    <li className="icon-box" onClick={() => window.open("https://data4you.cz/", "_blank")}><i className="fab fa-chrome fa"></i></li>
                                </ul>
                            
                            </div>
                        </article>
                    </div>
                </Route>
            </Switch>
        </ScrollContext.Provider>
        </Router>
            
    );
}
export default withRouter(Experience);