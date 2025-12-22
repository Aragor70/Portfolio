import React, { Fragment, Suspense, useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/server';
/* 
import pht from '../style/pht.jpg'; */
import typesImg from '/assets/images/types.png';
/* 
import imgCss from '../style/icons/css.png'; */
/*import imgDjango from '../style/icons/django.png'; 
import imgGithub from '../style/icons/github.png';
import imgHtml from '../style/icons/html-5.png';
import imgJavascript from '../style/icons/javascript.png'; */
import imgJest from '/assets/icons/jest.png';
import imgMongoDB from '/assets/icons/mongodb.png';
/*import imgMysql from '../style/icons/mysql.png'; 
import imgNodejs from '../style/icons/nodejs.png';
import imgPython from '../style/icons/python.png';
import imgReact from '../style/icons/react.png'; */
import imgRedux from '/assets/icons/redux.png';
import imgTypescript from '/assets/icons/typescript-icon.svg';
import imgSocketio from '/assets/icons/socketio.png';/* 
import imgPhp from '../style/icons/php.png'; */
import imgMocha from '/assets/icons/mocha.png';/* 
import imgGoogleDrive from '../style/icons/Google-Drive.png'; */
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
import { Route, Switch, withRouter, useRouteMatch, BrowserRouter as Router, Link } from 'react-router-dom';
import Project from './Project';
import GithubStats from '../components/GithubStats/GithubStats';
import { Translate } from '../components/Translate/Translate';
import { getAllRepos } from '../actions/github';
import { getProjects } from '../actions/project';
import ProjectPreview from '../components/preview/ProjectPreview/ProjectPreview';
import { LanguageContext } from '../context/LanguageContext';
import ListPreview from '../components/preview/ListPreview/ListPreview';
import Loading from '../components/Loading/Loading';
import FilterElement from '../components/FilterElement/FilterElement';
import ErrorResponse from '../components/ErrorResponse/ErrorResponse';
import { PageTitleContext } from '../context/PageTitleContext';
import { Language } from '../utils/LanguageConfig';
import Attacher from '../components/Attacher/Attacher';
import ProjectsTemplate from '../documents/ProjectsTemplate';
import SDPresentation from '../components/sd/Presentation/SDPresentation';
const SD = () => {
    
    const { path, url } = useRouteMatch();
    return (
        <Suspense fallback={<Loading />}>
            <Router>
                <Switch>
                    
                    <Route path={`${url}/:project_name`}>
                        <Project />
                    </Route>
                    
                    <Route exact path={path}>
                        <SDPresentation  />
                    </Route>
                </Switch>
            </Router>
        </Suspense>
    )
}
export default SD;