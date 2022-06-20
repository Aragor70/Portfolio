import React, { Fragment, useEffect, useRef, useState } from 'react';
import HtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import { Language } from '../../utils/constant';
import GithubStats from '../GithubStats';
import { Translate } from '../Translate';
import autosize from 'autosize';
/* 
import { ReactComponent as CommitSvg} from '../style/icons/code-commit-solid.svg'
import { ReactComponent as UpdateSvg} from '../style/icons/refresh-outline.svg'
import { ReactComponent as CreateSvg} from '../style/icons/create-outline.svg' */

const ProjectPreview = ( props: any ) => {

    const { languageCode = Language.ENGLISH } = props;
    const { style } = props;

    const [ text, setText ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ otherLngVersion, setOtherLngVersion ] = useState(false)

    const [ openEdit, setOpenEdit ] = useState<any>({
        text: false,
        title: false
    })
    const [ editMenu, setEditMenu ] = useState(false)

    const [ formData, setFormData ] = useState<any>({
        text: '',
        title: ''
    })

    const toggleEdit = (selector: string | null = null) => {

        if (selector) {
            
            setOpenEdit({ ...openEdit, [selector]: !openEdit[selector] })

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

    }, [languageCode, props.languageVersions])

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


                <div className="section-image">
                    {
                        !!props.images?.length && <img src={props?.images[0]?.name} alt={props.images[0]?.label} onError={(e: any) => {e.target.style.display = 'none'}} />
                    }
                    
                </div>
                <div className="params">
                    {
                        openEdit['title'] ? <textarea className="textarea" value={formData?.title || ''} name="title" onChange={ (e: any) => handleChange(e)} contentEditable suppressContentEditableWarning placeholder="Write a new title"></textarea> : <h3 className="content-center"><span style={{ fontSize: '45px' }}>{title || 'Title'}</span></h3>
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


                    <ul className="icons">
                        {
                            !!props.icons?.length && props?.icons?.map((element: any) => element.isFile ? <li key={element.id} className="icon"><img src={`/assets/icons/${element.name}`} alt={element.label} /><span>{element.label}</span></li> : <li className="icon"  key={element.id}><i className={element.name}></i><span>{element.label}</span></li>)
                        }
                    </ul>
                    
                    <ul className="more-about">

                        {
                            !!props.name && <Link to={`/software_projects/${props.name}`}><Translate tKey='sd.project.link.show.details' /></Link>
                        }

                        {
                            !!props.repositories?.length && <li className="icon-box" onClick={() => window.open(props?.repositories[0]?.url, "_blank")}><i className="fas fa-code fa"></i></li>
                        }

                        {
                            openEdit['website'] ? <textarea className="textarea" value={formData?.website || ''} name="website" onChange={ (e: any) => handleChange(e)} contentEditable suppressContentEditableWarning placeholder="What is the website url?"></textarea> : !!props.website && <li className="icon-box" onClick={() => window.open(props.website, "_blank")}><i className="fab fa-chrome fa"></i></li>
                        }
                        
                    </ul>
                
                </div>
                
            </article>
        </Fragment>
    );
}
export default ProjectPreview;