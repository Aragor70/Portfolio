import React, { useEffect, useState } from 'react';
import { ReactComponent as ArrowSvg } from '/assets/icons/play-outline.svg';
import { withRouter } from 'react-router-dom';

const TechListElement = ({ element, history }: any) => {
    const [ icon, setIcon ] = useState<any>(null);
    const [ project, setProject ] = useState<any>(null);
    const [ path, setPath ] = useState<any>(null);

    useEffect(() => {
        const value = element.project_icon || element.education_icon || element.experience_icon;
        setIcon(element)
        setProject(value)
        if (value?.name) {
            if (element.project_icon) {
                setPath('/software_projects/' + value.name)
            } else if (element.education_icon) {
                setPath('/education/' + value.name)
            } else if (element.experience_icon) {
                setPath('/work_experience/' + value.name)
            } else {
                setPath(null)
            }
        } else {
            setPath(null)
        }
        
        return () => {
            setIcon(null)
            setProject(null)
        }
    }, [element])

    if (!icon || !project) return null;
    return (
        <li onClick={() => history.push(path)}>
            <span><ArrowSvg /></span>
            <span>
                {
                    project?.name || null
                }
            </span>
        </li>
    )
}
export default withRouter(TechListElement);