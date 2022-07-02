import React, { Fragment } from 'react';


const TechPreview = ({ element, setIsHover }: any) => {

    

    return (
        <section className="tech-preview" onClick={() => setIsHover(null)}>
            <label>
                <i className="fas fa-code fa"></i>
                <span>{element}</span>
            </label>
            <ul>
                <li>
                    NiVest
                </li>
                <li>
                    NiVest-Software
                </li>
            </ul>
        </section>
    )
}
export default TechPreview;