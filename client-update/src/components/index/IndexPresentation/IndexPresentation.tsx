import React, { Fragment, useRef } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";

import nestImg from "/assets/icons/nestjs-icon.svg";
import { Translate } from "../../Translate/Translate";
import LanguageSwitcher from "../../LanguageSwitcher/LanguageSwitcher";
import photo from "/assets/icons/avatar.png";
import sdBtn1 from "/assets/icons/puzzle-piece-solid.svg";
import cvBtn2 from "/assets/icons/image-solid.svg";
import skBtn from "/assets/icons/Forma-1.svg";
import atBtn1 from "/assets/icons/envelope-regular.svg";
import edBtn2 from "/assets/icons/chart-line-solid.svg";
import circle from "/assets/components/circle.svg";
import types1 from "/assets/images/types1.png";
import onloud1 from "/assets/images/onloud1.png";
import shortnister1 from "/assets/images/shortnister1.png";
import webshot1 from "/assets/images/webshot1.png";
import efforts1 from "/assets/images/efforts1.png";
import nichess1 from "/assets/images/nichess1.png";
import nivest1 from "/assets/images/NiVest1.png";
import nivest2 from "/assets/images/NiVest2.png";
import useSlider from "./hooks/useSlider";
import CustomLine from "../../CustomLine/CustomLine";

import styles from "./IndexPresentation.module.scss";

const IndexPresentation = () => {
    const image = useRef(null);
    const history = useHistory();

    const arryImages = [
        nivest1, nivest2, types1, onloud1, nichess1, shortnister1, webshot1, efforts1
    ];

    const { currentIndex } = useSlider(arryImages.length);

    const navigationButtons = [
        { path: '/work_experience', icon: sdBtn1, label: 'home.menu.experience' },
        { path: '/software_projects', icon: cvBtn2, label: 'home.menu.projects' },
        { path: '/skills', icon: skBtn, label: 'home.menu.skills' },
        { path: '/education', icon: edBtn2, label: 'home.menu.education' },
        { path: '/contact_mikolaj', icon: atBtn1, label: 'home.menu.contact' },
    ];

    const renderNavigationButtons = () => (
        <div className={styles.naviButtons}>
            {navigationButtons.map(({ path, icon, label }) => (
                <div key={path} onClick={() => history.push(path)}>
                    <img src={icon} alt={label} />
                    <nav><Translate tKey={label} /></nav>
                </div>
            ))}
        </div>
    );

    return (
        <Fragment>
            <div className={styles.homeContent}>
                <LanguageSwitcher className={styles.languageSwitcher}/>
                <div className={clsx(styles.avatar)}>
                    <img
                        src={photo}
                        alt="mikolaj_photo"
                        onClick={() => window.open("https://www.linkedin.com/in/mikolaj-prus/", "_blank")}
                    />
                    <span><Translate tKey="home.me.name" /></span>
                </div>
                <h1><Translate tKey="home.me.title" /></h1>
                {renderNavigationButtons()}
            </div>

            <div className={styles.homeExtended}>
                <section className={styles.sectionContent}>
                    <LanguageSwitcher className={styles.languageSwitcher} />
                    <article className={styles.gridDouble} style={{ paddingBlock: "30px" }}>
                        
                        <div className={clsx(styles.param, "center", styles.frontCard)} style={{ maxWidth: "400px", rowGap: "10px" }}>
                            <h3>
                                <span style={{ fontSize: '2.1em' }}><Translate tKey="home.me.name" /></span>
                            </h3>
                            <p style={{ fontSize: '1.1em' }}><Translate tKey="home.me.title" /></p>
                            {renderNavigationButtons()}
                        </div>
                        <div className={styles.hexagon}>
                            <div>
                                <img
                                    src={arryImages[currentIndex]}
                                    alt="projects_image"
                                    ref={image}
                                />
                            </div>
                        </div>
                    </article>
                </section>

                <section>
                    <div className={clsx(styles.param, styles.noShadow, styles.textCenter)}>
                        <Translate tKey="home.sections.overview.headline" />
                    </div>
                </section>

                <section>
                    <article className={styles.gridDouble}>
                        <div className={clsx(styles.param, "left", styles.noShadow, styles.noGaps)}>
                            <h3>
                                <span style={{ fontSize: '45px' }}><Translate tKey="home.sections.overview.collections.title" /></span>
                            </h3>
                            <p><Translate tKey="home.sections.overview.collections.text" /></p>
                            <ul className={styles.icons}>
                                <li><i className="fas fa-tv fa-2x"></i><span><Translate tKey="home.sections.overview.collections.client" /></span></li>
                                <li><i className="fas fa-server fa-2x"></i><span><Translate tKey="home.sections.overview.collections.server" /></span></li>
                                <li><i className="fas fa-database fa-2x"></i><span><Translate tKey="home.sections.overview.collections.database" /></span></li>
                            </ul>
                        </div>
                    </article>
                </section>

                <section>
                    <article className={styles.gridDouble}>
                        <div></div>
                        <div className={clsx(styles.param, "right", styles.noShadow)}>
                            <h3>
                                <span style={{ fontSize: '45px' }}><Translate tKey="home.sections.overview.project.title" /></span>
                            </h3>
                            <p><Translate tKey="home.sections.overview.project.text" /></p>
                            <ul className={styles.icons}>
                                <li><i className="fab fa-angular fa-2x"></i><span>Angular</span></li>
                                <li><img src={nestImg} alt="nestjs" /><span>Nest Js</span></li>
                                <li><i className="fas fa-palette fa-2x"></i><span>SCSS</span></li>
                            </ul>
                            <ul className={styles.moreAbout}>
                                <li className={styles.iconBox} onClick={() => window.open("https://redirect.m-prus.uk/NiVest_Software-GitHub_Repository", "_blank")}>
                                    <i className="fas fa-code fa"></i>
                                </li>
                                <li className={styles.iconBox} onClick={() => window.open("https://nivest-software.m-prus.uk/", "_blank")}>
                                    <i className="fab fa-chrome fa"></i>
                                </li>
                            </ul>
                        </div>
                    </article>
                </section>
            </div>
        </Fragment>
    );
};

