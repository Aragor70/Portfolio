import Attacher from '@/components/Attacher';
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';

import { withRouter } from 'react-router-dom';
import TechWithPopup from '../components/preview/TechWithPopup';
import { Translate } from '../components/Translate';
import { PageTitleContext } from '../context/PageTitleContext';
import { skills } from '../utils/constant';

const CV = () => {

    const { setPageTitle } = useContext(PageTitleContext);

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

    const fadeInUpElement = useRef(null)

    useEffect(() => {

        (async () => {
            
            if (fadeInUpElement.current) {
                await fadeInUpElement.current.classList.add('animated')
                await fadeInUpElement.current.classList.add('fadeInUp')
                await fadeInUpElement.current.classList.remove('no-opacity')
            }

        })()

    }, [fadeInUpElement])
        

    return (
        <Fragment>
            <div className="section-content fade-in">
                
            <Attacher filePath={"/assets/attachments/Mikolaj_Prus.pdf"} />

            
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
                <div className="skills-list">
                {
                    mapWithComma(skills.languages)
                }
                </div>


                <h3><Translate tKey="cv.sections.frameworks.title" /></h3>
                <div className="skills-list">
                {
                    mapWithComma(skills.frameworks)
                }
                </div>
                
                <h3><Translate tKey="cv.sections.testing.title" /></h3>
                <div className="skills-list">
                {
                    mapWithComma(skills.testing)
                }
                </div>
                
                <h3><Translate tKey="cv.sections.databases.title" /></h3>
                <div className="skills-list">
                {
                    mapWithComma(skills.databases)
                }
                </div>
                    
                <h3><Translate tKey="cv.sections.services.title" /></h3>
                <div className="skills-list">
                {
                    mapWithComma(skills.services)
                }
                </div>

                </div>
            </div>
        </Fragment>
            
    );
}
export default withRouter(CV);