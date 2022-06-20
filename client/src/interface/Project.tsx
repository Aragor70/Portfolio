import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getProject } from '../actions/project';
import ErrorResponse from '../components/ErrorResponse';
import Loading from '../components/Loading';



const Project = ({ match }: any) => {

    const [ project, setProject ] = useState<any>(null)
    
    const [loadingProject, setLoadingProject] = useState<boolean>(false)

    const [errorResponse, setErrorResponse] = useState('')

    useEffect(() => {

        (async() => {
            
            setLoadingProject(true)

            const project_name: string = match.params.name

            if (project_name) {
                const res = await getProject(project_name)

                if (typeof res === 'string') {
                
                    setLoadingProject(false)
                    return setErrorResponse(res)
                    
                }
                setErrorResponse('')
                setProject(res)


            }
            
            setLoadingProject(false)
            
        })()

    }, [match.params.name])

    if (loadingProject) return <Loading />;

    if (!project) return null;

    if (errorResponse) return <ErrorResponse message={errorResponse} />

    return (
        <Fragment>
            <article>

                <h1>{project.name}</h1>
                <h1>{project.name}</h1>
                <h1>{project.name}</h1>
                <h1>{project.name}</h1>
                <h1>{project.name}</h1>
                
                <p><span>{project.title}</span></p>
                
            </article>
        </Fragment>
    );
}
export default withRouter(Project);