import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';

import photo from '../style/avatar.png';
/* import sdBtn from '../style/icons/pic1.png'; */
import sdBtn1 from '../style/icons/puzzle-piece-solid.svg';
/* import cvBtn from '../style/icons/icon_comercial_management.png'; */
import cvBtn2 from '../style/icons/image-solid.svg';
import skBtn from '../style/icons/Forma-1.svg';
import atBtn1 from '../style/icons/envelope-regular.svg';
/* import edBtn from '../style/icons/pic3.png'; */
import edBtn2 from '../style/icons/chart-line-solid.svg';
import { withRouter } from 'react-router-dom';
/* import axios from 'axios'; */

import types1 from '../style/types1.png';
import onloud1 from '../style/onloud1.png';
import shortnister1 from '../style/shortnister1.png';
import webshot1 from '../style/webshot1.png';
import efforts1 from '../style/efforts1.png';
import nichess1 from '../style/nichess1.png';
import nivest1 from '../style/NiVest1.png';
import nivest2 from '../style/NiVest2.png';

import nestImg from '../style/icons/nestjs-icon.svg'
import Timeline from '../components/Timeline';
import { Translate } from '../components/Translate';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { PageTitleContext } from '../context/PageTitleContext';
import Uploader from '../components/Uploader';
/* import tsServerExample1 from '../style/ts-server-example1.jpg';
import emojis1 from '../style/emojis.png';
import niconnect1 from '../style/niconnect.png';

import {ReactComponent as Hexagon} from '../style/solutions-hexagon.svg';
import hexagon from '../style/solutions-hexagon.svg';
import gdansk1 from '../style/gdansk1.jpg'; */

