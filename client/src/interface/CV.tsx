import React, { Fragment, useEffect } from 'react';


import { withRouter } from 'react-router-dom';

const CV = ({ setPageTitle }: any) => {

    useEffect(() => {
        setPageTitle('Skills')
        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])

    return (
        <Fragment>
            <div className="section-content">
                <div className="params">
                <h3>SUMMARY</h3>
                    <p>My background in personal projects has given me an excellent foundation of problem-solving and focusing on current activities. 
                    Practicing coding and building projects together with my friends had given me a grip on the team-working.</p>
                    <p>I have always been interested in how modern applications are created and this curiosity, along with my programming steps and level of studies in the field of learning programming languages has greatly influenced my present activities.</p>

                </div>

                <div className="params">
                <h3>TECH SKILLS</h3>
                    <p>I especially develop <b>JavaScript</b>, <b>TypeScript</b>, and <b>Python</b> web applications in the environment of React Js, Redux, Django, Node js, Express, CSS, and Jest testing libraries. 
                    Also, I provide Data Science analyses, to describe the business problem and get to know the right solution.</p>

                    <p>I have the fluent knowledge to match database structures <b>SQL</b> and <b>No-SQL</b>.</p>
                
                </div>
                <div className="params">
                <h3>LANGUAGES</h3>
                    <p>HTML 5, CSS 3, JavaScript, TypeScript, Python, PHP, SQL</p>
                
                <h3>OTHER</h3>
                <h3>Development</h3>
                    <p>React, Redux, Node, Express, Django, GIT</p>
                
                <h3>Testing libraries</h3>
                    <p>Jest, Enzyme, Mocha, Chai</p>
                    
                <h3>Services</h3>
                    <p>Google Drive, ScreenshotMachine, Heroku, AWS s3 Storage</p>

                </div>
            </div>
        </Fragment>
            
    );
}
export default withRouter(CV);