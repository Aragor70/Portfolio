import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import ReactDOM from 'react-dom/server';
import { clsx } from 'clsx';

import typesImg from '/assets/images/types.png';
import imgJest from '/assets/icons/jest.png';
import imgMongoDB from '/assets/icons/mongodb.png';
import imgRedux from '/assets/icons/redux.png';
import imgTypescript from '/assets/icons/typescript-icon.svg';
import imgSocketio from '/assets/icons/socketio.png';
import imgMocha from '/assets/icons/mocha.png';
import imgMachine from '/assets/icons/machine.png';
import imgJavaScript1 from '/assets/icons/javascript-logo.svg';

import angularImg from '/assets/icons/logo-angular.svg'
import reactImg from '/assets/icons/logo-react.svg'
import ionicImg from '/assets/icons/logo-ionic.svg'
import nestImg from '/assets/icons/nestjs-icon.svg'
import expressImg from '/assets/icons/expressjs-icon.svg'

import types1 from '/assets/images/types1.png';
import onloud1 from '/assets/images/onloud1.png';
import shortnister1 from '/assets/images/shortnister1.png';
import webshot1 from '/assets/images/webshot1.png';
import efforts1 from '/assets/images/efforts1.png';
import nichess1 from '/assets/images/nichess1.png';
import uhelp1 from '/assets/images/uhelp.online.png';
import nsoftware1 from '/assets/images/nivest-software.png';
import nivest1 from '/assets/images/NiVest1.png';
import tsServerExample1 from '/assets/images/ts-server-example1.jpg';
import emojis1 from '/assets/images/emojis.png';
import niconnect1 from '/assets/images/niconnect.png';

import Project from '../../../pages/Project';
import GithubStats from '../../GithubStats/GithubStats';
import { Translate } from '../../Translate/Translate';
import { getAllRepos } from '../../../actions/github';
import { getProjects } from '../../../actions/project';
import ProjectPreview from '../../preview/ProjectPreview/ProjectPreview';
import { LanguageContext } from '../../../context/LanguageContext';
import ListPreview from '../../preview/ListPreview/ListPreview';
import Loading from '../../Loading/Loading';
import FilterElement from '../../FilterElement/FilterElement';
import ErrorResponse from '../../ErrorResponse/ErrorResponse';
import { PageTitleContext } from '../../../context/PageTitleContext';
import { Language } from '../../../utils/LanguageConfig';
import Attacher from '../../Attacher/Attacher';
import ProjectsTemplate from '../../../documents/ProjectsTemplate';

import styles from "./SDPresentation.module.scss";

