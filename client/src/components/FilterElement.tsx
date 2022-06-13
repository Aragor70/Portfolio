import React, { Fragment, useEffect, useRef, useState } from 'react';
import DateRangePicker from './DateRangePicker';
import { Translate } from './Translate';

import { Language, json } from '../utils/constant';
import { getProjects } from '../actions/project';

import { ReactComponent as CalendarSvg } from '../style/calendar.svg';
import { ReactComponent as ArrowSvg } from '../style/icons/play-outline.svg';


const FilterElement = ({ languageCode = Language.ENGLISH, setProjects }: any) => {

    const [ formData, setFormData ] = useState<any>({
        phrase: null,
        startDate: null,
        endDate: new Date,
        languageCode: Language.ENGLISH,
        isVisible: true
    })

    const [ openSearch, setOpenSearch ] = useState(false)
    const [ openDatePicker, setOpenDatePicker ] = useState(false)
    const [ searchList, setSearchList ] = useState([])

    const [ loadingSearch, setLoadingSearch ] = useState(false)

    const refOne = useRef<any>(null)
    const refTwo = useRef<any>(null)

    const handleSearch = async (payload: any) => {

        try {
            setLoadingSearch(true)
            
            const res = await getProjects(payload)
            
            setSearchList(res)

            setLoadingSearch(false)

        } catch (err: any) {
            console.log(err.message)
        }
        
    }

    const handleSubmit = async (e: any = null) => {

        try {

            if (!openSearch) {
                return setOpenSearch(true)
            }

            if (e) e.preventDefault()
            
            const res = await getProjects(formData)
            
            setProjects(res)

        } catch (err: any) {
            console.log(err.message)
        }
        
    }

    const handleSelect = async (element: any = null) => {

        const value = await { ...formData, phrase: element.name }
        
        setFormData(value)
        
        await handleSearch(value)

        const res = await getProjects(value)
            
        await setProjects(res)

        const article: any = document.querySelector('.section-content > h1')
        
        await article.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })

    }
    


    const hideOnEscape = (e: any) => {
        
        if( e.key === "Escape" ) {

            setOpenSearch(!!formData.phrase && openSearch)
            
            setOpenDatePicker(false)

        }
    }

    const hideOnClickOutside = (e: any) => {

        if( refOne.current && !refOne.current.contains(e.target) ) {

            setOpenSearch(!!formData.phrase && openSearch)
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
                        <input type="text" autoComplete="off" className="search-input" name="phrase" value={ formData.phrase || '' } placeholder={json[languageCode]['sd.input.search.placeholder']} onChange={(e: any) => {setFormData({ ...formData, phrase: e.target.value }); handleSearch({ ...formData, phrase: e.target.value })}} />
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
                        setOpenDatePicker(false)}}>
                    </span>
                    
                    {
                        openDatePicker && <DateRangePicker formData={formData} setFormData={setFormData} languageCode={languageCode} refOne={refTwo} />
                    }
                    
                    {
                        formData.phrase && <Fragment>
                            <ul className="search-list">
                                {
                                    loadingSearch ? "loading..." : searchList.length ? searchList.map((element: any) => <li key={element.id} onClick={() => handleSelect(element)}><span><ArrowSvg /></span><span>{element.name}</span></li>) : "No projects found."
                                }
                            </ul>
                        </Fragment>
                    }
                    
                </div>
                    
                </form>
            </article>

        </Fragment>
    );
}

export default FilterElement;