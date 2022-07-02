import React, { Fragment, useEffect, useState } from 'react';
import { getImages } from '../../actions/skills';
import ErrorResponse from '../ErrorResponse';
import Loading from '../Loading';
import TechListElement from './TechListElement';


const TechPreview = ({ element, setIsHover }: any) => {

    const [ loadingPreview, setLoadingPreview ] = useState(false)
    
    const [ preview, setPreview ] = useState<any[]>([])
    const [ errorResponse, setErrorResponse ] = useState<string | null>(null)

    useEffect(() => {
        (async () => {
            setLoadingPreview(true)

            const payload = {
                project_icon: true,
                education_icon: true,
                experience_icon: true,
                phrase: element
            }
            
            const res = await getImages(payload)

            if (typeof res === 'string') {
                
                setLoadingPreview(false)
                return setErrorResponse(res)
                
            }
            
            setPreview(res)
            setErrorResponse(null)
            setLoadingPreview(false)
        })()

        return () => {
            setPreview([])
        }
    }, [element])


    return (
        <section className="tech-preview" onClick={() => setIsHover(null)} style={ loadingPreview ? { gridTemplateColumns: '1fr' } : preview?.length ? { gridTemplateColumns: '1fr 1fr' } : { gridTemplateColumns: '1fr' } }>

            <label>
                <i className="fas fa-code fa"></i>
                <span>{element}</span>
            </label>
            
                {
                    loadingPreview ? null : errorResponse ? <ErrorResponse message={errorResponse} style={{ css: { color: 'red' }}} /> : preview.length ? <ul>

                        {
                            preview.map((elem: any) => <TechListElement key={elem.id} element={elem} />)
                        }

                    </ul> : null
                }
            
            
            
        </section>
    )
}
export default TechPreview;