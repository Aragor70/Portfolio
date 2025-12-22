import React, { Fragment, useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';
import { UserContext } from '../../../context/UserContext';
import { Language } from '../../../utils/constant';
import Loading from '../../Loading/Loading';
import { Translate } from '../../Translate/Translate';
const ListPreview = ( props: any ) => {
    const { Component } = props;
    const languageContext = useContext<any>(LanguageContext)
    const [ list, setList ] = useState([])
    const [ loadingList, setLoadingList ] = useState(false)
    const [ isEditable, setIsEditable ] = useState(false)
    useEffect(() => {
        (async () => {
            setLoadingList(true)
            let values = await props?.list?.filter((element: any) => props?.status ? ( element.status?.status ? (element.status?.status === props.status) : element.status ? (element.status === props.status) : false ) : true);
        
            if (props?.sortBy && props?.list?.length) {
                const sortBy = await props?.sortBy
                values = await values.sort((a: any, b: any) => a[sortBy] - b[sortBy])
            }
            setList(values)
            setLoadingList(false)
        })()
        return () => {
            setList([])
        }
    }, [props?.sortBy, props?.status, props?.isVisible, props?.list])
    
    const { user } = useContext(UserContext)
    useEffect(() => {
        
        setIsEditable(Boolean(user))
    }, [ user ])
    if (loadingList) return <Loading />
    if (!list.length) return null
    return (
        <Fragment>
            {props?.title && <h1>{ props?.title }</h1>}
            {
                props?.status === 'draft' && <Fragment>
                    <div className={props.className} style={{ marginBottom: '30px' }}>
                        <i><Translate tKey="sd.section.drafts.overview" /></i>
                    </div>
                </Fragment>
            }
            {
                list?.length ? list?.map((element: any, index: number) => <Component key={index} {...props} {...element} languageCode={languageContext?.languageCode || Language.ENGLISH} isEditable={isEditable} />) : null
            }

        </Fragment>
    );
}
export default ListPreview;