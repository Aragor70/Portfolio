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
/* import imgMysql from '../style/icons/mysql.png'; *//* 
import imgNodejs from '../style/icons/nodejs.png';
import imgPython from '../style/icons/python.png';
import imgReact from '../style/icons/react.png'; */
import imgRedux from '../style/icons/redux.png';
import imgTypescript from '../style/icons/typescript.png';
/* import imgSocketio from '../style/icons/socketio.png'; *//* 
import imgPhp from '../style/icons/php.png'; */
/* import imgMocha from '../style/icons/mocha.png'; *//* 
import imgGoogleDrive from '../style/icons/Google-Drive.png'; */
/* import imgMachine from '../style/icons/machine.png'; */

import brikkapp1 from '../style/brikkapp1.png';
import data4you1 from '../style/data4you1.jpg';


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
            <div className="section-content">
            {/* <div className="params">
            
            </div> */}

            <Switch>
                <Route exact path={path}>
                    <div className="section-image">
                        <img src={brikkapp1} alt="projects_image" />
                    </div>
                    <div className="params">
                    <h3 className="content-center"><span style={{ fontSize: '45px', textAlign: 'left' }}>Junior Full-Stack Software Engineer at BrikkApp</span></h3>
                        
                        <p>Prague, Czech Republic 03/2021 – 09/2021</p>

                        <p>Provided real estate investment data by creating an automatic scraping module with Object-Oriented Programming modules using JavaScript libraries such as Puppeteer and Cheerio. Also developed server modules such as report module to prevent outdated data.</p>
                        
                        <p>Developed Debian server API modules and a React Web Application to visualize data using advanced tables, graphs, filtering, and sorting capabilities.</p>
                        

                        <p className="icons">
                            <div className="icon"><i className="fab fa-js fa-2x"></i><span>JavaScript ES6</span></div>
                            <div className="icon"><img src={imgTypescript} alt="typeScript" /><span>TypeScript</span></div>
                            <div className="icon"><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></div>
                            <div className="icon"><i className="fab fa-react fa-2x"></i><span>React JS</span></div>
                            <div className="icon"><i className="fab fa-node fa-2x"></i><span>Node JS</span></div>
                            <div className="icon"><img src={imgRedux} alt="reduxJs" /><span>Redux JS</span></div>
                            <div className="icon"><img src={imgMongoDB} alt="mongoDB" /><span>MongoDB</span></div>
                            <div className="icon"><i className="fab fa-github fa-2x"></i><span>GitHub</span></div>
                        </p>

                        <p className="more-about" >
                            {/* <span></span> */}
                            <div className="icon-box"><i className="fas fa-code fa"></i></div>
                            <div className="icon-box"><i className="fab fa-chrome fa"></i></div>
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
                        <img src={data4you1} alt="projects_image" />
                    </div>
                    <div className="params">
                    <h3 className="content-center"><span style={{ fontSize: '45px', textAlign: 'left' }}>Bootcamp mentor at Data4you</span></h3>
                        
                        <p>Prague, Czech Republic 03/2021 – 09/2021</p>

                        <p>Supporting students to fully use the skills such as HTML, CSS, JavaScript, and React investing in their growth by preparing them with the skills of tomorrow.</p>
                        <p>Helping students to gain a solid base of fundamental programming, computer science knowledge, and experience with languages, frameworks, and libraries.</p>

                        <p className="icons">
                            <div className="icon"><i className="fab fa-js fa-2x"></i><span>JavaScript ES6</span></div>
                            <div className="icon"><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></div>
                            <div className="icon"><i className="fab fa-react fa-2x"></i><span>React JS</span></div>
                            <div className="icon"><img src={imgMongoDB} alt="mongoDB" /><span>MongoDB</span></div>
                            <div className="icon"><i className="fab fa-github fa-2x"></i><span>GitHub</span></div>
                        </p>

                        <p className="more-about" >
                            {/* <span></span> */}
                            <div className="icon-box"><i className="fas fa-code fa"></i></div>
                            <div className="icon-box"><i className="fab fa-chrome fa"></i></div>
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
            </div>
        </Fragment>
            
    );
}
export default withRouter(Experience);