import React, { Fragment, useEffect } from 'react';



import { Route, Switch, withRouter, useRouteMatch } from 'react-router-dom';
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


const Education = ({ setPageTitle }: any) => {

    const { path } = useRouteMatch();
    useEffect(() => {
        setPageTitle('Education')

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])

    return (
        <Fragment>
            <div className="section-content">

            <article>
                {/* <div className="params">
                
                </div> */}

                <Switch>
                    <Route exact path={path}>
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
                            <p className="icons">
                            </p>

                            <p className="more-about" >
                                {/* <span></span> */}
                                {/* <div className="icon-box"><i className="fas fa-code fa"></i></div> */}
                                <div className="icon-box" onClick={() => window.open("https://en.ug.edu.pl/", "_blank")}><i className="fab fa-chrome fa"></i></div>
                            </p>
                        
                        </div>

                    </Route>
                </Switch> 


                <Switch>  
                    
                    <Route exact path={`${path}/gdansk`}>
                        <Project
                            name="University of Gdansk (Poland)"
                            title="Computer science and econometrics, Master's degree"
                        />
                    </Route>
                </Switch>

                <Switch>
                    <Route exact path={path}>
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
                            <p className="icons">
                            </p>

                            <p className="more-about" >
                                {/* <span></span> */}
                                {/* <div className="icon-box"><i className="fas fa-code fa"></i></div> */}
                                <div className="icon-box" onClick={() => window.open("https://tu.koszalin.pl/", "_blank")}><i className="fab fa-chrome fa"></i></div>
                            </p>
                        
                        </div>

                    </Route>
                </Switch> 


                <Switch>  
                    
                    <Route exact path={`${path}/koszalin`}>
                        <Project
                            name="University of Technology Koszalin (Poland)"
                            title="Economy and real estate management, Bachelor's degree"
                        />
                    </Route>
                </Switch>
                </article>
            </div>
        </Fragment>
            
    );
}
export default withRouter(Education);