const Home = ({ history }: any) => {

    const { setPageTitle } = useContext(PageTitleContext);

    useEffect(() => {
        setPageTitle('home')

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])
    
    
    const arryImages: any[] = [nivest1, nivest2, types1, onloud1, nichess1, shortnister1, webshot1, efforts1]
    const [currentIndex, setCurrentIndex] = useState<number>(Math.floor(Math.random() * (arryImages.length || 5)))
    
    const image = useRef(null)


    useEffect(() => {

        const timer = setInterval(() => {

            if (currentIndex >= arryImages.length - 1) {
                setCurrentIndex(0)
            } else {
                setCurrentIndex(currentIndex + 1)
            }
            
        }, 3500)

        return () => {
            clearInterval(timer)
        }

    }, [currentIndex, arryImages.length])

    /* const [loggedIn, setLoggedIn] = useState(false) */


    return (
        <Fragment>
            <div className="home-content">
                <LanguageSwitcher />
                <div className="avatar box1">
                    <img src={photo} alt="mikolaj_photo" onClick={() => window.open("https://www.linkedin.com/in/mikolaj-prus/", "_blank")} />
                    <span><Translate tKey="home.me.name" /></span>
                </div>
                <h1 className="box2">
                    <Translate tKey="home.me.title" />
                </h1>

                <div className="navi-buttons box3">
                    <div className="navi-button sd" onClick={() => history.push('/work_experience')}>
                        <img src={sdBtn1} alt="software_development" />
                        <nav><Translate tKey="home.menu.experience" /></nav>
                    </div>
                    <div className="navi-button cv" onClick={() => history.push('/software_projects')}>
                        <img src={cvBtn2} alt="software_projects" />
                        <nav><Translate tKey="home.menu.projects" /></nav>
                    </div>
                    <div className="navi-button cv" onClick={() => history.push('/skills')}>
                        <img src={skBtn} alt="skills" />
                        <nav><Translate tKey="home.menu.skills" /></nav>
                    </div>
                    <div className="navi-button ed" onClick={() => history.push('/education')}>
                        <img src={edBtn2} alt="education" />
                        <nav><Translate tKey="home.menu.education" /></nav>
                    </div>
                    <div className="navi-button at" onClick={() => history.push('/contact_mikolaj')}>
                        <img src={atBtn1} alt="contact_mikolaj" />
                        <nav><Translate tKey="home.menu.contact" /></nav>
                    </div>
                    {/* {
                        loggedIn && <Fragment>
                            <div className="navi-button at" onClick={() => history.push('/messages')}>
                                <img src={atBtn} alt="contact_mikolaj" style={{ borderLeft: '1.6px solid #0A1248'}} />
                                <nav>Your Messages</nav>
                            </div>
                        </Fragment>
                    } */}
                </div>
                {/* <section className="frontImage">
                    
                    <img src={arryImages[currentIndex]} alt="projects_image" ref={image} />

                    <div className="number_of_images">
                        {
                            arryImages.map((_, index) => index === currentIndex ? <div key={index} style={{ fontWeight: 'bold' }} onClick={() => setCurrentIndex(index)}>X</div> : <div key={index} onClick={() => setCurrentIndex(index)}>O</div>)
                        }
                    </div>
                    
                </section> */}
                    
                {/* <div className="section-content">
                    
                    {
                        repos && repos.map((repo: any) => <p>{repo.name} </p>)
                    }
                </div> */}
            </div>
            <div className="home-extended">
                
                <section>

                    <div className="section-content" style={{ padding: '15px 0', marginBottom: '70px' }}>
                        <article style={{ padding: '0', minHeight: '70vh' }} className="grid-double">
                            <LanguageSwitcher />
                            
                            <div className="params left">

                                <h3 className="content-center"><span style={{ fontSize: '2.1em' }}><Translate tKey="home.me.name" /></span></h3>
                                <p style={{ fontSize: '1.1em' }}><Translate tKey="home.me.title" /></p>
                                
                                <div className="navi-buttons">
                                    <div className="navi-button sd" onClick={() => history.push('/work_experience')}>
                                        <img src={sdBtn1} alt="software_development"/>{/* #0A1240 #4C5273 */}
                                        <nav><Translate tKey="home.menu.experience" /></nav>
                                    </div>
                                    <div className="navi-button cv" onClick={() => history.push('/software_projects')}>
                                        <img src={cvBtn2} alt="software_projects" />
                                        <nav><Translate tKey="home.menu.projects" /></nav>
                                    </div>
                                    <div className="navi-button cv" onClick={() => history.push('/skills')}>
                                        <img src={skBtn} alt="skills" />
                                        <nav><Translate tKey="home.menu.skills" /></nav>
                                    </div>
                                    <div className="navi-button ed" onClick={() => history.push('/education')}>
                                        <img src={edBtn2} alt="education" />
                                        <nav><Translate tKey="home.menu.education" /></nav>
                                    </div>
                                    <div className="navi-button at" onClick={() => history.push('/contact_mikolaj')}>
                                        <img src={atBtn1} alt="contact_mikolaj" />
                                        <nav><Translate tKey="home.menu.contact" /></nav>
                                    </div>
                                </div>
                            
                            </div>
                            <div className="show">
                                <div className="in-process">
                                    <span>
                                        <Translate tKey="home.message.dev" />
                                    </span>
                                </div>
                                <div>
                                    <img src={arryImages[currentIndex]} alt="projects_image" ref={image} />
                                </div>
                            </div>
                            {/* <div className="params left">
                    
                                <img src={arryImages[currentIndex]} alt="projects_image" ref={image} />

                                <div className="number_of_images">
                                    {
                                        arryImages.map((_, index) => index === currentIndex ? <div key={index} style={{ fontWeight: 'bold' }} onClick={() => setCurrentIndex(index)}>X</div> : <div key={index} onClick={() => setCurrentIndex(index)}>O</div>)
                                    }
                                </div>
                                
                            </div> */}

                            {/* <div className="avatar box1" style={{ margin: '0 auto'}}>
                                <img src={photo} alt="mikolaj_photo" onClick={() => window.open("https://www.linkedin.com/in/mikolaj-prus/", "_blank")} />
                            </div> */}

                
                            {/* <div className="params">
                                <p>
                                    I am a full-stack developer with a good knowledge of developing bespoke software solutions for web and mobile applications. I desire to work in an established company committed to delivering excellent, innovative digital projects completed to the highest possible standards.
                                </p>
                            </div> */}
                        </article>

                    </div>

                </section>

                <section>

                    <div className="params">
                        <Translate tKey="home.sections.overview.headline" />
                    </div>

                </section>

                <section>

                    <article className="grid-double">

                        <div className="params left">
                            <h3 className="content-center"><span style={{ fontSize: '45px' }}><Translate tKey="home.sections.overview.collections.title" /></span></h3>
                            <p><Translate tKey="home.sections.overview.collections.text" /></p>
                            

                            <ul className="icons">
                                <li className="icon"><i className="fas fa-tv fa-2x"></i><span><Translate tKey="home.sections.overview.collections.client" /></span></li>
                                <li className="icon"><i className="fas fa-server fa-2x"></i><span><Translate tKey="home.sections.overview.collections.server" /></span></li>
                                <li className="icon"><i className="fas fa-database fa-2x"></i><span><Translate tKey="home.sections.overview.collections.database" /></span></li>
                            </ul>
                        
                        </div>

                    </article>
                </section>

                <section>
                    <article className="grid-double">


                        <div className="params">
                            
                        </div>
                        <div className="params right">
                            <h3 className="content-center"><span style={{ fontSize: '45px' }}><Translate tKey="home.sections.overview.project.title" /></span></h3>
                            <p><Translate tKey="home.sections.overview.project.text" /></p>

                            <ul className="icons">
                                <li className="icon"><i className="fab fa-angular fa-2x"></i><span>Angular</span></li>
                                <li className="icon"><img src={nestImg} alt="nestjs" /><span>Nest Js</span></li>
                                <li className="icon"><i className="fas fa-palette fa-2x"></i><span>SCSS</span></li>
                            </ul>

                            <ul className="more-about">
                                {/* <span onClick={() => history.push(`${url}/NiVest-Software`)}>View project details</span> */}
                                <li className="icon-box" onClick={() => window.open("https://redirect.m-prus.uk/NiVest_Software-GitHub_Repository", "_blank")}><i className="fas fa-code fa"></i></li>
                                <li className="icon-box" onClick={() => window.open("https://nivest-software.m-prus.uk/", "_blank")}><i className="fab fa-chrome fa"></i></li>
                            </ul>
                        
                        </div>

                    </article>
                </section>

                <section>
                    <article className="grid-double">


                        <div className="params">
                            <Uploader />
                        </div>
                        <div className="params right">
                            
                        
                        </div>

                    </article>
                </section>



                {/* <section className="vertical">
                    <div className="hexagon-list snaps-inline">
                        
                        <div className="params">
                            <label className="hexagon">
                                <img src={nivest1} />
                            </label>
                        </div>
                        <div className="params">
                            <label className="hexagon">
                                <img src={nivest2} />
                            </label>
                        </div>
                        <div className="params">
                            <label className="hexagon">
                                <img src={shortnister1} />
                            </label>
                        </div>
                        <div className="params">
                            <label className="hexagon">
                                <img src={types1} />
                            </label>
                        </div>
                        <div className="params">
                            <label className="hexagon">
                                <img src={nichess1} />
                            </label>
                        </div>
                        <div className="params">
                            <label className="hexagon">
                                <img src={onloud1} />
                            </label>
                        </div>
                        <div className="params">
                            <label className="hexagon">
                                <img src={tsServerExample1} />
                            </label>
                        </div>
                        <div className="params">
                            <label className="hexagon">
                                <img src={niconnect1} />
                            </label>
                        </div>
                        <div className="params">
                            <label className="hexagon">
                                <img src={webshot1} />
                            </label>
                        </div>
                        <div className="params">
                            <label className="hexagon">
                                <img src={emojis1} />
                            </label>
                        </div>
                    </div>

                </section> */}


                {/* <div className="avatar box1">
                    <img src={photo} alt="mikolaj_photo" onClick={() => window.open("https://www.linkedin.com/in/mikolaj-prus/", "_blank")} />
                    <span>Mikołaj Prus</span>
                </div> */}
                

                {/* <div className="navi-buttons box3">
                    <div className="navi-button sd" onClick={() => history.push('/work_experience')}>
                        <img src={sdBtn} alt="software_development" />
                        <nav>Work experience</nav>
                    </div>
                    <div className="navi-button cv" onClick={() => history.push('/software_projects')}>
                        <img src={cvBtn} alt="software_projects" />
                        <nav>Projects</nav>
                    </div>
                    <div className="navi-button cv" onClick={() => history.push('/skills')}>
                        <img src={skBtn} alt="skills" />
                        <nav>Software skills</nav>
                    </div>
                    <div className="navi-button ed" onClick={() => history.push('/education')}>
                        <img src={edBtn} alt="education" />
                        <nav>Education</nav>
                    </div>
                    <div className="navi-button at" onClick={() => history.push('/contact_mikolaj')}>
                        <img src={atBtn} alt="contact_mikolaj" style={{ borderLeft: '1.6px solid #0A1248'}} />
                        <nav>Contact</nav>
                    </div>
                </div>
                <section className="frontImage">
                    
                    <img src={arryImages[currentIndex]} alt="projects_image" ref={image} />

                    <div className="number_of_images">
                        {
                            arryImages.map((_, index) => index === currentIndex ? <div key={index} style={{ fontWeight: 'bold' }} onClick={() => setCurrentIndex(index)}>X</div> : <div key={index} onClick={() => setCurrentIndex(index)}>O</div>)
                        }
                    </div>
                    
                </section> */}
                    
                {/* <div className="section-content">
                    
                    {
                        repos && repos.map((repo: any) => <p>{repo.name} </p>)
                    }
                </div> */}


                {/* <section className="dark-light">

                    <div>
                        
                        <h3>My commercial experience</h3>
                        <p>
                            Mission is to increase the number of people doing their best work.
                        </p>

                    </div>

                </section>

                <Timeline /> */}
            </div>
        </Fragment>
    );
}
export default withRouter(Home);