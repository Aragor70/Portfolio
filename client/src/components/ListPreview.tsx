import React, { Fragment, useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { Language } from '../utils/constant';
import Loading from './Loading';
import { Translate } from './Translate';

const ListPreview = ( props: any ) => {

    const { Component } = props;

    const languageContext = useContext<any>(LanguageContext)

    const [ list, setList ] = useState([])

    const [ loadingList, setLoadingList ] = useState(false)

    useEffect(() => {

        (async () => {

            setLoadingList(true)

            let values = await props?.list?.filter((element: any) => props?.status ? element.status?.status === props.status : true)
                            .filter((element: any) => props.isVisible ? element.isVisible === props.isVisible : element?.isVisible);
        
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

    if (loadingList) return <Loading />
    
    return (
        <Fragment>

            {props?.title &&  <h1>{ props?.title }</h1>}


            {
                props?.status === 'draft' && <Fragment>
                    <div className="params" style={{ marginBottom: '30px' }}>
                        <i><Translate tKey="sd.section.drafts.overview" /></i>
                    </div>
                </Fragment>
            }

            {
                list?.length ? list?.map((element: any, index: number) => <Component key={index} {...props} {...element} languageCode={languageContext?.languageCode || Language.ENGLISH} />) : null
            }


        </Fragment>
    );
}
export default ListPreview;