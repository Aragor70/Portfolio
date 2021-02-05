import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';




const Project = ({ match }: any) => {




    return (
        <Fragment>
            { match.params.title }
        </Fragment>
    );
}
export default withRouter(Project);