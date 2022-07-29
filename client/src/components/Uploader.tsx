import { Fragment, useEffect, useState } from "react";
import downloadIcon from '../style/icons/download-outline.svg';
import emailIcon from '../style/icons/mail-outline.svg';

const Uploader = () => {

    const [ isOpen, setIsOpen ] = useState(false);

    useEffect(() => {
        setIsOpen(false);

        return () => {
            setIsOpen(false)
        }
    }, [])

    const handleDownload = () => {
        try {

            
        } catch (err: any) {
            console.log(err.message)
        }
    }


    return (
            <ul className="uploader-list">
                <li>
                    <h2>
                        <span>Download my Projects</span>
                        <label>
                            <img src={downloadIcon} alt="get-cv" />
                            <span>
                                Download
                            </span>
                        </label>
                        <label>
                        <img src={emailIcon} alt="email-cv" />
                            <span>
                                Send
                            </span>
                        </label>
                    </h2>
                    <p>
                        Let's be introduced to the projects with a little of the overview and a few details.
                    </p>
                </li>
                <hr />
                <li>
                    <h2>
                        <span>Download my CV</span>
                        <label>
                            <img src={downloadIcon} alt="get-cv" />
                            <span>
                                Download
                            </span>
                        </label>
                        <label>
                        <img src={emailIcon} alt="email-cv" />
                            <span>
                                Send
                            </span>
                        </label>
                    </h2>
                    <p>
                        Get the details.
                    </p>
                </li>
                
            </ul>
    );
}
export default Uploader;