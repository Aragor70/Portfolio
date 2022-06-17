import React, { Fragment, memo, useEffect, useRef, useState } from 'react';
import DateRangePicker from './DateRangePicker';
import { Translate } from './Translate';

import { Language, json } from '../utils/constant';

import { ReactComponent as CalendarSvg } from '../style/calendar.svg';
import { ReactComponent as ArrowSvg } from '../style/icons/play-outline.svg';
import ErrorResponse from './ErrorResponse';


const FilterElement = memo(({ languageCode = Language.ENGLISH, setProjects, loadValues }: any) => {

    const [ formData, setFormData ] = useState<any>({
        phrase: null,
        startDate: null,
        endDate: new Date,
        languageCode: Language.ENGLISH,
        isVisible: true
    })

    const [ openSearch, setOpenSearch ] = useState(false)
    const [ openDatePicker, setOpenDatePicker ] = useState(false)
    const [ openSelect, setOpenSelect ] = useState(false)
    const [ searchList, setSearchList ] = useState([])

    const [ loadingSearch, setLoadingSearch ] = useState(false)

    const [errorResponse, setErrorResponse] = useState('')

    const refOne = useRef<any>(null)
    const refTwo = useRef<any>(null)

    const handleSearch = async (payload: any) => {

        setLoadingSearch(true)
        
        const res = await loadValues(payload)
        
        if (typeof res === 'string') {
                
            setLoadingSearch(false)
            return setErrorResponse('search.error.message')
            
        }
        console.log(res)
        setOpenSelect(true)
        setSearchList(res)
        setErrorResponse('')

        setLoadingSearch(false)
        
    }

    const handleSubmit = async (e: any = null) => {


        if (!openSearch) {
            return setOpenSearch(true)
        }

        if (e) e.preventDefault()
        
        const res = await loadValues(formData)
        
        
        if (typeof res === 'string') {
                
            setLoadingSearch(false)
            return setErrorResponse('search.error.message')
            
        }

        setProjects(res)
        setErrorResponse('')
        
    }

    const handleSelect = async (element: any = null) => {

        const value = await { ...formData, phrase: element.name }
        
        setFormData(value)
        
        await handleSearch(value)

        const res = await loadValues(value)
            
        await setProjects(res)

        setOpenSelect(false)

        const article: any = await document.querySelector('.section-content h1')
        
        await article.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })

    }

    const hideOnEscape = (e: any) => {
        
        if( e.key === "Escape" ) {

            setOpenSearch(!!formData.phrase && openSearch)
            
            setOpenSelect(false)

            setOpenDatePicker(false)

        }
    }

    const hideOnClickOutside = (e: any) => {

        if( refOne.current && !refOne.current.contains(e.target) ) {

            setOpenSearch(!!formData.phrase && openSearch)

            setOpenSelect(false)

            setOpenDatePicker(false)

        }
    }
    
    useEffect(() => {
        
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)

        return () => {
            
            window.removeEventListener('keydown', hideOnEscape)
            window.removeEventListener('click', hideOnClickOutside)
        }

    }, [formData])

        
    return (
        <Fragment>

            <article className="search-content">
                <h1><Translate tKey="list.search.headline" /></h1>
                <form className="filter" onSubmit={(e: any) => handleSubmit(e)}>

                <div className={"search-wrapper " + (openSearch ? 'active' : '')} ref={refOne}>
                    <div className="input-holder">
                        <input type="text" autoComplete="off" className="search-input" name="phrase" value={ formData.phrase || '' } placeholder={json[languageCode]['sd.input.search.placeholder']} onClick={() => formData.phrase ? setOpenSelect(true) : setOpenSelect(false) } onChange={(e: any) => {setFormData({ ...formData, phrase: e.target.value }); handleSearch({ ...formData, phrase: e.target.value })}} />
                        <button className="search-icon" type="button" onClick={() => handleSubmit()}><span></span></button>
                    </div>
                    <span className="calendar-icon" onClick={() => setOpenDatePicker(!openDatePicker)}><CalendarSvg /></span>
                    <span className="close" onClick={() => {
                            setFormData({
                                phrase: null,
                                startDate: null,
                                endDate: new Date,
                                languageCode: Language.ENGLISH
                            });
                            setOpenDatePicker(false);
                            handleSelect({ name: '' });
                            setOpenSearch(false)
                        }}>
                    </span>
                    
                    {
                        openDatePicker && <DateRangePicker formData={formData} setFormData={setFormData} languageCode={languageCode} refOne={refTwo} />
                    }
                    
                    {
                        (openSelect && formData.phrase) && <Fragment>
                            <ul className="search-list">
                                {
                                    loadingSearch ? "loading..." : errorResponse ? <ErrorResponse message={errorResponse} style={{ css: { color: 'red', display: 'flex' }}} /> : searchList.length ? searchList.map((element: any) => <li key={element.id} onClick={() => handleSelect(element)}><span><ArrowSvg /></span><span>{element.name}</span></li>) : <li>No projects found.</li>
                                }
                            </ul>
                        </Fragment>
                    }
                    
                </div>
                    
                </form>
            </article>

        </Fragment>
    );
})

export default FilterElement;