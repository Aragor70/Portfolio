import React, { Fragment, useState } from 'react';
import { Translate } from './Translate';



const FilterElement = () => {

    const [ formData, setFormData ] = useState({
        phrase: null,
        startDate: null,
        endDate: null
    })

    const { phrase, startDate, endDate } = formData;

    const handleChange = (e: any) => {
        
        setFormData({ ...formData, [e.target.name]: e.target.value })
        
    }
    const handleSubmit = async (e: any) => {

        try {
            e.preventDefault();

            const response = ''

            console.log(response)

            setFormData({
                phrase: null,
                startDate: null,
                endDate: null
            })

        } catch (err: any) {
            console.log(err.message)
        }
        
    }

    return (
        <Fragment>

            <article>
                <h1><Translate tKey="list.search.headline" /></h1>
                <form className="filter" onSubmit={(e: any) => handleSubmit(e)}>
                    <label className="phrase">
                        <input value={phrase || ''} type="text" onChange={(e: any) => handleChange(e)} />
                    </label>
                    <label className="startDate">
                        <input value={startDate || ''} type="date" onChange={(e: any) => handleChange(e)} />
                    </label>
                    <label className="endDate">
                        <input value={endDate || ''} type="date" onChange={(e: any) => handleChange(e)} />
                    </label>
                    <button className="searchButton">
                        Search
                    </button>
                </form>
            </article>

        </Fragment>
    );
}

export default FilterElement;