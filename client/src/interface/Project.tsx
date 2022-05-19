import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';



const Project = ({ name, title }: any) => {

    

    return (
        <Fragment>
            <div >

                <h1>{ name }</h1> 
                
                <p><span>{ title || 'ciao' }</span></p>
                
            </div>
        </Fragment>
    );
}
export default withRouter(Project);