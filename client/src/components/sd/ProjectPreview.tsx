import React, { Fragment } from 'react';
import HtmlParser from 'react-html-parser';
/* 
import { ReactComponent as CommitSvg} from '../style/icons/code-commit-solid.svg'
import { ReactComponent as UpdateSvg} from '../style/icons/refresh-outline.svg'
import { ReactComponent as CreateSvg} from '../style/icons/create-outline.svg' */

const ProjectPreview = ( props: any ) => {

    return (
        <Fragment>
            <div className="section-image">
                {
                    props?.images && <img src={props?.images[0]} alt="projects_image" />
                }
                
            </div>
            <div className="params">
                <h3 className="content-center"><span style={{ fontSize: '45px' }}>{props?.title && HtmlParser(props?.title)}</span></h3>
                
                { props?.text && HtmlParser(props?.text) }

                <ul className="icons">
                    {
                        props?.icons && props?.icons?.map((element: any) => <li className="icon"><img src={element} alt="typeScript" /><span>TypeScript</span></li>)
                    }
                </ul>
                
                <ul className="more-about" >
                    {/* <span onClick={() => history.push(`${url}/NiVest-Software`)}>View project details</span> */}
                    <li className="icon-box" onClick={() => window.open("https://redirect.m-prus.uk/NiVest_Software-GitHub_Repository", "_blank")}><i className="fas fa-code fa"></i></li>
                    <li className="icon-box" onClick={() => window.open("https://nivest-software.m-prus.uk/", "_blank")}><i className="fab fa-chrome fa"></i></li>
                </ul>
            
            </div>
        </Fragment>
    );
}
export default ProjectPreview;