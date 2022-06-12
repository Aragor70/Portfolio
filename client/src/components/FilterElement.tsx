import React, { Fragment, useEffect, useRef, useState } from 'react';
import DateRangePicker from './DateRangePicker';
import { Translate } from './Translate';

import { Language, json } from '../utils/constant';
import { getProjects } from '../actions/project';

import { ReactComponent as CalendarSvg } from '../style/calendar.svg';


const FilterElement = ({ languageCode = Language.ENGLISH, setProjects }: any) => {

    const [ formData, setFormData ] = useState<any>({
        phrase: null,
        startDate: null,
        endDate: new Date,
        languageCode: Language.ENGLISH
    })

    const [ openSearch, setOpenSearch ] = useState(false)
    const [ openDatePicker, setOpenDatePicker ] = useState(false)

    const refOne = useRef<any>(null)
    const refTwo = useRef<any>(null)

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
                        <input type="text" className="search-input" name="phrase" value={ formData.phrase || '' } placeholder={json[languageCode]['sd.input.search.placeholder']} onChange={(e: any) => setFormData({ ...formData, phrase: e.target.value })} />
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
                </div>
                    
                </form>
            </article>

        </Fragment>
    );
}

export default FilterElement;