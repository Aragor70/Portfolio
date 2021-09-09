import React, { useEffect, useState } from 'react';

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

    const [currentImage, setCurrentImage] = useState<any>(types1)
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const increaseImage = (i: number) => {

        const arry = [
            types1,
            onloud1
        ]

        if (i > arry.length - 1 || i === arry.length - 1) {
            i = arry.length - 1;
            setCurrentIndex(i)
        } else {
            i += 1
            setCurrentIndex(i)
        }

        setCurrentImage(arry[i])

    }
    const decreaseImage = (i: number) => {

        const arry = [
            types1,
            onloud1
        ]

        if (i < 0 || i === 0) {
            i = 0;
            setCurrentIndex(i)
        } else {
            i -= 1
            setCurrentIndex(i)
        }

        setCurrentImage(arry[i])

    }

    console.log(currentImage, currentIndex)

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
                <button onClick={() => decreaseImage(currentIndex)} className="switchButton left">{"<"}</button>
                <img src={currentImage} />
                <button onClick={() => increaseImage(currentIndex)} className="switchButton right">{">"}</button>
            </section>
            {/* <div className="section-content">
                
                {
                    repos && repos.map((repo: any) => <p>{repo.name} </p>)
                }
            </div> */}
        </div>
    );
}
export default withRouter(Home);