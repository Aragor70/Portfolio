import { email } from "../actions/share";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import downloadIcon from '/assets/icons/download-outline.svg';
import emailIcon from '/assets/icons/share-social-outline.svg';
import jsPDF from "jspdf";

const Attacher = ({ filePath = null, htmlFile = null, fileName = null }: { filePath?: string | null | any , htmlFile?: string | null | any, fileName?: null | string }) => {

    const fadeInUpElement = useRef(null);

    useEffect(() => {

        (() => {
            
            if (fadeInUpElement.current) {
                
                setTimeout(() => {
                    fadeInUpElement.current.classList.add('animated')
                    fadeInUpElement.current.classList.add('fadeInUp')
                    fadeInUpElement.current.classList.remove('no-opacity')
                }, 500)
    
                
            }

        })()

    }, [fadeInUpElement])


    const handleShare = async ( type = 'email' ) => {
        try {

            if (type === 'email') {

                const data = new FormData();
                data.append('name', 'Image Upload');

                data.append('file', emailIcon)

                const payload = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: data
                }
                const res = await email(payload)

                return res;

            }
            



        } catch (err) {
            console.log(err.message)
        }
    }

    const handlePdf = async () => {

        const doc = new jsPDF('p', 'pt', 'a4');

        doc.html(htmlFile, {
            callback: function (doc) {
              doc.save(fileName || 'a4.pdf');
            }
        });



    }


    if (!filePath && !htmlFile) return null;

    return (
        <ul className="uploader-list no-opacity" ref={fadeInUpElement}>
            
            <li>
                {
                    htmlFile ? 
                    <a onClick={() => handlePdf()}>
                        <img src={downloadIcon} alt="get-cv" />
                        <span>
                            Download
                        </span>
                    </a>
                    :
                    <Link to={filePath} target="_blank" download>
                        <img src={downloadIcon} alt="get-cv" />
                        <span>
                            Download
                        </span>
                    </Link>
                }
                
            </li>
            <li>       
                <label onClick={() => handleShare('email')}>
                    <img src={emailIcon} alt="email-cv" />
                    <span>
                        Share
                    </span>
                </label>
            </li>
            
        </ul>
    );
}
export default Attacher;