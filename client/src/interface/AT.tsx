import React, { Fragment, useEffect, useRef, useState } from 'react';

import imgEngineers from '../style/icons/engineers.png';
import autosize from 'autosize';

import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Translate } from '../components/Translate';
import ErrorResponse from '../components/ErrorResponse';

const AT = ({ setPageTitle }: any) => {

    useEffect(() => {
        setPageTitle(<Translate tKey="home.menu.contact" />)

        return () => {
            setPageTitle('')
        }
    }, [setPageTitle])

    const messageText: any = useRef(null)

    const [openMessage, setOpenMessage] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState(false)
    const [output, setOutput] = useState('')
    const [errorResponse, setErrorResponse] = useState('')

    /* const [subject, setSubject] = useState('') */

    const [formData, setFormData] = useState<any>({
        from: "",
        message: ""
    })

    const handleChange = (e: any) => {
        
        autosize(messageText.current);
        setFormData({ ...formData, [e.target.name]: e.target.value })
        
    }
    const handleSubmit = async () => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            setLoadingMessage(true)

            const response = await axios.post('https://api.m-prus.uk/api/contact', formData, config)

            console.log(response)

            setLoadingMessage(false)

            setFormData({})
            setOutput('Done')
            setErrorResponse('')

        } catch (err: any) {
            setErrorResponse('error.message')
            setLoadingMessage(false)
        }
        
    }
    useEffect(() => {
        
        setErrorResponse('')
        setOutput('')

    }, [openMessage])


    const fadeInUpElement: any = useRef(null)

    useEffect(() => {

        (() => {
            
            if (fadeInUpElement.current) {
                
                fadeInUpElement.current.classList.add('animated')
                fadeInUpElement.current.classList.add('fadeInUp')
                fadeInUpElement.current.classList.remove('no-opacity')
            }

        })()

    }, [fadeInUpElement])

    return (
        <Fragment>
            <div className="section-content">
                <div className="params no-opacity" style={{ margin: 'auto'}} ref={fadeInUpElement}>
                
                    <p style={{ display: 'flex', justifyContent: "center" }}><img src={imgEngineers} alt="engineer" /></p>

                    <p><Translate tKey="at.text" /></p>
                    <p>
                        mikey.prus@gmail.com
                    </p>
                    <ul style={{ padding: '0 40px', listStyle: 'none', margin: '7.5px 0' }}>
                    
                        <li className="icon-box"><i className="fab fa-linkedin fa-2x" onClick={() => window.open("https://www.linkedin.com/in/mikolaj-prus", "_blank")}></i></li>
                    </ul>

                    <ul className="more-about">
                        <li className="icon-box" style={{ borderRadius: '0', boxShadow: 'none' }} onClick={() => setOpenMessage(!openMessage)}><button><Translate tKey="at.form.headline" /></button></li>

                    </ul>

                </div>

                {/* {
                    openMessage && <Fragment>
                        <div className="params">
                            
                            <h3 style={{ textAlign: 'center' }}>What is the subject?</h3>
                            <ul className="subjects">
                                <li onClick={() => setSubject('Feedback')}>
                                    Feedback
                                </li>
                                <li onClick={() => setSubject('Other')}>
                                    Other
                                </li>
                            </ul>

                        </div>
                    </Fragment>
                } */}
                {
                    openMessage && <Fragment>
                        <div className="params">
                            
                            {
                                loadingMessage ? <Fragment>
                                    <p className="output-response"><Translate tKey="loading" /></p>
                                </Fragment> : errorResponse ? <ErrorResponse message={errorResponse} style={{ css: { color: 'red' }}} /> : <Fragment>

                                    {
                                        output ? <Fragment>
                                            <ul className="output-response" style={{ padding: '0 40px', listStyle: 'none', margin: '7.5px 0' }}>

                                                <div className="icon-box">
                                                    {
                                                        output === "Done" ? <i style={{ color: 'green' }} className="fas fa-check fa-4x" onClick={() => setOpenMessage(false)}></i> : <i style={{ color: 'red' }} className="fas fa-times fa-4x" onClick={() => setOpenMessage(false)}></i>
                                                    }
                                                </div>
                                            
                                            </ul>
                                        </Fragment> : <Fragment>
                                            <h3 style={{ textAlign: 'center', position: 'relative' }}><Translate tKey="at.form.headline" /></h3>
                                        
                                            <ul className="message-form">
                                                <li>
                                                    <h6 style={{ textAlign: 'left', position: 'relative' }}><Translate tKey="at.form.from" />:
                                                    
                                                    {
                                                        formData.from && <div className="icon-box" style={{ position: 'absolute', right: '0', top: '0' }}><i className="fas fa-backspace fa-2x" onClick={() => setFormData({ ...formData, from: ''})}></i></div>
                                                    }
                                                    


                                                    </h6>
                                                    <input type="text" name="from" value={formData.from || ''} onChange={ (e: any) => handleChange(e)} placeholder={'contact@anonymous.com (optional)'} />
                                                </li>
                                                {/* <li>
                                                    <h6 style={{ textAlign: 'left', position: 'relative' }}><Translate tKey="at.form.subject" />:
                                                    {
                                                        formData.subject && <div className="icon-box" style={{ position: 'absolute', right: '0', top: '0' }}><i className="fas fa-backspace fa-2x" onClick={() => setFormData({ ...formData, subject: ''})}></i></div>
                                                    }

                                                    </h6>
                                                    <input type="text" name="subject" value={formData.subject || ''} onChange={ (e: any) => handleChange(e)} placeholder={formData.subject || 'Other'} />
                                                </li> */}
                                                <li>
                                                    <h6 style={{ textAlign: 'left', position: 'relative' }}><Translate tKey="at.form.message" />: 
                                                    {
                                                        formData.text && <div className="icon-box" style={{ position: 'absolute', right: '0', top: '0' }}><i className="fas fa-backspace fa-2x" onClick={() => setFormData({ ...formData, text: ''})}></i></div>
                                                    }
                                                    </h6>
                                                    <textarea ref={messageText} className="textarea" value={formData.message || ''} name="message" onChange={ (e: any) => handleChange(e)} contentEditable suppressContentEditableWarning placeholder="What will you write today?"></textarea>    
                                                    
                                                </li>
                                            </ul>
                                            <ul className="more-about">
                                                <li className="icon-box" style={{ borderRadius: '0', boxShadow: 'none' }}><button onClick={() => handleSubmit()}><Translate tKey="at.form.submit" /></button></li>
                                            </ul>

                                        </Fragment>
                                    }

                                </Fragment>
                            }
                            

                        </div>
                    </Fragment>
                }
            </div>
        </Fragment>
            
    );
}
export default withRouter(AT);