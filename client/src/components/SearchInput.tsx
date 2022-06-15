import { Fragment, useEffect, useRef, useState } from 'react'

import { ReactComponent as TextSvg } from '../style/icons/text.svg';

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { Language, json } from '../utils/constant'
import { ReactComponent as CalendarSvg } from '../style/calendar.svg';
import { ReactComponent as SearchSvg } from '../style/search.svg';

const SearchInput = ({ formData, setFormData, languageCode = Language.ENGLISH }: any) => {

  const [open, setOpen] = useState(false)


  const refOne = useRef<any>(null)
  const refInput = useRef<any>(null)

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // handle ESC press key
  const hideOnEscape = (e: any) => {

    if( e.key === "Escape" ) {
      setOpen(false)
    }
  }

  const hideOnClickOutside = (e: any) => {

    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }


  const handleChange = async(e: any) => {

    setFormData({ ...formData, [e.target.name]: e.target.value })

  }


{/* <input placeholder={json[languageCode]['sd.input.search.placeholder']} value={phrase || ''} ref={refInput} name="phrase" type="search" onChange={(e: any) => handleChange(e)} /> */}
  return (
    <Fragment>

      <label>
          <span>
            <SearchSvg />
          </span>
      </label>

    </Fragment>
  )
}

export default SearchInput