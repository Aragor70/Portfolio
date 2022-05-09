import React, { Fragment, useEffect } from 'react';



import { Route, Switch, withRouter, useRouteMatch } from 'react-router-dom';
import Project from './Project';



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
import imgMongoDB from '../style/icons/mongodb.png';
import imgMysql from '../style/icons/mysql.png';/* 
import imgNodejs from '../style/icons/nodejs.png';
import imgPython from '../style/icons/python.png';
import imgReact from '../style/icons/react.png'; */
import imgRedux from '../style/icons/redux.png';
import imgTypescript from '../style/icons/typescript-icon.svg';
/* import imgSocketio from '../style/icons/socketio.png'; *//* 
import imgPhp from '../style/icons/php.png'; */
/* import imgMocha from '../style/icons/mocha.png'; *//* 
import imgGoogleDrive from '../style/icons/Google-Drive.png'; */
/* import imgMachine from '../style/icons/machine.png'; */

import brikkapp1 from '../style/brikkapp1.svg';
import data4you3 from '../style/data4you3.png';


const Experience = ({ setPageTitle }: any) => {

    const { path } = useRouteMatch();
    useEffect(() => {
        setPageTitle('Work Experience')

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])

    return (
        <Fragment>
            <div className="section-content experience">
            {/* <div className="params">
            
            </div> */}

        <article>
            <Switch>
                <Route exact path={path}>


                    <div className="section-image">
                        {/* <img src={brikkapp1} alt="projects_image" /> */}
                        <label className="hexagon">
                            <img src={brikkapp1} alt="projects_image" />
                        </label>
                    </div>
                    <div className="params">
                    <h3 className="content-center"><span style={{ fontSize: '45px', textAlign: 'left' }}>Junior Full-Stack Software Engineer at BrikkApp</span></h3>
                        
                        <p>Prague, Czech Republic 03/2021 – present</p>

                        <p>Developing React Web Applications with financial market processes along with the client-server infrastructure.</p>
                        
                        <p>Providing server-side financial investments data management with Object-Oriented Programming modules with JavaScript and TypeScript. </p>
                        

                        <p className="icons">
                            <div className="icon"><i className="fab fa-js fa-2x"></i><span>JavaScript</span></div>
                            <div className="icon"><img src={imgTypescript} alt="typeScript" /><span>TypeScript</span></div>
                            <div className="icon"><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></div>
                            <div className="icon"><i className="fab fa-react fa-2x"></i><span>React JS</span></div>
                            <div className="icon"><i className="fab fa-node fa-2x"></i><span>Node JS</span></div>
                            <div className="icon"><img src={imgRedux} alt="reduxJs" /><span>Redux JS</span></div>
                            <div className="icon"><img src={imgMongoDB} alt="mongoDB" /><span>MongoDB</span></div>
                            <div className="icon"><img src={imgMysql} alt="MySQL" /><span>MySQL</span></div>
                            <div className="icon"><i className="fab fa-github fa-2x"></i><span>GitHub</span></div>
                            <div className="icon"><i className="fab fa-laravel fa-2x"></i><span>Laravel</span></div>
                        </p>

                        <p className="more-about" >
                            {/* <span></span> */}
                            {/* <div className="icon-box"><i className="fas fa-code fa"></i></div> */}
                            <div className="icon-box" onClick={() => window.open("https://brikkapp.com/", "_blank")}><i className="fab fa-chrome fa"></i></div>
                        </p>
                    
                    </div>

                </Route>
            </Switch> 


            <Switch>  
                
                <Route exact path={`${path}/brikkapp`}>
                    <Project 
                        name="BrikkApp"
                        title="Junior Full-Stack Software Engineer"
                    />
                </Route>
            </Switch>

            <Switch>
                <Route exact path={path}>
                    <div className="section-image">

                        <label className="hexagon ">
                            <img src={data4you3} alt="projects_image" />
                        </label>
                        {/* <img src={data4you1} alt="projects_image" /> */}
                    </div>
                    <div className="params">
                    <h3 className="content-center"><span style={{ fontSize: '45px', textAlign: 'left' }}>Bootcamp mentor at Data4you</span></h3>
                        
                        <p>Prague, Czech Republic 03/2021 – present</p>

                        <p>Supporting dozens of students to fully use the skills such as HTML, CSS, SASS, JavaScript ES6, and React investing in their growth by preparing them with the skills of tomorrow.</p>
                        <p>Helping students to gain a solid base of fundamental programming, computer science knowledge, and experience with languages, frameworks, and libraries.</p>

                        <p className="icons">
                            <div className="icon"><i className="fab fa-js fa-2x"></i><span>JavaScript</span></div>
                            <div className="icon"><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></div>
                            <div className="icon"><i className="fab fa-react fa-2x"></i><span>React JS</span></div>
                            <div className="icon"><img src={imgMysql} alt="MySQL" /><span>MySQL</span></div>
                            <div className="icon"><i className="fab fa-laravel fa-2x"></i><span>Laravel</span></div>
                            <div className="icon"><i className="fab fa-github fa-2x"></i><span>GitHub</span></div>
                        </p>

                        <p className="more-about" >
                            {/* <span></span> */}
                            {/* <div className="icon-box"><i className="fas fa-code fa"></i></div> */}
                            <div className="icon-box" onClick={() => window.open("https://data4you.cz/", "_blank")}><i className="fab fa-chrome fa"></i></div>
                        </p>
                    
                    </div>

                </Route>
            </Switch> 


            <Switch>  
                
                <Route exact path={`${path}/data4you`}>
                    <Project 
                        name="Data4you"
                        title="Bootcamp mentor"
                    />
                </Route>
            </Switch> 
        </article>
            </div>
        </Fragment>
            
    );
}
export default withRouter(Experience);