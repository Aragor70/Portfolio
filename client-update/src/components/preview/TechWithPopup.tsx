import React, { Fragment } from 'react';
import TechPreview from './TechPreview';


const TechWithPopup = ({ element, isHover, setIsHover }: any) => {

    const handleClick: any = () => {

        if (isHover === element) {
            setIsHover(null)
        } else {
            setIsHover(element)
        }
    }

    return (
        <Fragment>
            <label className="tech-with-popup">
                <span onClick={handleClick}>
                    {element}
                </span>
                {
                    isHover === element && <TechPreview element={element} isHover={isHover} setIsHover={setIsHover} />
                }
            </label>
        </Fragment>
    )
}
export default TechWithPopup;