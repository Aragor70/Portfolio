import React, { useEffect, useRef, useState } from 'react';

import photo from '../style/avatar.png';
import sdBtn from '../style/icons/pic1.png';
import cvBtn from '../style/icons/icon_comercial_management.png';
import skBtn from '../style/icons/Forma-1.png';
import atBtn from '../style/icons/contact_icon.jpg';
import edBtn from '../style/icons/pic3.png';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import types1 from '../style/types1.png';
import onloud1 from '../style/onloud1.png';
import shortnister1 from '../style/shortnister1.png';
import webshot1 from '../style/webshot1.png';

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
    
    const arryImages: any[] = [types1, onloud1, shortnister1, webshot1]
    const [currentIndex, setCurrentIndex] = useState<number>(Math.floor(Math.random() * (arryImages.length || 4)))
    
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

    

    return (
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
                
            </section>
                <ul className="pop-up">
                    <li>
                        <div className="icon-box" onClick={() => window.open("https://www.linkedin.com/in/mikolaj-prus", "_blank")}><i className="fab fa-linkedin fa-2x"></i></div>
                    </li>
                    <li>
                        <div className="icon-box" onClick={() => window.open("https://github.com/Aragor70", "_blank")}><i className="fab fa-github-square fa-2x"></i></div>
                    </li>
                </ul>
            {/* <div className="section-content">
                
                {
                    repos && repos.map((repo: any) => <p>{repo.name} </p>)
                }
            </div> */}
        </div>
    );
}
export default withRouter(Home);