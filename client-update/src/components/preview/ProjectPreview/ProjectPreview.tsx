import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import HtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import autosize from 'autosize';
import clsx from 'clsx';

import { ScrollContext } from '../../../context/ScrollContext';
import GithubStats from '../../GithubStats/GithubStats';
import { Translate } from '../../Translate/Translate';
import { Language } from '../../../utils/constant';
/* 
import { ReactComponent as CommitSvg} from '../style/icons/code-commit-solid.svg'
import { ReactComponent as UpdateSvg} from '../style/icons/refresh-outline.svg'
import { ReactComponent as CreateSvg} from '../style/icons/create-outline.svg' */

import styles from "../../sd/Presentation/SDPresentation.module.scss";

const ProjectPreview = ( props: any ) => {

    const { languageCode = Language.ENGLISH } = props;
    const { style } = props;

    const [ text, setText ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ otherLngVersion, setOtherLngVersion ] = useState(false)

    const [ openEdit, setOpenEdit ] = useState<any>({
        text: false,
        title: false,
        status: false
    })
    const [ editMenu, setEditMenu ] = useState(false)

    const [ formData, setFormData ] = useState<any>({})

    // console.log(formData)

    const toggleEdit = (selector: string | null = null) => {

        if (selector) {
            
            setOpenEdit({ ...openEdit, [selector]: !openEdit[selector] })
            setFormData({ id: props.id })
        }
        
        setEditMenu(!editMenu)

    }

    const handleChange = (e: any) => {
        const element = e.target
        if (element) {
            console.log(element)
            autosize(element);
        }
        
        setFormData({ ...formData, [e.target.name]: e.target.value })
        
    }

/*     const updateProject = async () => {

        try {

        } catch (err: any) {
            console.log(err.message )
        }
    } */
    
    useEffect(() => {

        const value = props?.languageVersions?.filter((element: any) => element.languageCode === languageCode)[0];

        setText(value?.text || '')
        setTitle(value?.title || '')

        setFormData({ ...formData, ...value})

        if (!value && props.languageVersions?.length) {
            setOtherLngVersion(true)
        } else {
            setOtherLngVersion(false)
        }
        // eslint-disable-next-line
    }, [languageCode, props.languageVersions])

    
    const fadeInUpElement: any = useRef(null)

    const { scrollPosition } = useContext(ScrollContext);

    useEffect(() => {

        (() => {
            
            if (fadeInUpElement.current) {
                const element = fadeInUpElement.current
                const element_size = element.getBoundingClientRect()
                const element_position = Math.round(element_size.y) - 100
                const screen_size = window.innerHeight * 0.80
                
                if (element_position <= (screen_size)) {
    
                    element.className = clsx(styles.param, "animated", "fadeInUp")
                } else if (scrollPosition >= 100) {
                    element.className = clsx(styles.param, styles.noOpacity) 
                }
            }

        })()

    }, [scrollPosition])

    return (
        <Fragment>
            <article className={ style?.className || ''}>

                {
                    props.isEditable && <div className="edit-toggle" onClick={() => toggleEdit()}>edit</div>
                }

                {
                    editMenu && <ul className="edit-menu">
                        <li onClick={() => toggleEdit('title')}>Title</li>
                        <li onClick={() => toggleEdit('text')}>Content</li>
                        <li onClick={() => toggleEdit('website')}>Website</li>
                        <li onClick={() => toggleEdit('status')}>Status</li>
                        <li>Repository</li>

                        <li>Add icon</li>
                        <li>Edit icon</li>
                        <li>Delete icon</li>
                        <li>Add image</li>
                        <li>Edit image</li>
                        <li>Delete image</li>
                    </ul>
                }


                <div className={styles.sectionImage}>
                    {
                        !!props.images?.length && <img src={props?.images[0]?.name} alt={props.images[0]?.label} onError={(e: any) => {e.target.style.display = 'none'}} />
                    }
                    
                </div>
                <div className={clsx(styles.param, styles.noOpacity)} ref={fadeInUpElement}>
                    {
                        openEdit['title'] ? <textarea className="textarea" value={formData?.title || ''} name="title" onChange={ (e: any) => handleChange(e)} contentEditable suppressContentEditableWarning placeholder="Write a new title"></textarea> : <h3 className={styles.textCenter}><span style={{ fontSize: '45px' }}>{title || 'Title'}</span></h3>
                    }
                    {
                        openEdit['text'] ? <textarea className="textarea" value={formData?.text || ''} name="text" onChange={ (e: any) => handleChange(e)} contentEditable suppressContentEditableWarning placeholder="Write a new content html"></textarea> : <Fragment>
                            {
                                text && HtmlParser(text)
                            }
                        </Fragment>
                    }
                    
                    {
                        (!props?.repos || (props?.loadingRepos || !props?.repositories[0])) ? null : <GithubStats repos={props?.repos} name={props.repositories[0]?.name} />
                    }

                    
                    {
                        otherLngVersion && <p style={{ color: 'orange' }}><Translate tKey='wrong.language.version' /></p>
                    }


                    <ul className={styles.icons}>
                        {
                            !!props.icons?.length && props?.icons?.map((element: any) => element.isFile ? <li key={element.id} className="icon"><img src={`/assets/icons/${element.name}`} alt={element.label} /><span>{element.label}</span></li> : <li className="icon"  key={element.id}><i className={element.name}></i><span>{element.label}</span></li>)
                        }
                    </ul>
                    
                    <ul className={styles.moreAbout}>

                        {
                            !!props.name && <Link to={`/software_projects/${props.name}`}><Translate tKey='sd.project.link.show.details' /></Link>
                        }

                        {
                            !!props.repositories?.length && <li className={styles.iconBox} onClick={() => window.open(props?.repositories[0]?.url, "_blank")}><i className="fas fa-code fa"></i></li>
                        }

                        {
                            openEdit['website'] ? <textarea className="textarea" value={formData?.website || ''} name="website" onChange={ (e: any) => handleChange(e)} contentEditable suppressContentEditableWarning placeholder="What is the website url?"></textarea> : !!props.website && <li className={styles.iconBox} onClick={() => window.open(props.website, "_blank")}><i className="fab fa-chrome fa"></i></li>
                        }
                        
                    </ul>
                
                </div>

                {
                    openEdit['status'] && <div className="update-window">
                        <h3 className={styles.textCenter}><span style={{ fontSize: '45px' }}>{'Status'}</span></h3>
                    <span>status name</span>
                        <ul>
                            
                            {
                                ['ongoing', 'event', 'online', 'repository', 'draft'].map((element: any, index: number) => <li style={formData?.status === element ? { color: 'green', fontWeight: 900 } : {}} key={index} onClick={() => setFormData({ ...formData, status: element })}>{element}</li>)
                            }
                            
                        </ul>
                        
                        {
                            props.location.pathname.includes('project') && (
                                <div>
                                    <span>order</span>

                                    <input type='text' name="order" value={formData?.order || ''} placeholder="Enter an order by status (default 0)" onChange={(e: any) => handleChange(e)} />
                                </div>
                            )
                        }
                        <button type='button' onClick={() => toggleEdit('status')}>Cancel</button>
                        <button type='button' >Submit</button>
                    </div>
                }
                
            </article>
        </Fragment>
    );
}
export default ProjectPreview;