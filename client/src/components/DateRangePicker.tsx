import { Fragment, useEffect } from 'react'
import { DateRange } from 'react-date-range'


import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
/* import { ReactComponent as CalendarSvg } from '../style/calendar.svg'; */
import { Language } from '../utils/constant'

const DateRangePicker = ({ formData, setFormData, languageCode = Language.ENGLISH, refOne = null }: any) => {


  /* const isToday = async (date: Date) => moment(date).format('DD.MM.YYYY') === moment().format('DD.MM.YYYY') */
 
/*   const loadValue = async (range: any) => {

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
  } */
      
  const handleChange = async(range: any) => {
    
      //const value: any = await loadValue(range)

      setFormData({ ...range })

      //setInputValue(value)
      
  }

  useEffect(() => {
    handleChange(formData)
  }, [languageCode])

  return (
    <Fragment>
          <div className="calendar-box" ref={refOne}>
            <DateRange
              onChange={(item: any) => handleChange({ ...formData, ...item.range1})}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={[formData]}
              months={1}
              direction="horizontal"
              className="calendar"
            />
          </div>
      
    </Fragment>
  )
}

export default DateRangePicker