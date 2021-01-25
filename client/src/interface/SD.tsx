import React, { Fragment, useEffect } from 'react';

import pht from '../style/pht.jpg';
import typesImg from '../style/typesReadMe.png';

import imgCss from '../style/icons/css.png';
import imgDjango from '../style/icons/django.png';
import imgGithub from '../style/icons/github.png';
import imgHtml from '../style/icons/html-5.png';
import imgJavascript from '../style/icons/javascript.png';
import imgJest from '../style/icons/jest.png';
import imgMongoDB from '../style/icons/mongodb.png';
import imgMysql from '../style/icons/mysql.png';
import imgNodejs from '../style/icons/nodejs.png';
import imgPython from '../style/icons/python.png';
import imgReact from '../style/icons/react.png';
import imgRedux from '../style/icons/redux.png';
import imgTypescript from '../style/icons/typescript.png';
import imgSocketio from '../style/icons/socketio.png';
import imgPhp from '../style/icons/php.png';







import { withRouter } from 'react-router-dom';

const SD = ({ location, pageTitle, setPageTitle, match }: any) => {

    useEffect(() => {
        setPageTitle('sotfware development')
    }, [])

    return (
        <Fragment>
            <div className="section-content">
                

            <div className="params">
                
                <img src={pht} style={{ width: '100%', borderRadius: '7.5px' }} />
                I especially develop JavaScript, TypeScript, and Python web applications in the environment of React Js, Redux, Django, Node js, Express, CSS, and Jest testing libraries. 
                This page is right to overview the tech development.
                
            </div>

            <h1>Current projects</h1>
            
            <div className="params">
                <p className="content-center"><img src={ typesImg } /></p>
                <p>Real-Time TypeScript React app</p>
                    You can communicate with anyone in any location with the reliability of texting and the richness of chat. 
                    Connect with friends and family, send photos, videos, GIFs, emoji, and more.
                    Intuitive and modern, Types makes conversations easy, expressive, and fun.
                <p>
                    <img src={imgJavascript} className="icon10" />
                    <img src={imgTypescript} className="icon10" />
                    <img src={imgCss} className="icon10" />
                    <img src={imgReact} className="icon10" />
                    <img src={imgNodejs} className="icon10" />
                    <img src={imgRedux} className="icon10" />
                    <img src={imgMongoDB} className="icon10" />
                    <img src={imgGithub} className="icon10" />
                    <img src={imgSocketio} className="icon10" />
                    <img src={imgJest} className="icon10" />
                </p>
                
            </div>

            <h1>Deployed projects</h1>

            <div className="params">
                <p className="content-center"><span style={{ fontSize: '45px' }}>onLoud</span></p>
                <p>onLoud - JavaScript React app</p>
                    You can share your favorite titles with anyone in any location with the lyrics and your audio. 
                    Play music with friends and family making the meeting special and full of sound.
                    Send messages to chat about the new songs.
                    Intuitive and modern interface, makes listening music easy, expressive, and fun.
                
                <p>
                    <img src={imgJavascript} className="icon10" />
                    <img src={imgCss} className="icon10" />
                    <img src={imgReact} className="icon10" />
                    <img src={imgNodejs} className="icon10" />
                    <img src={imgRedux} className="icon10" />
                    <img src={imgMongoDB} className="icon10" />
                    <img src={imgGithub} className="icon10" />
                </p>
            </div>

            <div className="params">
                <p className="content-center"><span style={{ fontSize: '45px' }}>niconnect.uk</span></p>
                <p>niconnect - JavaScript PHP app</p>
                
                Niconnect make it easy to connect with family, friends or coworkers. Groups are dedicated spaces where you can share updates, photos or documents and message other group members.
                Stay close with your favorite people using Niconnect.uk.
                  
                <p>
                    <img src={imgJavascript} className="icon10" />
                    <img src={imgPhp} className="icon10" />
                    <img src={imgCss} className="icon10" />
                    <img src={imgMysql} className="icon10" />
                    <img src={imgGithub} className="icon10" />
                </p>
            </div>

            <h1>Drafts</h1>

            <div className="params">
                <i>Draft projections include projects temporarily stopped development, waiting for deployment</i>
            </div>
            
            <div className="params">
                <p className="content-center"><span style={{ fontSize: '45px' }}>Emojis</span></p>
                <p>Emojis - React JavaScript Django Python app</p>

                App is currently waiting for deployment.

                    
            </div>

            </div>
        </Fragment>
            
    );
}
export default withRouter(SD);