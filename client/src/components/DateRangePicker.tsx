import { Fragment, useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'


import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import moment from 'moment'
import { ReactComponent as CalendarSvg } from '../style/calendar.svg';
import { Language, json } from '../utils/constant'

const DateRangePicker = ({ formData, setFormData, languageCode = Language.ENGLISH }: any) => {

  const [open, setOpen] = useState(false)

  const refOne = useRef<any>(null)

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

  // Hide on outside click
  const hideOnClickOutside = (e: any) => {

    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }


  const isToday = async (date: Date) => moment(date).format('DD.MM.YYYY') === moment().format('DD.MM.YYYY')

  const [inputValue, setInputValue] = useState<string | null>(null)

  /* 
    `${formData.startDate ? 
      isToday(formData.startDate) ? Translate({ tKey:'today', isString: true }) : moment(formData.startDate).format('DD.MM.YYYY') : Translate({ tKey:'from', isString: true })} 
      ${formData.endDate ? 
        isToday(formData.endDate) ? Translate({ tKey:'today', isString: true }) : moment(formData.endDate).format('DD.MM.YYYY') : Translate({ tKey:'until', isString: true })}`
  */
 
  const loadValue = async (range: any) => {

    let value = ''

    if (!json) return value

    if (range.startDate) {
      const isMatch = await isToday(range.startDate)

      if (isMatch) {
        value += await json[languageCode]['today']
      } else {
        value += moment(range.startDate).format('DD.MM.YYYY')
      }

    } else {
      value += await json[languageCode]['from']
    }

    value += ' : '


    if (range.endDate) {
      const isMatch = await isToday(range.endDate)

      if (isMatch) {
        value += json[languageCode]['today']
      } else {
        value += moment(range.endDate).format('DD.MM.YYYY')
      }

    } else {
      value += await json[languageCode]['until']
    }

    return value
  }
      
  const handleChange = async(range: any) => {
    
      const value: any = await loadValue(range)

      setFormData({ ...formData, ...range })

      setInputValue(value)
      
  }

  useEffect(() => {
    handleChange(formData)
  }, [languageCode])

  return (
    <Fragment>
      <label>

        <CalendarSvg />
        <span
          className="calendar-input"
          onClick={() => setOpen(!open) }
        >
          {inputValue}
        </span>

        {open &&
          <div className="calendar-box" ref={refOne}>
            <DateRange
              onChange={(item: any) => handleChange(item.range1)}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={[formData]}
              months={1}
              direction="horizontal"
              className="calendar"
            />
          </div>
        }
      </label>
      
    </Fragment>
  )
}

export default DateRangePicker