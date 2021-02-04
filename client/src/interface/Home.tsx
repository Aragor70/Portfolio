import React, { useEffect } from 'react';

import photo from '../style/avatar.png';
import dsBtn from '../style/ds.png';
import sdBtn from '../style/sd.png';
import cvBtn from '../style/cv.png';
import atBtn from '../style/at.png';
import { withRouter } from 'react-router-dom';

const Home = ({ history, pageTitle, setPageTitle }: any) => {

    useEffect(() => {
        setPageTitle('home')

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])
    

    return (
        <div className="home-content">

            <div className="navi-buttons">
                <div className="navi-button sd" onClick={e=> history.push('/software_development')}>
                <img src={sdBtn} alt="software_development" />
                <span>software development</span>
                </div>
                <div className="navi-button ds" onClick={e=> history.push('/data_science')}>
                <img src={dsBtn} alt="data_science" />
                <span>data science</span>
                </div>
                <div className="navi-button cv" onClick={e=> history.push('/curriculum_vitae')}>
                <img src={cvBtn} alt="curriculum_vitae" />
                <span>curriculum vitae</span>
                </div>
                <div className="navi-button at" onClick={e=> history.push('/contact_mikolaj')}>
                <img src={atBtn} alt="contact_mikolaj" />
                <span>contact</span>
                </div>
            </div>
            <div className="avatar">
                <img src={photo} />
                <span>Mikołaj<span>Prus</span></span>
            </div>
        </div>
    );
}
export default withRouter(Home);