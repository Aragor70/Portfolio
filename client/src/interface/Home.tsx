import React, { Fragment, useEffect, useRef, useState } from 'react';

import photo from '../style/avatar.png';
import sdBtn from '../style/icons/pic1.png';
import sdBtn1 from '../style/icons/puzzle-piece-solid.svg';
import cvBtn from '../style/icons/icon_comercial_management.png';
import cvBtn2 from '../style/icons/image-solid.svg';
import skBtn from '../style/icons/Forma-1.png';
import atBtn1 from '../style/icons/envelope-regular.svg';
import edBtn from '../style/icons/pic3.png';
import edBtn2 from '../style/icons/chart-line-solid.svg';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import types1 from '../style/types1.png';
import onloud1 from '../style/onloud1.png';
import shortnister1 from '../style/shortnister1.png';
import webshot1 from '../style/webshot1.png';
import nichess1 from '../style/nichess1.png';
import nivest1 from '../style/NiVest1.png';
import nivest2 from '../style/NiVest2.png';
import tsServerExample1 from '../style/ts-server-example1.jpg';
import emojis1 from '../style/emojis.png';
import niconnect1 from '../style/niconnect.png';

import {ReactComponent as Hexagon} from '../style/solutions-hexagon.svg';
import hexagon from '../style/solutions-hexagon.svg';
import gdansk1 from '../style/gdansk1.jpg';

const Home = ({ history, setPageTitle }: any) => {

    useEffect(() => {
        setPageTitle('home')

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])
    
    const [repos, setRepos] = useState([])
    useEffect(() => {
        const getRepos = async() => {
            try {
                const res = await axios.get('https://api.github.com/users/Aragor70/repos')

                setRepos(res.data)
            } catch (err: any) {
                console.log(err.message)
            }
            
        }
        getRepos()

        return () => {
            setRepos([])
        }

    }, [])

    console.log(repos)
    
    const arryImages: any[] = [nivest1, nivest2, types1, onloud1, nichess1, shortnister1, webshot1]
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
            console.log('clear')
        }

    }, [currentIndex, arryImages.length])

    /* const [loggedIn, setLoggedIn] = useState(false) */

    return (
        <Fragment>
            <div className="home-content">

                <div className="avatar box1">
                    <img src={photo} alt="mikolaj_photo" onClick={() => window.open("https://www.linkedin.com/in/mikolaj-prus/", "_blank")} />
                    <span>Mikołaj Prus</span>
                </div>
                <h1 className="box2">
                    Full-Stack Software Enginner
                </h1>

                <div className="navi-buttons box3">
                    <div className="navi-button sd" onClick={() => history.push('/work_experience')}>
                        <img src={sdBtn1} alt="software_development" />
                        <nav>Work experience</nav>
                    </div>
                    <div className="navi-button cv" onClick={() => history.push('/software_projects')}>
                        <img src={cvBtn2} alt="software_projects" />
                        <nav>Projects</nav>
                    </div>
                    <div className="navi-button cv" onClick={() => history.push('/skills')}>
                        <img src={skBtn} alt="skills" />
                        <nav>Software skills</nav>
                    </div>
                    <div className="navi-button ed" onClick={() => history.push('/education')}>
                        <img src={edBtn2} alt="education" />
                        <nav>Education</nav>
                    </div>
                    <div className="navi-button at" onClick={() => history.push('/contact_mikolaj')}>
                        <img src={atBtn1} alt="contact_mikolaj" />
                        <nav>Contact</nav>
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
                        <article style={{ padding: '0' }}>

                            
                            <div className="params left">

                                <h3 className="content-center"><span style={{ fontSize: '2.1em' }}>Mikołaj Prus</span></h3>
                                <p style={{ fontSize: '1.1em' }}>Full-Stack Software Enginner</p>
                                
                                <div className="navi-buttons">
                                    <div className="navi-button sd" onClick={() => history.push('/work_experience')}>
                                        <img src={sdBtn1} alt="software_development"/>{/* #0A1240 #4C5273 */}
                                        <nav>Work experience</nav>
                                    </div>
                                    <div className="navi-button cv" onClick={() => history.push('/software_projects')}>
                                        <img src={cvBtn2} alt="software_projects" />
                                        <nav>Projects</nav>
                                    </div>
                                    <div className="navi-button cv" onClick={() => history.push('/skills')}>
                                        <img src={skBtn} alt="skills" />
                                        <nav>Software skills</nav>
                                    </div>
                                    <div className="navi-button ed" onClick={() => history.push('/education')}>
                                        <img src={edBtn2} alt="education" />
                                        <nav>Education</nav>
                                    </div>
                                    <div className="navi-button at" onClick={() => history.push('/contact_mikolaj')}>
                                        <img src={atBtn1} alt="contact_mikolaj" />
                                        <nav>Contact</nav>
                                    </div>
                                </div>
                            
                            </div>
                            <div className="show">
                                
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
                        Overview of my work
                    </div>

                </section>

                <section>

                    <article>

                        <div className="params left">
                            <h3 className="content-center"><span style={{ fontSize: '45px' }}>Project collections</span></h3>
                            <p>I am developing software for web and mobile software services. I desire to deliver excellent, innovative digital projects completed to the highest possible standards.</p>
                            

                            <p className="icons">
                                <div className="icon"><i className="fas fa-tv fa-2x"></i><span>Front-end</span></div>
                                <div className="icon"><i className="fas fa-server fa-2x"></i><span>Back-end</span></div>
                                <div className="icon"><i className="fas fa-database fa-2x"></i><span>Database</span></div>
                            </p>
                        
                        </div>

                    </article>
                </section>

                <section>
                    <article>


                        <div className="params">
                            
                        </div>
                        <div className="params right">
                            <h3 className="content-center"><span style={{ fontSize: '45px' }}>Content management</span></h3>
                            <p>Website service lets you easily manage the content in range of our services without understanding any programming code.</p>

                            <p className="icons">
                                <div className="icon"><i className="fab fa-angular fa-2x"></i><span>Angular</span></div>
                                <div className="icon"><i className="fab fa-node fa-2x"></i><span>Nest Js</span></div>
                                <div className="icon"><i className="fas fa-palette fa-2x"></i><span>SCSS</span></div>
                            </p>

                            <p className="more-about" >
                                {/* <span onClick={() => history.push(`${url}/NiVest-Software`)}>View project details</span> */}
                                <div className="icon-box" onClick={() => window.open("https://redirect.m-prus.uk/NiVest_Software-GitHub_Repository", "_blank")}><i className="fas fa-code fa"></i></div>
                                <div className="icon-box" onClick={() => window.open("https://nivest-software.m-prus.uk/", "_blank")}><i className="fab fa-chrome fa"></i></div>
                            </p>
                        
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
            </div>
        </Fragment>
    );
}
export default withRouter(Home);