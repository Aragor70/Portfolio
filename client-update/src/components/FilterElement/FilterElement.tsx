import React, { Fragment, memo, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import DateRangePicker from './DateRangePicker';
import { Translate } from '../Translate/Translate';
import { Language, json } from '../../utils/constant';
import { ReactComponent as CalendarSvg } from '/assets/icons/calendar.svg';
import { ReactComponent as ArrowSvg } from '/assets/icons/play-outline.svg';
import ErrorResponse from '../ErrorResponse/ErrorResponse';
import { FilterFormData } from '../../types/Project';
import { getProject } from '../../actions/project';
import Loading from '../Loading/Loading';

import styles from "./FilterElement.module.scss";

const FilterElement = ({ languageCode = Language.ENGLISH, setProjects, loadValues }: any) => {
    const [ formData, setFormData ] = useState<FilterFormData>({
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
    const handleSearch = async (payload: FilterFormData, isExact: false | true = false) => {
        setLoadingSearch(true)
        
        const res = await loadValues(payload, isExact)
        
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
        const values = res?.filter((element: any) => element?.name?.toLowerCase() === formData?.phrase?.toLowerCase() )
        if (values[0]) {
            setProjects(values)
        } else {
            setProjects(res)
        }
        setErrorResponse('')
        
    }
    const handleSelect = async (element: any = null) => {
        const value = await { ...formData, phrase: element.name }
        setFormData(value)
        await handleSearch(value, true)
        const res = await getProject(element.name)
        await setProjects([res])
        setOpenSelect(false)
        const article: any = await document.querySelector(styles.sectionContent + '  h1')
        
        await article.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    }
    const hideOnEscape = (e: any) => {
        
        if( e.key === "Escape" ) {
            setOpenSearch(Boolean(formData.phrase && openSearch))
            setOpenSelect(false)
            setOpenDatePicker(false)
        }
    }
    const hideOnClickOutside = (e: any) => {
        if( refOne.current && !refOne.current.contains(e.target) ) {
            setOpenSearch(Boolean(formData.phrase && openSearch))
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
        // eslint-disable-next-line
    }, [formData])
    return (
        <article className={styles.searchContent}>
            <h1><Translate tKey="list.search.headline" /></h1>
            <form className={styles.filter} onSubmit={(e: any) => handleSubmit(e)}>
            <div className={clsx(styles.searchWrapper, {
                [styles.active]: Boolean(openSearch)
            })} ref={refOne}>
                <div className={styles.inputHolder}>
                    <input type="text" autoComplete="off" className={styles.searchInput} name="phrase" value={ formData.phrase || '' } placeholder={json[languageCode]['sd.input.search.placeholder']} onClick={() => formData.phrase ? setOpenSelect(true) : setOpenSelect(false) } onChange={(e: any) => {setFormData({ ...formData, phrase: e.target.value }); handleSearch({ ...formData, phrase: e.target.value })}} />
                    <button className={styles.searchIcon} type="button" onClick={() => handleSubmit()}><span></span></button>
                </div>
                <span className={styles.calendarIcon} onClick={() => setOpenDatePicker(!openDatePicker)}><CalendarSvg /></span>
                <span className={styles.close} onClick={() => {
                    setFormData({
                        phrase: null,
                        startDate: null,
                        endDate: new Date,
                        languageCode: Language.ENGLISH
                    });
                    setOpenDatePicker(false);
                    handleSelect({ name: '' });
                    setOpenSearch(false)
                }}></span>
                
                {
                    openDatePicker && <DateRangePicker className={styles.calendarBox} formData={formData} setFormData={setFormData} languageCode={languageCode} refOne={refTwo} />
                }
                
                {
                    (openSelect && formData.phrase) && <Fragment>
                        <ul className={styles.searchList}>
                            {
                                loadingSearch ? <Loading /> : errorResponse ? <ErrorResponse message={errorResponse} style={{ css: { color: 'red', display: 'flex' }}} /> : searchList.length ? searchList.map((element: any) => <li key={element.id} onClick={() => handleSelect(element)}><span><ArrowSvg /></span><span>{element.name}</span></li>) : <li>No projects found.</li>
                            }
                        </ul>
                    </Fragment>
                }
                
            </div>
                
            </form>
        </article>
    );
}
export default FilterElement;