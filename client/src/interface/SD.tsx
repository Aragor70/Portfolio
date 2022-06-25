import React, { Fragment, useContext, useEffect, useState } from 'react';
/* 
import pht from '../style/pht.jpg'; */
import typesImg from '../style/types.png';
/* 
import imgCss from '../style/icons/css.png'; */
/*import imgDjango from '../style/icons/django.png'; 
import imgGithub from '../style/icons/github.png';
import imgHtml from '../style/icons/html-5.png';
import imgJavascript from '../style/icons/javascript.png'; */
import imgJest from '../style/icons/jest.png';
import imgMongoDB from '../style/icons/mongodb.png';
/*import imgMysql from '../style/icons/mysql.png'; 
import imgNodejs from '../style/icons/nodejs.png';
import imgPython from '../style/icons/python.png';
import imgReact from '../style/icons/react.png'; */
import imgRedux from '../style/icons/redux.png';
import imgTypescript from '../style/icons/typescript-icon.svg';
import imgSocketio from '../style/icons/socketio.png';/* 
import imgPhp from '../style/icons/php.png'; */
import imgMocha from '../style/icons/mocha.png';/* 
import imgGoogleDrive from '../style/icons/Google-Drive.png'; */
import imgMachine from '../style/icons/machine.png';
import imgJavaScript1 from '../style/icons/javascript-logo.svg';

import angularImg from '../style/logo-angular.svg'
import reactImg from '../style/logo-react.svg'
import ionicImg from '../style/logo-ionic.svg'
import nestImg from '../style/icons/nestjs-icon.svg'
import expressImg from '../style/icons/expressjs-icon.svg'

import types1 from '../style/types1.png';
import onloud1 from '../style/onloud1.png';
import shortnister1 from '../style/shortnister1.png';
import webshot1 from '../style/webshot1.png';
import efforts1 from '../style/efforts1.png';
import nichess1 from '../style/nichess1.png';
import uhelp1 from '../style/uhelp.online.png';
import nsoftware1 from '../style/nivest-software.png';
import nivest1 from '../style/NiVest1.png';
import tsServerExample1 from '../style/ts-server-example1.jpg';
import emojis1 from '../style/emojis.png';
import niconnect1 from '../style/niconnect.png';

import { Route, Switch, withRouter, useRouteMatch, BrowserRouter as Router, Link } from 'react-router-dom';
import Project from './Project';
import GithubStats from '../components/GithubStats';
import { Translate } from '../components/Translate';
import { getAllRepos } from '../actions/github';
import { getProjects } from '../actions/project';
import ProjectPreview from '../components/preview/ProjectPreview';
import { LanguageContext } from '../context/LanguageContext';
import ListPreview from '../components/preview/ListPreview';
import Loading from '../components/Loading';
import FilterElement from '../components/FilterElement';
import ErrorResponse from '../components/ErrorResponse';

const SD = ({ setPageTitle }: any) => {

    const { path,url } = useRouteMatch();
    useEffect(() => {
        setPageTitle(<Translate tKey="home.menu.projects" />)

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])

    
    const { languageCode } = useContext<any>(LanguageContext);

    const [repos, setRepos] = useState<any[]>([])
    const [loadingRepos, setLoadingRepos] = useState<boolean>(false)
    const [loadingProjects, setLoadingProjects] = useState<boolean>(false)

    const [projects, setProjects] = useState<any[]>([])

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

    return (
        <Router>
            

            <Switch>
                
                
                <Route path={`${url}/:project_name`}>
                    <Project />
                </Route>

                <Route exact path={path}>

                    <div className="section-content">
                    
                        <article>

                            <div>
                            
                            </div>
                            <div className="params">
                                
                                <p>
                                    <Translate tKey="sd.overview" />
                                </p>
                                
                            </div>

                        </article>

                        <FilterElement languageCode={languageCode} setProjects={setProjects} loadValues={getProjects} />

                        
                        {
                            loadingProjects ? <Loading /> : errorResponse ? <ErrorResponse message={errorResponse} style={{ css: { color: 'red' }}} /> : projects.length ? <Fragment>

                                <ListPreview status="ongoing" title={<Translate tKey="sd.section.ongoing.headline" />} style={{ className: 'blue' }} list={projects} Component={ProjectPreview} repos={repos} loadingRepos={loadingRepos} />

                                <ListPreview status="event" title={<Translate tKey="sd.section.events.headline" />} list={projects} Component={ProjectPreview} repos={repos} loadingRepos={loadingRepos} />

                                <ListPreview status="online" title={<Translate tKey="sd.section.online.headline" />} list={projects} Component={ProjectPreview} repos={repos} loadingRepos={loadingRepos} />
                            
                                <ListPreview status="repository" title={<Translate tKey="sd.section.repos.headline" />} list={projects} Component={ProjectPreview} repos={repos} loadingRepos={loadingRepos} />
                                
                                <ListPreview status="draft" title={<Translate tKey="sd.section.drafts.headline" />} list={projects} Component={ProjectPreview} repos={repos} loadingRepos={loadingRepos} />

                            </Fragment> : "Projects not found."
                        }


                    </div>

                </Route>

            </Switch>


        </Router>
            
    );
}
export default withRouter(SD);