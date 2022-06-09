import React, { Fragment, useState } from 'react';
import DateRangePicker from './DateRangePicker';
import { Translate } from './Translate';

import { ReactComponent as SearchSvg } from '../style/search.svg';
import { ReactComponent as TextSvg } from '../style/icons/text.svg';



const FilterElement = () => {

    const [ formData, setFormData ] = useState<any>({
        phrase: null,
        startDate: null,
        endDate: new Date
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
                    <div>
                        <label>
                            <TextSvg />
                            <input placeholder={Translate({ tKey:'sd.input.search.placeholder', isString: true })} value={phrase || ''} type="search" onChange={(e: any) => handleChange(e)} />
                        </label>

                        <DateRangePicker formData={formData} setFormData={setFormData} />
                    </div>
                    <button className="searchButton">
                        <SearchSvg />
                    </button>
                </form>
            </article>

        </Fragment>
    );
}

export default FilterElement;