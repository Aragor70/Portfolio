import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import { ReactComponent as ArrowSvg } from '../../style/icons/play-outline.svg';


const TechListElement = ({ element }: any) => {

    const [ icon, setIcon ] = useState<any>(null);
    const [ project, setProject ] = useState<any>(null);


    useEffect(() => {

        
        const value = element.project_icon || element.education_icon || element.experience_icon;

        setIcon(element)

        setProject(value)

    }, [element])

    console.log('ciao', project)

    if (!icon || !project) return <Loading />;

    return (
        <li>
            <span><ArrowSvg /></span>
            <span>
                {
                    project?.name
                }
            </span>
        </li>
    )
}
export default TechListElement;