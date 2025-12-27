import React, { Suspense, useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Language } from '../utils/LanguageConfig';
import { getProject } from '../actions/project';
import ErrorResponse from '../components/ErrorResponse/ErrorResponse';
import Loading from '../components/Loading/Loading';
import { LanguageContext } from '../context/LanguageContext';
import { ProjectType } from '../types/Project';

const SingleProjectPresentation = React.lazy(() => import('../components/SingleProject/Presentation/Presentation'));

const mappingLabelPerName = {
    
}

// eslint-disable-next-line
const Project = ({}: any) => {
    const [ project, setProject ] = useState<null | ProjectType>(null)
    
    const [ loadingProject, setLoadingProject ] = useState<boolean>(false)
    const [ errorResponse, setErrorResponse ] = useState('')
    const { languageCode } = useContext(LanguageContext);
    const [ title, setTitle ] = useState<string | null>(null);
    const [ text, setText ] = useState<string | null>(null);
    const [ otherLngVersion, setOtherLngVersion ] = useState(false)
    const params = useParams<any>();
    const header = useRef(null)
    
    const fadeInUpElement = useRef(null)
    useEffect(() => {
        (async() => {
            
            setLoadingProject(true)
            const project_name: string = params.project_name
            if (project_name) {
                const res = await getProject(project_name)
                if (typeof res === 'string') {
                    setLoadingProject(false)
                    return setErrorResponse(res)
                }
                const value = await res?.languageVersions?.filter((element: { languageCode: Language }) => element.languageCode === languageCode)[0];
                setText(value?.text || '')
                setTitle(value?.title || '')
                if (!value && res?.languageVersions?.length) {
                    setOtherLngVersion(true)
                } else {
                    setOtherLngVersion(false)
                }
                setErrorResponse('')
                setProject(res)
            }
            
            setLoadingProject(false)
        })()
    }, [params.project_name, languageCode])
    
    useEffect(() => {
        (() => {
            if (!loadingProject && fadeInUpElement.current) {
                fadeInUpElement.current.classList.add("animated");
                fadeInUpElement.current.classList.add("fadeInUp");
                fadeInUpElement.current.classList.remove("no-opacity");
            }
        })()
    }, [loadingProject, fadeInUpElement])

    useEffect(() => {
        if (header?.current) header?.current?.scrollIntoView({ block: "start", inline: "nearest" })
    }, [header, params.project_name, loadingProject])

    if (loadingProject) return <Loading />;
    if (!project) return null;
    if (errorResponse) return <ErrorResponse message={errorResponse} />
    
    return (
        <Suspense fallback={<Loading />}>
            <SingleProjectPresentation
                otherLngVersion={otherLngVersion}
                fadeInUpElement={fadeInUpElement}
                pageTitle={title || 'Page Title'}
                pageMessage={text}
                {...project}
            />
        </Suspense>
    );
}
export default Project;