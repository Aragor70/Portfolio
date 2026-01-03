import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/server';
import clsx from 'clsx';

import Attacher from '../Attacher/Attacher';
import { Translate } from '../Translate/Translate';
import { PageTitleContext } from '../../context/PageTitleContext';
import TechWithPopup from '../preview/TechPreview/TechWithPopup';
import { skills } from '../../utils/constant';
import CVTemplate from '../../documents/CVTemplate';

import styles from "./CVPresentation.module.scss";

const CVPresentation = () => {
    const { setPageTitle } = useContext(PageTitleContext);
    useEffect(() => {
        setPageTitle(<Translate tKey="label.menu.skills" />)
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

        if (fadeInUpElement.current) {
            fadeInUpElement.current.classList.add(styles.animated)
            fadeInUpElement.current.classList.add(styles.fadeInUp)
            fadeInUpElement.current.classList.remove(styles.noOpacity)
        }
    }, [fadeInUpElement])
    return (
        <div className={clsx(styles.sectionContent, styles.fadeIn)}>
            <Attacher
                htmlFile={ReactDOM.renderToString(<CVTemplate projects={[]} />)}
                fileName="Curriculum_Vitae-Mikolaj_Prus.pdf"
            />
            <div className={styles.param}>
                <h3><Translate tKey="cv.sections.summary.title" /></h3>
                <Translate tKey="cv.sections.summary.text" />
            </div>
            <div className={styles.param}>
            <h3><Translate tKey="cv.sections.tech.title" /></h3>
                <Translate tKey="cv.sections.tech.text" />
            
            </div>
            <div className={styles.param}>
                <h3><Translate tKey="cv.sections.languages.title" /></h3>
                <div className={styles.skillsList}>
                {
                    mapWithComma(skills.languages)
                }
                </div>
                <h3><Translate tKey="cv.sections.frameworks.title" /></h3>
                <div className={styles.skillsList}>
                {
                    mapWithComma(skills.frameworks)
                }
                </div>
                
                <h3><Translate tKey="cv.sections.testing.title" /></h3>
                <div className={styles.skillsList}>
                {
                    mapWithComma(skills.testing)
                }
                </div>
                
                <h3><Translate tKey="cv.sections.databases.title" /></h3>
                <div className={styles.skillsList}>
                {
                    mapWithComma(skills.databases)
                }
                </div>
                    
                <h3><Translate tKey="cv.sections.services.title" /></h3>
                <div className={styles.skillsList}>
                {
                    mapWithComma(skills.services)
                }
                </div>
            </div>
        </div>
    )
}
export default CVPresentation;