const SDPresentation = () => {

    const { setPageTitle } = useContext(PageTitleContext);
    const { path, url } = useRouteMatch();

    useEffect(() => {
        setPageTitle(<Translate tKey="home.menu.projects" />)

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])

    const { languageCode } = useContext<{ languageCode: Language }>(LanguageContext);

    const [repos, setRepos] = useState([])
    const [loadingRepos, setLoadingRepos] = useState<boolean>(false)
    const [loadingProjects, setLoadingProjects] = useState<boolean>(false)
    const [projects, setProjects] = useState([])
    const [errorResponse, setErrorResponse] = useState('')

    useEffect(() => {

        (async() => {
            setLoadingProjects(true)

            const res = await getProjects({ isVisible: true })
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

    useEffect(() => {

        (async() => {
            setLoadingRepos(true)

            const extended_repos = await getAllRepos();
            
            setLoadingRepos(false)

            return setRepos(extended_repos || [])
        })()

        return () => {
            setRepos([])
        }
    }, [])

    const fadeInUpElement = useRef(null)

    useEffect(() => {

        if (fadeInUpElement.current) {
            fadeInUpElement.current.classList.add(styles.animated)
            fadeInUpElement.current.classList.add(styles.fadeInUp)
            fadeInUpElement.current.classList.remove(styles.noOpacity)
        }
    }, [fadeInUpElement])

    return (
        <Fragment>
            <div className={styles.sectionContent}>
            
                <Attacher htmlFile={ReactDOM.renderToString(<ProjectsTemplate projects={projects} />)} fileName="Software_Development-Mikolaj_Prus.pdf" />
                <article>

                    <div></div>
                    <div className={clsx(styles.param, styles.noOpacity)} ref={fadeInUpElement}>
                        
                        <p>
                            <Translate tKey="sd.overview" />
                        </p>
                        
                    </div>

                </article>

                <FilterElement languageCode={languageCode} setProjects={setProjects} loadValues={getProjects} />

                {
                    loadingProjects ? <Loading /> : errorResponse ? <ErrorResponse message={errorResponse} style={{ css: { color: 'red' }}} /> : projects.length ? <Fragment>

                        <ListPreview status="ongoing" title={<Translate tKey="sd.section.ongoing.headline" />} style={{ className: 'blue' }} list={projects} Component={ProjectPreview} repos={repos} loadingRepos={loadingRepos} className={styles.param} />
                        <ListPreview status="event" title={<Translate tKey="sd.section.events.headline" />} list={projects} Component={ProjectPreview} repos={repos} loadingRepos={loadingRepos} className={styles.param} />
                        <ListPreview status="online" title={<Translate tKey="sd.section.online.headline" />} list={projects} Component={ProjectPreview} repos={repos} loadingRepos={loadingRepos} className={styles.param} />
                        <ListPreview status="repository" title={<Translate tKey="sd.section.repos.headline" />} list={projects} Component={ProjectPreview} repos={repos} loadingRepos={loadingRepos} className={styles.param} />
                        <ListPreview status="draft" title={<Translate tKey="sd.section.drafts.headline" />} list={projects} Component={ProjectPreview} repos={repos} loadingRepos={loadingRepos} className={styles.param} />

                    </Fragment> : (
                        <p className="small-center">
                            <Translate tKey="sd.notfound" />
                        </p>
                    )
                }
            </div>
        <div className={styles.sectionContent}>
    
        <article className={styles.blue}>
    
            <Switch>
                <Route exact path={path}>
                    <div className={styles.sectionImage}>
                        <img src={nsoftware1} alt="projects_image" />
                    </div>
                    <div className={styles.param}>
                        <h3><span style={{ fontSize: '45px' }}>NiVest Software CMS</span></h3>
                        <p>Website dedicated to the NiVest Software company. Project is to allow every user to manage the content of the another projects.</p>
                        
                        <p>Przedsięwzięcie NiVest Software. Zarządzaj swoją treścią z pomocą interfejsu użytkownika w pozostałych projektach NiVest.</p>
                        
                            {
                                loadingRepos ? null : 
                                <Fragment>
                                    <GithubStats repos={repos} name='NiVest-Software' />
                                </Fragment>
                            }
    
                        <ul className={styles.icons}>
                            <li><img src={imgTypescript} alt="typeScript" /><span>TypeScript</span></li>
                            <li><img src={angularImg} alt="angular" /><span>Angular</span></li>
                            <li><img src={nestImg} alt="nest Js" /><span>Nest Js</span></li>
                            <li><i className="fas fa-palette fa-2x"></i><span>SCSS</span></li>
                            <li><i className="fas fa-database fa-2x"></i><span>PostgreSQL</span></li>
                        </ul>
                        
                        <ul className={styles.moreAbout}>
                            <Link to={`${path}/NiVest-Software`}>View project details</Link>
                            <li className={styles.iconBox} onClick={() => window.open("https://redirect.m-prus.uk/NiVest_Software-GitHub_Repository", "_blank")}><i className="fas fa-code fa"></i></li>
                            <li className={styles.iconBox} onClick={() => window.open("https://nivest-software.m-prus.uk/", "_blank")}><i className="fab fa-chrome fa"></i></li>
                        </ul>
                    
                    </div>
                </Route>
            </Switch>           
    
        </article>
        
            <Switch>  
                
                <Route path={`${url}/:name`}>
                    <Project 
                        name="NiVest-Software"
                        title="NiVest Software CMS"
                    />
                </Route>
            </Switch> 
    
            <Switch>
                <Route exact path={path}>
                    <h1><Translate tKey="sd.section.events.headline" /></h1>
                
                </Route>
            </Switch>
            
        <article>
            <Switch>
                <Route exact path={path}>
                    <div className={styles.sectionImage}>
                        <img src={uhelp1} alt="projects_image" />
                    </div>
                    <div className={styles.param}>
                        <h3><span style={{ fontSize: '45px' }}>Hackathon Together 4 Ukraine</span></h3>
                        <p>Together4Ukraine Hackathon is bringing together experienced volunteers who are willing to proactively help people from Ukraine affected by war.</p>
                        <ul className={styles.points}>
                            <li className={styles.point}>
                                Hackathon 05 - 06/3/2022
                            </li>
                            <li className={styles.point}>
                                Online Hackathon 07 - 14/3/2022
                            </li>
                            <li className={styles.point}>
                                Further development 14 - 18/3/2022
                            </li>
                        
                        </ul>
    
                        <ul className={styles.icons}>
                            <li><img src={imgTypescript} alt="typeScript" /><span>TypeScript</span></li>
                            <li><i className="fab fa-react fa-2x"></i><span>React Js</span></li>
                            <li><i className="fab fa-css3-alt fa-2x"></i><span>SCSS</span></li>
                        </ul>
    
                        <ul className={styles.moreAbout}>
                            {/* <span onClick={() => history.push(`${url}/uhelp`)}>View project details</span> */}
                            {/* <li className={styles.iconBox} onClick={() => window.open("https://github.com/Aragor70/Messages", "_blank")}><i className="fas fa-code fa"></i></div> */}
                            {/* <li className={styles.iconBox} onClick={() => window.open("https://www.linkedin.com/in/mikolaj-prus/", "_blank")}><i className="fab fa-chrome fa"></i></div> */}
                        </ul>
                    
                    </div>
    
                </Route>
            </Switch>
        </article>
    
            <Switch>
                <Route exact path={path}>
                    <h1>Projects Online</h1>
                
                </Route>
            </Switch>
    
        <article>
            <Switch>
                <Route exact path={path}>
                    <div className={styles.sectionImage}>
                        <img src={nivest1} alt="projects_image" />
                    </div>
                    <div className={styles.param}>
                        <h3><span style={{ fontSize: '45px' }}>NiVest</span></h3>
                        <p>Financial market simulator mobile app</p>
                        
                        
                        
                            {
                                loadingRepos ? null : 
                                <Fragment>
                                    <GithubStats repos={repos} name='NiBank' />
                                </Fragment>
                            }
    
                        <ul className={styles.icons}>
                            <li><img src={imgTypescript} alt="typeScript" /><span>TypeScript</span></li>
                            <li><img src={reactImg} alt="reactjs" /><span>React Js</span></li>
                            <li><img src={expressImg} alt="expressjs" /><span>Express Js</span></li>
                            <li><i className="fab fa-css3-alt fa-2x"></i><span>SCSS</span></li>
                            <li><img src={ionicImg} alt="ionic" /><span>Ionic</span></li>
                        </ul>
    
                        <ul className={styles.moreAbout}>
                            {/* <span onClick={() => history.push(`${url}/NiVest`)}>View project details</span> */}
                            <li className={styles.iconBox} onClick={() => window.open("https://redirect.m-prus.uk/NiVest_App-GitHub_Repository", "_blank")}><i className="fas fa-code fa"></i></li>
                            <li className={styles.iconBox} onClick={() => window.open("https://redirect.m-prus.uk/NiVest_App-Google_Play", "_blank")}><i className="fab fa-chrome fa"></i></li>
                        </ul>
                    
                    </div>
    
                </Route>
            </Switch>
    
            <Switch>
                <Route exact path={path}>
                    <div className={styles.sectionImage}>
                        <img src={types1} alt="projects_image" />
                    </div>
                    <div className={styles.param}>
                        <h3><img src={ typesImg } alt="types" /></h3>
                        <p>Real-Time TypeScript React app</p><p>You can communicate with anyone in any location with the reliability of texting and the richness of chat. Connect with friends and family, send photos, videos, GIFs, emoji, and more.</p><p>Intuitive and modern, Types makes conversations easy, expressive, and fun.</p>
    
                        
                            {
                                loadingRepos ? null : 
                                <Fragment>
                                    <GithubStats repos={repos} name='Messages' />
                                </Fragment>
                            }
    
                        <ul className={styles.icons}>
                            <li><img src={imgTypescript} alt="typeScript" /><span>TypeScript</span></li>
                            <li><i className="fab fa-react fa-2x"></i><span>React Js</span></li>
                            <li><img src={expressImg} alt="expressjs" /><span>Express Js</span></li>
                            <li><img src={imgRedux} alt="reduxJs" /><span>Redux Js</span></li>
                            <li><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></li>
                            <li><img src={imgMongoDB} alt="mongoDB" /><span>MongoDB</span></li>
                            <li><img src={imgSocketio} style={{ width: '36px'}} alt="socketIo" /><span>Socket Io</span></li>
                            <li><img src={imgJest} alt="jest" /><span>Jest</span></li>
                        </ul>
    
                        <ul className={styles.moreAbout}>
                            {/* <span onClick={() => history.push(`${url}/types`)}>View project details</span> */}
                            <li className={styles.iconBox} onClick={() => window.open("https://redirect.m-prus.uk/NiTypes-Messenger-GitHub_Repository", "_blank")}><i className="fas fa-code fa"></i></li>
                            <li className={styles.iconBox} onClick={() => window.open("https://redirect.m-prus.uk/NiTypes-Messenger", "_blank")}><i className="fab fa-chrome fa"></i></li>
                        </ul>
                    
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
                    <div className={styles.sectionImage}>
                        <img src={nichess1} alt="projects_image" />
                    </div>
                    <div className={styles.param}>
                        <h3><span style={{ fontSize: '45px' }}>NiChess</span></h3>
                        <p>Real-Time TypeScript React app</p>
                            <p>Play chess with anyone in any location. NiChess is a game of chess with the elements of communication between the players.
                            You can invite to play anyone with the reliability of texting and the richness of chat. </p>
                            <p>Have a fun with friends and family playing this game.</p>
                        
                        
                            {
                                loadingRepos ? null : 
                                <Fragment>
                                    <GithubStats repos={repos} name='NiChess' />
                                </Fragment>
                            }
    
                        <ul className={styles.icons}>
                            <li><img src={imgJavaScript1} alt="javaScript" /><span>JavaScript</span></li>
                            <li><img src={imgTypescript} alt="typeScript" /><span>TypeScript</span></li>
                            <li><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></li>
                            <li><i className="fab fa-react fa-2x"></i><span>React Js</span></li>
                            <li><img src={expressImg} alt="expressjs" /><span>Express Js</span></li>
                            <li><img src={imgRedux} alt="reduxJs" /><span>Redux Js</span></li>
                            <li><img src={imgMongoDB} alt="mongoDB" /><span>MongoDB</span></li>
                            <li><img src={imgSocketio} style={{ width: '36px'}} alt="socketIo" /><span>Socket Io</span></li>
                            <li><img src={imgJest} alt="jest" /><span>Jest</span></li>
                        </ul>
    
                        <ul className={styles.moreAbout}>
                            {/* <span onClick={() => history.push(`${url}/nichess`)}>View project details</span> */}
                            <li className={styles.iconBox} onClick={() => window.open("https://github.com/Aragor70/NiChess", "_blank")}><i className="fas fa-code fa"></i></li>
                            <li className={styles.iconBox} onClick={() => window.open("https://nichess.netlify.app/", "_blank")}><i className="fab fa-chrome fa"></i></li>
                        </ul>
                    
                    </div>
    
                </Route>
            </Switch>
    
    
            <Switch>  
                
                <Route exact path={`${path}/nichess`}>
                    <Project 
                        name="Nichess"
                        title="Real-Time TypeScript React app"
                    />
                </Route>
            </Switch> 
    
    
            <Switch>
    
                <Route exact path={path}>
                    <div className={styles.sectionImage}>
                        <img src={efforts1} alt="projects_image" />
                    </div>
                    <div className={styles.param}>
                        <h3><span style={{ fontSize: '45px' }}>Efforts</span></h3>
    
                            <p>A global platform for measuring efforts.</p>
    
                            <p>The website allows review your tasks in a form of the list. Click on them to <b>mark as completed</b> {"("}you can update the status back{")"}. To make your efforts more efficient, we suggest you to filter the cards by status or a date of their creation.</p>
    
                        
                            {
                                loadingRepos ? null : 
                                <Fragment>
                                    <GithubStats repos={repos} name='Efforts' />
                                </Fragment>
                            }
    
                        <ul className={styles.icons}>
                            <li><img src={imgJavaScript1} alt="javaScript" /><span>JavaScript</span></li>
                            <li><i className="fab fa-react fa-2x"></i><span>React Js</span></li>
                            <li><img src={expressImg} alt="expressjs" /><span>Express Js</span></li>
                            <li><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></li>
                            <li><img src={imgMocha} alt="mocha" /><span>Mocha</span></li>
                            
                        </ul>
                        
                        <ul className={styles.moreAbout}>
                            {/* <span onClick={() => history.push(`${url}/webshot`)}>View project details</span> */}
                            <li className={styles.iconBox} onClick={() => window.open("https://redirect.m-prus.uk/Efforts-GitHub_Repository", "_blank")}><i className="fas fa-code fa"></i></li>
                            <li className={styles.iconBox} onClick={() => window.open("https://efforts.m-prus.uk/", "_blank")}><i className="fab fa-chrome fa"></i></li>
                        </ul>
    
                    </div>
                </Route>
            </Switch> 
    
            <Switch>  
                
                <Route exact path={`${path}/efforts`}>
                    <Project 
                        name="Efforts"
                        title="A global platform for measuring efforts."
                    />
                </Route>
            </Switch> 
    
            <Switch>
                <Route exact path={path}>
                    <div className={styles.sectionImage}>
                        <img src={shortnister1} alt="projects_image" />
                    </div>
                    <div className={styles.param}>
                        <h3><span style={{ fontSize: '45px' }}>ShortNister</span></h3>
                        <p>ShortNister - TypeScript React app</p>
                            <p>Take control of your URL address. Meet Shortster, to build a shortcut address. 
                            Get the quick report of the frequency.</p>
                            <p>Right now you know how many times your partners clicked your address.</p>
    
                            {
                                loadingRepos ? null : 
                                <Fragment>
                                    <GithubStats repos={repos} name='ShortNister' />
                                </Fragment>
                            }
                            
    
    
                        <ul className={styles.icons}>
                            <li><img src={imgTypescript} alt="typescript" /><span>TypeScript</span></li>
                            <li><i className="fab fa-react fa-2x"></i><span>React Js</span></li>
                            <li><img src={nestImg} alt="expressjs" /><span>Nest Js</span></li>
                            <li><img src={expressImg} alt="expressjs" /><span>Express Js</span></li>
                            <li><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></li>
                            <li><i className="fas fa-database fa-2x"></i><span>PostgreSQL</span></li>
                            <li><img src={imgMongoDB} alt="mongoDB" /><span>Mongo DB</span></li>
                            <li><img src={imgJest} alt="jest" /><span>Jest</span></li>
                            <li><img src={imgMocha} alt="mocha" /><span>Mocha</span></li>
                        </ul>
                        <ul className={styles.moreAbout}>
                            {/* <span onClick={() => history.push(`${url}/shortnister`)}>View project details</span> */}
                            <li className={styles.iconBox} onClick={() => window.open("https://redirect.m-prus.uk/ShortNister-GitHub_Repository", "_blank")}><i className="fas fa-code fa"></i></li>
                            <li className={styles.iconBox} onClick={() => window.open("https://shortnister.m-prus.uk/", "_blank")}><i className="fab fa-chrome fa"></i></li>
                        </ul>
                    
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
                    <div className={styles.sectionImage}>
                        <img src={onloud1} alt="projects_image" />
                    </div>
                    <div className={styles.param}>
                        <h3><span style={{ fontSize: '45px' }}>onLoud</span></h3>
                        <p>onLoud - JavaScript React app</p>
                            <p>You can share your favorite titles with anyone in any location with the lyrics and your audio. 
                            Play music with friends and family making the meeting special and full of sound.
                            Send messages to chat about the new songs.</p>
                            <p>Intuitive and modern interface, makes listening music easy, expressive, and fun.</p>
                        
                            {
                                loadingRepos ? null : 
                                <Fragment>
                                    <GithubStats repos={repos} name='Bambino' />
                                </Fragment>
                            }
                        <ul className={styles.icons}>
                            <li><img src={imgJavaScript1} alt="javaScript" /><span>JavaScript</span></li>
                            <li><i className="fab fa-react fa-2x"></i><span>React Js</span></li>
                            <li><img src={expressImg} alt="expressjs" /><span>Express Js</span></li>
                            <li><img src={imgRedux} alt="reduxJs" /><span>Redux Js</span></li>
                            <li><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></li>
                            <li><img src={imgMongoDB} alt="mongoDB" /><span>Mongo DB</span></li>
                        </ul>
    
                        <ul className={styles.moreAbout}>
                            {/* <span onClick={() => history.push(`${url}/onloud`)}>View project details</span> */}
                            <li className={styles.iconBox} onClick={() => window.open("https://redirect.m-prus.uk/OnLoud-GitHub_Repository", "_blank")}><i className="fas fa-code fa"></i></li>
                            <li className={styles.iconBox} onClick={() => window.open("https://redirect.m-prus.uk/OnLoud-Lyrics_Platform", "_blank")}><i className="fab fa-chrome fa"></i></li>
                        </ul>
    
                        
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
    
        </article>
        
            <Switch>
                <Route exact path={path}>
                    <h1><Translate tKey="sd.section.repos.headline" /></h1>
                </Route>
            </Switch>
        <article>
    
        <Switch>
                <Route exact path={path}>
                    <div className={styles.sectionImage}>
                        <img src={tsServerExample1} alt="projects_image" />
                    </div>
                    <div className={styles.param}>
                        <h3><span style={{ fontSize: '45px' }}>TypeScript and Python Server Auth Modules</span></h3>
                        <p>Modules to implement a server-side application.</p>
                        <p>It is a reusable module with full user authentication.</p>
                        {
                            loadingRepos ? null : 
                            <Fragment>
                                <GithubStats repos={repos} name='Auth-Server-Examples' />
                            </Fragment>
                        }
                        <ul className={styles.icons}>
                            <li><img src={imgTypescript} alt="typeScript" /><span>TypeScript</span></li>
                            <li><img src={nestImg} alt="nestjs" /><span>Nest Js</span></li>
                            <li><img src={expressImg} alt="expressjs" /><span>Express Js</span></li>
                            <li><i className="fab fa-python fa-2x"></i><span>Django</span></li>
                            <li><i className="fas fa-database fa-2x"></i><span>PostgreSQL</span></li>
                            <li><i className="fas fa-database fa-2x"></i><span>MongoDB</span></li>
                        </ul>
    
                        <ul className={styles.moreAbout}>
                            {/* <span onClick={() => history.push(`${url}/TS-Server-Example`)}>View project details</span> */}
                            <li className={styles.iconBox} onClick={() => window.open("https://redirect.m-prus.uk/Auth_Server_Module-GitHub_Repository", "_blank")}><i className="fas fa-code fa"></i></li>
                            {/* <li className={styles.iconBox} onClick={() => window.open("https://www.linkedin.com/in/mikolaj-prus/", "_blank")}><i className="fab fa-chrome fa"></i></li> */}
                        </ul>
                    
                    </div>
    
                </Route>
            </Switch>           
            
            <Switch>
    
                <Route exact path={path}>
                    <div className={styles.sectionImage}>
                        <img src={webshot1} alt="projects_image" />
                    </div>
                    <div className={styles.param}>
                        <h3><span style={{ fontSize: '45px' }}>WebShot</span></h3>
                        <p>WebShot - JavaScript React app</p>
                            <p>Automated screenshot generator.</p>
    
                            <p>The website allows you to generate screenshots of any website and save them into the Google Drive service.</p>
                        
                            {
                                loadingRepos ? null : 
                                <Fragment>
                                    <GithubStats repos={repos} name='WebShot' />
                                </Fragment>
                            }
    
                        <ul className={styles.icons}>
                            <li><img src={imgJavaScript1} alt="javaScript" /><span>JavaScript</span></li>
                            <li><i className="fab fa-react fa-2x"></i><span>React Js</span></li>
                            <li><img src={expressImg} alt="expressjs" /><span>Express Js</span></li>
                            <li><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></li>
                            <li><i className="fab fa-google-drive fa-2x"></i><span>Google Drive</span></li>
                            <li><img src={imgMachine} alt="machine" /><span>Screenshot Machine</span></li>
                            
                        </ul>
                        
                        <ul className={styles.moreAbout}>
                            {/* <span onClick={() => history.push(`${url}/webshot`)}>View project details</span> */}
                            <li className={styles.iconBox} onClick={() => window.open("https://redirect.m-prus.uk/WebShot-GitHub_Repository", "_blank")}><i className="fas fa-code fa"></i></li>
                            {/* <li className={styles.iconBox} onClick={() => window.open("", "_blank")}><i className="fab fa-chrome fa"></i></li> */}
                        </ul>
    
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
                    <div className={styles.sectionImage}>
                        <img src={emojis1} alt="projects_image" />
                    </div>
                    <div className={styles.param} style={{ marginBottom: '0' }}>
                        <h3><span style={{ fontSize: '45px' }}>Emojis</span></h3>
                        <p>Emojis - JavaScript React Python Django app</p>
    
                        <p>App is currently waiting for deployment.</p>
                            {
                                loadingRepos ? null : 
                                <Fragment>
                                    <GithubStats repos={repos} name='Emojis' />
                                </Fragment>
                            }
                        <ul className={styles.icons}>
                            <li><img src={imgJavaScript1} alt="javaScript" /><span>JavaScript</span></li>
                            <li><i className="fab fa-python fa-2x"></i><span>Django</span></li>
                            <li><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></li>
                            <li><i className="fas fa-database fa-2x"></i><span>PostgreSQL</span></li>
                        </ul>
    
                        <ul className={styles.moreAbout}>
                            {/* <span onClick={() => history.push(`${url}/emojis`)}>View project details</span> */}
                            <li className={styles.iconBox} onClick={() => window.open("https://redirect.m-prus.uk/Emojis-GitHub_Repository", "_blank")}><i className="fas fa-code fa"></i></li>
                            {/* <li className={styles.iconBox}><i className="fab fa-chrome fa"></i></li> */}
                        </ul>    
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
            
            <Switch>
                <Route exact path={path}>
                    <div className={styles.sectionImage}>
                        <img src={niconnect1} alt="projects_image" />
                    </div>
                    <div className={styles.param}>
                        <h3><span style={{ fontSize: '45px' }}>niconnect.uk</span></h3>
                        <p>niconnect - JavaScript PHP app</p>
                        
                        <p>Niconnect make it easy to connect with family, friends or coworkers. Groups are dedicated spaces where you can share updates, photos or documents and message other group members.</p>
                        <p>Stay close with your favorite people using Niconnect.uk.</p>
                        
                            {
                                loadingRepos ? null : 
                                <Fragment>
                                    <GithubStats repos={repos} name='Niconnect.uk' />
                                </Fragment>
                            }
                        <ul className={styles.icons}>
                            <li><i className="fab fa-html5 fa-2x"></i><span>HTML 5</span></li>
                            <li><img src={imgJavaScript1} alt="javaScript" /><span>JavaScript</span></li>
                            <li><i className="fab fa-php fa-2x"></i><span>PHP</span></li>
                            <li><i className="fab fa-css3-alt fa-2x"></i><span>CSS 3</span></li>
                            <li><i className="fas fa-database fa-2x"></i><span>MySql</span></li>
                        </ul>
    
                        <ul className={styles.moreAbout}>
                            {/* <span onClick={() => history.push(`${url}/niconnect`)}>View project details</span> */}
                            <li className={styles.iconBox} onClick={() => window.open("https://github.com/Aragor70/Niconnect.uk", "_blank")}><i className="fas fa-code fa"></i></li>
                            <li className={styles.iconBox} onClick={() => window.open("https://niconnect.uk/", "_blank")}><i className="fab fa-chrome fa"></i></li>
                        </ul>
                    
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
    
        </article>
        
            <Switch>
                <Route exact path={path}>
                    <h1><Translate tKey="sd.section.drafts.headline" /></h1>
                
                    <div className={styles.param} style={{ marginBottom: '30px' }}>
                        <i><Translate tKey="sd.section.drafts.overview" /></i>
                    </div>
                </Route>
            </Switch>
        
            </div>
        </Fragment>
    )
}
export default SDPresentation;