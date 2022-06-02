import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';



const Project = ({ match }: any) => {

    console.log(match)

    return (
        <Fragment>
            <div >

                <h1>ciao</h1> 
                
                <p><span>title</span></p>
                
            </div>
        </Fragment>
    );
}
export default withRouter(Project);