export default IndexPresentation;

/* 

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
                    
                </div>

                <img src={circle} alt="circle" />

            </div>

            <div className="home-extended">
                
                <section className="section-content">

                        <LanguageSwitcher />

                        <article className="grid-double">

                            <div className="params left">

                                <h3 className="content-center"><span style={{ fontSize: '2.1em' }}><Translate tKey="home.me.name" /></span></h3>
                                <p style={{ fontSize: '1.1em' }}><Translate tKey="home.me.title" /></p>
                                
                                <div className="navi-buttons">
                                    <div className="navi-button sd" onClick={() => history.push('/work_experience')}>
                                        <img src={sdBtn1} alt="software_development"/>
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
                            
                        </article>

                </section>

                <section>

                    <div className="params">
                        <Translate tKey="home.sections.overview.headline" />
                    </div>
                </section>

                
                <section>

                    <div>

                            <h3 className="content-center"><span style={{ fontSize: '45px' }}><Translate tKey="home.sections.overview.collections.title" /></span></h3>
                            <p><Translate tKey="home.sections.overview.collections.text" /></p>
                            

                            <ul className={styles.icons}>
                                <li className="icon"><i className="fas fa-tv fa-2x"></i><span><Translate tKey="home.sections.overview.collections.client" /></span></li>
                                <li className="icon"><i className="fas fa-server fa-2x"></i><span><Translate tKey="home.sections.overview.collections.server" /></span></li>
                                <li className="icon"><i className="fas fa-database fa-2x"></i><span><Translate tKey="home.sections.overview.collections.database" /></span></li>
                            </ul>
                        
                    </div>
                </section>

                <section>

                    <article className="grid-double">

                        <div className="params left">
                            <h3 className="content-center"><span style={{ fontSize: '45px' }}><Translate tKey="home.sections.overview.collections.title" /></span></h3>
                            <p><Translate tKey="home.sections.overview.collections.text" /></p>
                            

                            <ul className={styles.icons}>
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

                            <ul className={styles.icons}>
                                <li className="icon"><i className="fab fa-angular fa-2x"></i><span>Angular</span></li>
                                <li className="icon"><img src={nestImg} alt="nestjs" /><span>Nest Js</span></li>
                                <li className="icon"><i className="fas fa-palette fa-2x"></i><span>SCSS</span></li>
                            </ul>

                            <ul className="more-about">
                                <li className={styles.iconBox} onClick={() => window.open("https://redirect.m-prus.uk/NiVest_Software-GitHub_Repository", "_blank")}><i className="fas fa-code fa"></i></li>
                                <li className={styles.iconBox} onClick={() => window.open("https://nivest-software.m-prus.uk/", "_blank")}><i className="fab fa-chrome fa"></i></li>
                            </ul>
                        
                        </div>

                    </article>
                </section>
                <section>
                    
                    <CustomLine />
                
                </section>
                <section>
                    

                
                </section>
            </div>
        </Fragment>

*/