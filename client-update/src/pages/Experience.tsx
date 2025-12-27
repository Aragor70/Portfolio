import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Route, Switch, withRouter, useRouteMatch, BrowserRouter as Router } from 'react-router-dom';
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
/* import imgJest from '../style/icons/jest.png';
import imgNodejs from '../style/icons/nodejs.png';
import imgPython from '../style/icons/python.png';
import imgReact from '../style/icons/react.png'; */
/* import imgSocketio from '../style/icons/socketio.png';
import imgPhp from '../style/icons/php.png'; */
/* import imgMocha from '../style/icons/mocha.png';
import imgGoogleDrive from '../style/icons/Google-Drive.png'; */
/* import imgMachine from '../style/icons/machine.png'; */
import { Translate } from '../components/Translate/Translate';
import { getExperiences } from '../actions/experience';
import { LanguageContext } from '../context/LanguageContext';
import { ScrollContext } from '../context/ScrollContext';
import { PageTitleContext } from '../context/PageTitleContext';
import { Language } from '../utils/LanguageConfig';
import ExperiencePresentation from '../components/experience/Presentation/ExperiencePresentation';

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

    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
            setScrollPosition(null);
        };
    }, []);
    
    const [scrollPosition, setScrollPosition] = useState<number | null>(null);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    
    return (
        <Router>
        <ScrollContext.Provider value={{scrollPosition, setScrollPosition}}>
            <Switch>
                <Route exact path={`${path}/:project_name`}>
                    <Project />
                </Route>
                <Route exact path={path}>
                    <ExperiencePresentation
                        projects={projects}
                        loadingProjects={loadingProjects}
                        errorResponse={errorResponse}
                        languageCode={languageCode}
                        setProjects={setProjects}
                        getExperiences={getExperiences}
                    />
                </Route>
            </Switch>
        </ScrollContext.Provider>
        </Router>
            
    );
}
export default withRouter(Experience);