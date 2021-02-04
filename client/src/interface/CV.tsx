import React, { Fragment, useEffect } from 'react';


import { withRouter } from 'react-router-dom';

const CV = ({ location, pageTitle, setPageTitle, match }: any) => {

    useEffect(() => {
        setPageTitle('curriculum vitae')
        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])

    return (
        <Fragment>
            <div className="section-content">
                <div className="params">
                <p>SUMMARY</p>
                    My background in personal projects has given me an excellent foundation of problem-solving and focusing on current activities. 
                    Practicing coding and building projects together with my friends had given me a grip on the team-working. 
                    I have always been interested in how modern applications are created and this curiosity, along with my programming steps and level of studies in the field of learning programming languages has greatly influenced my present activities.

                </div>

                <div className="params">
                <p>TECH SKILLS</p>
                    I especially develop <b>JavaScript</b>, <b>TypeScript</b>, and <b>Python</b> web applications in the environment of React Js, Redux, Django, Node js, Express, CSS, and Jest testing libraries. 
                    I provide also Data Science analyses, to describe the business problem and get to know the right solution.

                    I have the fluent knowledge to match database structures <b>SQL</b> and <b>No-SQL</b>.
                
                </div>
                <div className="params">
                <p>LANGUAGES</p>
                    HTML 5, CSS 3, JavaScript, TypeScript, Python, PHP, SQL
                
                <p>OTHER</p>
                <p>Development</p>
                    React, Redux, Node, Express, Django, GIT
                
                <p>Testing libraries</p>
                    Jest, Enzyme, Mocha, Chai
                    
                <p>Services</p>
                    Google Drive, ScreenshotMachine, Heroku, AWS s3 Storage

                </div>
            </div>
        </Fragment>
            
    );
}
export default withRouter(CV);