import React, { Fragment, useEffect } from 'react';
/* 
import pht from '../style/pht.jpg'; */
import typesImg from '../style/types.png';
/* 
import imgCss from '../style/icons/css.png'; */
import imgDjango from '../style/icons/django.png';/* 
import imgGithub from '../style/icons/github.png';
import imgHtml from '../style/icons/html-5.png';
import imgJavascript from '../style/icons/javascript.png'; */
import imgJest from '../style/icons/jest.png';
import imgMongoDB from '../style/icons/mongodb.png';
import imgMysql from '../style/icons/mysql.png';/* 
import imgNodejs from '../style/icons/nodejs.png';
import imgPython from '../style/icons/python.png';
import imgReact from '../style/icons/react.png'; */
import imgRedux from '../style/icons/redux.png';
import imgTypescript from '../style/icons/typescript.png';
import imgSocketio from '../style/icons/socketio.png';/* 
import imgPhp from '../style/icons/php.png'; */
import imgMocha from '../style/icons/mocha.png';/* 
import imgGoogleDrive from '../style/icons/Google-Drive.png'; */
import imgMachine from '../style/icons/machine.png';



import { Route, Switch, withRouter, useRouteMatch } from 'react-router-dom';
import Project from './Project';

const SD = ({ location, pageTitle, setPageTitle, match, history }: any) => {

    const { path, url } = useRouteMatch();
    useEffect(() => {
        setPageTitle('sotfware development')

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])


    

    return (
        <Fragment>
            
            <div className="section-content">
                
            <Switch>
                <Route exact path={path}>
                    <div className="params">
                        
                        I especially develop applications using JavaScript, TypeScript, and Python in the environment of React Js, Redux Js, Django, Node Js, Express Js, CSS, and Jest testing libraries. 
                        This page is right to overview the tech development.
                        
                    </div>

                    <h1>Current projects</h1>
                </Route>
            </Switch>


            <Switch>
                <Route exact path={path}>
                    <div className="params">
                        <p className="content-center"><img src={ typesImg } alt="types" /></p>
                        <p>Real-Time TypeScript React app</p>
                            You can communicate with anyone in any location with the reliability of texting and the richness of chat. 
                            Connect with friends and family, send photos, videos, GIFs, emoji, and more.
                            Intuitive and modern, Types makes conversations easy, expressive, and fun.
                        <p className="icons">
                            <div className="icon"><i className="fab fa-js fa-2x"></i><span>JavaScript</span></div>
                            <div className="icon"><img src={imgTypescript} alt="typeScript" /><span>TypeScript</span></div>
                            <div className="icon"><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></div>
                            <div className="icon"><i className="fab fa-react fa-2x"></i><span>React Js</span></div>
                            <div className="icon"><i className="fab fa-node fa-2x"></i><span>Node Js</span></div>
                            <div className="icon"><img src={imgRedux} alt="reduxJs" /><span>Redux Js</span></div>
                            <div className="icon"><img src={imgMongoDB} alt="mongoDB" /><span>MongoDB</span></div>
                            <div className="icon"><i className="fab fa-github fa-2x"></i><span>GitHub</span></div>
                            <div className="icon"><img src={imgSocketio} style={{ width: '36px'}} alt="socketIo" /><span>Socket Io</span></div>
                            <div className="icon"><img src={imgJest} alt="jest" /><span>Jest</span></div>
                        </p>

                        <p className="more-about" onClick={e=> history.push(`${url}/types`)}>
                            View project details {"->"}
                        </p>
                    
                    </div>

                </Route>
            </Switch> 


            <Switch>  
                
                <Route exact path={`${path}/types`}>
                    <Project 
                        name="Types"
                        title="Real-Time TypeScript React app"
                    />
                </Route>
            </Switch> 


            <Switch>

                <Route exact path={path}>
                    <div className="params">
                        
                        <p className="content-center"><span style={{ fontSize: '45px' }}>WebShot</span></p>
                        <p>WebShot - JavaScript React app</p>
                            Automated screenshot generator.

                            The website allows you to generate screenshots of any website and save them into the Google Drive service.
                        <p className="icons">
                            <div className="icon"><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></div>
                            <div className="icon"><i className="fab fa-js fa-2x"></i><span>JavaScript</span></div>
                            <div className="icon"><i className="fab fa-react fa-2x"></i><span>React Js</span></div>
                            <div className="icon"><i className="fab fa-node fa-2x"></i><span>Node Js</span></div>
                            <div className="icon"><i className="fab fa-github fa-2x"></i><span>GitHub</span></div>
                            <div className="icon"><i className="fab fa-google-drive fa-2x"></i><span>Google Drive</span></div>
                            <div className="icon"><img src={imgMachine} alt="machine" /><span>Screenshot Machine</span></div>
                            
                        </p>
                        
                        <p className="more-about" onClick={e=> history.push("/software_development/webshot")}>View project details {"->"}</p>
                        
                    </div>
                </Route>
            </Switch> 

            <Switch>  
                
                <Route exact path={`${path}/webshot`}>
                    <Project 
                        name="WebShot"
                        title="JavaScript React app"
                    />
                </Route>
            </Switch> 

            <Switch>
                <Route exact path={path}>
                    <h1>Deployed projects</h1>
                
                </Route>
            </Switch> 


            <Switch>
                <Route exact path={path}>

                    <div className="params">
                        <p className="content-center"><span style={{ fontSize: '45px' }}>ShortNister</span></p>
                        <p>ShortNister - TypeScript React app</p>
                        Take control of your URL address. Meet Shortster, to build a shortcut address. 
                        Get the quick report of the frequency. 
                        Right now you know how many times your partners clicked your address.
                        
                        <p className="icons">
                            <div className="icon"><i className="fab fa-js fa-2x"></i><span>JavaScript</span></div>
                            <div className="icon"><img src={imgTypescript} alt="typescript" /><span>TypeScript</span></div>
                            <div className="icon"><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></div>
                            <div className="icon"><i className="fab fa-react fa-2x"></i><span>React Js</span></div>
                            <div className="icon"><i className="fab fa-node fa-2x"></i><span>Node Js</span></div>
                            <div className="icon"><img src={imgMongoDB} alt="mongoDB" /><span>Mongo DB</span></div>
                            <div className="icon"><i className="fab fa-github fa-2x"></i><span>GitHub</span></div>
                            <div className="icon"><img src={imgJest} alt="jest" /><span>Jest</span></div>
                            <div className="icon"><img src={imgMocha} alt="mocha" /><span>Mocha</span></div>
                        </p>
                        <p className="more-about" onClick={e=> history.push("/software_development/shortnister")}>View project details {"->"}</p>
                    </div>
                </Route>
            </Switch>

            <Switch>  
                
                <Route exact path={`${path}/shortnister`}>
                    <Project 
                        name="ShortNister"
                        title="TypeScript React app"
                    />
                </Route>
            </Switch> 

            <Switch>
                <Route exact path={path}>
                    <div className="params">
                        <p className="content-center"><span style={{ fontSize: '45px' }}>onLoud</span></p>
                        <p>onLoud - JavaScript React app</p>
                            You can share your favorite titles with anyone in any location with the lyrics and your audio. 
                            Play music with friends and family making the meeting special and full of sound.
                            Send messages to chat about the new songs.
                            Intuitive and modern interface, makes listening music easy, expressive, and fun.
                        
                        <p className="icons">
                            <div className="icon"><i className="fab fa-js fa-2x"></i><span>JavaScript</span></div>
                            <div className="icon"><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></div>
                            <div className="icon"><i className="fab fa-react fa-2x"></i><span>React Js</span></div>
                            <div className="icon"><i className="fab fa-node fa-2x"></i><span>Node Js</span></div>
                            <div className="icon"><img src={imgRedux} alt="reduxJs" /><span>Redux Js</span></div>
                            <div className="icon"><img src={imgMongoDB} alt="mongoDB" /><span>Mongo DB</span></div>
                            <div className="icon"><i className="fab fa-github fa-2x"></i><span>GitHub</span></div>
                        </p>

                        <p className="more-about">View project details {"->"}</p>

                        
                    </div>
                </Route>
            </Switch>  

            <Switch>  
                
                <Route exact path={`${path}/onloud`}>
                    <Project 
                        name="onLoud"
                        title="JavaScript React app"
                    />
                </Route>
            </Switch> 

            <Switch>
                <Route exact path={path}>
                    <div className="params">
                        <p className="content-center"><span style={{ fontSize: '45px' }}>niconnect.uk</span></p>
                        <p>niconnect - JavaScript PHP app</p>
                        
                        Niconnect make it easy to connect with family, friends or coworkers. Groups are dedicated spaces where you can share updates, photos or documents and message other group members.
                        Stay close with your favorite people using Niconnect.uk.
                        
                        <p className="icons">
                            <div className="icon"><i className="fab fa-html5 fa-2x"></i><span>HTML 5</span></div>
                            <div className="icon"><i className="fab fa-js fa-2x"></i><span>JavaScript</span></div>
                            <div className="icon"><i className="fab fa-php fa-2x"></i><span>PHP</span></div>
                            <div className="icon"><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></div>
                            <div className="icon"><img src={imgMysql} alt="mySql" /><span>SQL</span></div>
                            <div className="icon"><i className="fab fa-github fa-2x"></i><span>GitHub</span></div>
                        </p>

                        <p className="more-about" onClick={e=> history.push("/software_development/niconnect")}>View project details {"->"}</p>
                    </div>
                </Route>
            </Switch>  

            <Switch>  
                
                <Route exact path={`${path}/niconnect`}>
                    <Project 
                        name="niconnect.uk"
                        title="JavaScript PHP app"
                    />
                </Route>
            </Switch> 

            <Switch>
                <Route exact path={path}>
                    <h1>Drafts</h1>
                
                    <div className="params" style={{ marginBottom: '30px' }}>
                        <i>Draft projections include projects temporarily stopped development, waiting for deployment</i>
                    </div>
                </Route>
            </Switch>


            <Switch>
                <Route exact path={path}>

                    <div className="params" style={{ marginBottom: '0' }}>
                        <p className="content-center"><span style={{ fontSize: '45px' }}>Emojis</span></p>
                        <p>Emojis - JavaScript React Python Django app</p>

                        App is currently waiting for deployment.
                        <p className="icons">
                            <div className="icon"><i className="fab fa-js fa-2x"></i><span>JavaScript</span></div>
                            <div className="icon"><i className="fab fa-python fa-2x"></i><span>Python</span></div>
                            <div className="icon"><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></div>
                            <div className="icon"><img src={imgDjango} alt="django" /><span>Django</span></div>
                            <div className="icon"><img src={imgMysql} alt="mySql" /><span>SQL</span></div>
                            <div className="icon"><i className="fab fa-github fa-2x"></i><span>GitHub</span></div>
                        </p>

                        <p className="more-about" onClick={e=> history.push("/software_development/emojis")}>View project details {"->"}</p>
                            
                    </div>
                </Route>

                <Switch>  
                
                <Route exact path={`${path}/emojis`}>
                    <Project 
                        name="Emojis"
                        title="JavaScript React Python Django app"
                    />
                </Route>
            </Switch> 

            </Switch>
            

            </div>

        </Fragment>
            
    );
}
export default withRouter(SD);