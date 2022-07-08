import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';



import { Route, Switch, withRouter, useRouteMatch, BrowserRouter as Router } from 'react-router-dom';
import Project from './Project';



/* 
import pht from '../style/pht.jpg'; */
/* import typesImg from '../style/types.png'; */
/* 
import imgCss from '../style/icons/css.png'; */
/* import imgDjango from '../style/icons/django.png'; */
/* 
import imgGithub from '../style/icons/github.png';
import imgHtml from '../style/icons/html-5.png';
import imgJavascript from '../style/icons/javascript.png'; */
/* import imgJest from '../style/icons/jest.png'; */
/* import imgMongoDB from '../style/icons/mongodb.png'; */
/* import imgMysql from '../style/icons/mysql.png'; */
/* 
import imgNodejs from '../style/icons/nodejs.png';
import imgPython from '../style/icons/python.png';
import imgReact from '../style/icons/react.png'; */
/* import imgRedux from '../style/icons/redux.png';
import imgTypescript from '../style/icons/typescript.png'; */
/* import imgSocketio from '../style/icons/socketio.png'; */
/* 
import imgPhp from '../style/icons/php.png'; */
/* import imgMocha from '../style/icons/mocha.png'; */
/* 
import imgGoogleDrive from '../style/icons/Google-Drive.png'; */
/* import imgMachine from '../style/icons/machine.png'; */

import gdansk1 from '../style/gdansk1.jpg';
import koszalin1 from '../style/koszalin1.jpg';
import { Translate } from '../components/Translate';
import FilterElement from '../components/FilterElement';
import { LanguageContext } from '../context/LanguageContext';
import ErrorResponse from '../components/ErrorResponse';
import Loading from '../components/Loading';
import ListPreview from '../components/preview/ListPreview';
import { getEducations } from '../actions/education';
import ProjectPreview from '../components/preview/ProjectPreview';
import { ScrollContext } from '../context/ScrollContext';


const Education = ({ setPageTitle }: any) => {

    const { path } = useRouteMatch();
    useEffect(() => {
        setPageTitle(<Translate tKey="home.menu.education" />)

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])


    
    const { languageCode } = useContext<any>(LanguageContext);

    
    const [loadingProjects, setLoadingProjects] = useState<boolean>(false)

    const [projects, setProjects] = useState<any[]>([])

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

    
    const fadeInUpElement: any = useRef(null)

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
                    <div className="section-content">

                        
                        <article>

                            <div>
                            
                            </div>
                            <div className="params no-opacity" ref={fadeInUpElement}>
                                
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
                                

                            </Fragment> : "Educations not found."
                        }


                        <article>
                            {/* <div className="params">
                            
                            </div> */}

                                    <div className="section-image">
                                        <img src={gdansk1} alt="projects_image" />
                                    </div>
                                    <div className="params">
                                    <h3 className="content-center"><span style={{ fontSize: '45px', textAlign: 'left' }}>Computer science and econometrics, Master's degree </span></h3>
                                        
                                        <p>University of Gdansk, Poland 03/2017 – 09/2021</p>

                                        <p>A combination of solid theoretical foundations in terms of mathematics and computer science. The study program is constantly consulted with employers from the IT industry.</p>
                                        
                                        {/* 

                                            Software engineering, 
                                            Database technology, 
                                            Designing human-computer interactions, 
                                            Enterprise Resource Planning, 
                                            IT project management, 
                                            System security, 
                                            Computer network, 
                                            Data warehouse.
                                        
                                        */}
                                        <ul className="icons">
                                        </ul>

                                        <ul className="more-about" >
                                            {/* <span></span> */}
                                            {/* <div className="icon-box"><i className="fas fa-code fa"></i></div> */}
                                            <li className="icon-box" onClick={() => window.open("https://en.ug.edu.pl/", "_blank")}><i className="fab fa-chrome fa"></i></li>
                                        </ul>
                                    
                                    </div>

                                
                                    <div className="section-image">
                                        <img src={koszalin1} alt="projects_image" />
                                    </div>
                                    <div className="params">
                                    <h3 className="content-center"><span style={{ fontSize: '45px', textAlign: 'left' }}>Economy and real estate management, Bachelor's degree</span></h3>
                                        
                                        <p>University of Technology Koszalin, Poland 03/2013 – 09/2017</p>

                                        <p>Economics and mathematics science, Real estate appraisal, consultancy, trading and brokerage, and management.</p>
                                        
                                        {/* 

                                            Investing in real estate, 
                                            Architecture and exploitation, 
                                            Real estate appraisal, 
                                            Real estate agency, 
                                            Real estate law, 
                                            Real estate management, 
                                            business economics.
                                        
                                        */}
                                        <ul className="icons">
                                        </ul>

                                        <ul className="more-about" >
                                            {/* <span></span> */}
                                            {/* <div className="icon-box"><i className="fas fa-code fa"></i></div> */}
                                            <li className="icon-box" onClick={() => window.open("https://tu.koszalin.pl/", "_blank")}><i className="fab fa-chrome fa"></i></li>
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
export default withRouter(Education);