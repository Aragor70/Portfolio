import React, { Fragment, useEffect } from 'react';


import { withRouter } from 'react-router-dom';
import { Translate } from '../components/Translate';

const CV = ({ setPageTitle }: any) => {

    useEffect(() => {
        setPageTitle(<Translate tKey="home.menu.skills" />)
        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])

    return (
        <Fragment>
            <div className="section-content">
                <div className="params">
                <h3>SUMMARY</h3>
                    <p>
                        My development experience comes from setting myself specific goals to achieve and helping my friends by providing custom software tools and solutions.
                    </p>
                    <p>
                        Development has given me an excellent foundation of problem-solving and focus on current activities. 
                        Practicing coding and building projects together with my friends had given me a grip on the team-working.
                    </p>
                    <p>
                        I have always been interested in how modern applications are created and this curiosity, along with my programming steps, work at Data4you {"&"} BrikkApp, and level of studies in the field of learning programming languages has greatly influenced my present activities.
                    </p>
                </div>

                <div className="params">
                <h3>TECH SKILLS</h3>
                    <p>I especially develop <b>TypeScript</b>, and <b>Python</b> web applications in the environment of React Js / Angular, Redux, Django, Express / Nest Js, CSS, and Jest testing libraries. 
                    Also, I also participate in Data Science analyses, to describe the business problem and get to know the right solution.</p>

                    <p>I have the fluent knowledge to match database structures <b>SQL</b> and <b>No-SQL</b>.</p>
                
                </div>
                <div className="params">
                <h3>LANGUAGES</h3>
                    <p>HTML 5, CSS 3, SCSS, JavaScript, TypeScript, Python, PHP, SQL</p>
                
                <h3>Development</h3>
                    <p>React, Angular, Redux, NestJs, Express, Django, Laravel, GIT</p>
                
                <h3>Testing libraries</h3>
                    <p>Jest, Enzyme, Mocha, Chai</p>
                    
                <h3>Services</h3>
                    <p>Digitalocean, Heroku, Netlify, SocketIO, Google Drive API, ScreenshotMachine API, Amazon s3 Storage</p>

                </div>
            </div>
        </Fragment>
            
    );
}
export default withRouter(CV);