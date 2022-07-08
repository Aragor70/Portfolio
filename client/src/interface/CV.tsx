import React, { Fragment, useEffect, useRef, useState } from 'react';

import { withRouter } from 'react-router-dom';
import TechWithPopup from '../components/preview/TechWithPopup';
import { Translate } from '../components/Translate';
import { skills } from '../utils/constant';

const CV = ({ setPageTitle }: any) => {

    useEffect(() => {
        setPageTitle(<Translate tKey="home.menu.skills" />)
        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])

    const [ isHover, setIsHover ] = useState(false)
    
    const mapWithComma = (list: string[]) => {
        return list.map((element: string, index: number) => [
            index > 0 && ", ",
            <TechWithPopup key={index} element={element} isHover={isHover} setIsHover={setIsHover} />])
    }

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
        

    return (
        <Fragment>
            <div className="section-content no-opacity" ref={fadeInUpElement}>
                <div className="params">
                <h3><Translate tKey="cv.sections.summary.title" /></h3>
                    <Translate tKey="cv.sections.summary.text" />
                </div>

                <div className="params">
                <h3><Translate tKey="cv.sections.tech.title" /></h3>
                    <Translate tKey="cv.sections.tech.text" />
                
                </div>
                <div className="params">
                <h3><Translate tKey="cv.sections.languages.title" /></h3>
                <p className="skills-list">
                {
                    mapWithComma(skills.languages)
                }
                </p>


                <h3><Translate tKey="cv.sections.frameworks.title" /></h3>
                <p className="skills-list">
                {
                    mapWithComma(skills.frameworks)
                }
                </p>
                
                <h3><Translate tKey="cv.sections.testing.title" /></h3>
                <p className="skills-list">
                {
                    mapWithComma(skills.testing)
                }
                </p>
                
                <h3><Translate tKey="cv.sections.databases.title" /></h3>
                <p className="skills-list">
                {
                    mapWithComma(skills.databases)
                }
                </p>
                    
                <h3><Translate tKey="cv.sections.services.title" /></h3>
                <p className="skills-list">
                {
                    mapWithComma(skills.services)
                }
                </p>

                </div>
            </div>
        </Fragment>
            
    );
}
export default withRouter(CV);