import React, { Fragment, useState } from 'react';
import DateRangePicker from './DateRangePicker';
import { Translate } from './Translate';

import { Language, json } from '../utils/constant';
import SearchInput from './SearchInput';



const FilterElement = ({ languageCode = Language.ENGLISH }: any) => {

    const [ formData, setFormData ] = useState<any>({
        phrase: null,
        startDate: null,
        endDate: new Date
    })


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
                        
                    <SearchInput formData={formData} setFormData={setFormData} languageCode={languageCode} />

                    <DateRangePicker formData={formData} setFormData={setFormData} languageCode={languageCode} />
                        
                </form>
            </article>

        </Fragment>
    );
}

export default FilterElement;