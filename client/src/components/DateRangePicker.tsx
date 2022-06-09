import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'


import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import moment from 'moment'
import { ReactComponent as CalendarSvg } from '../style/calendar.svg';
import { Translate } from './Translate'

const DateRangePicker = ({ formData, setFormData }: any) => {

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


  const isToday = (date: Date) => moment(date).format('DD.MM.YYYY') === moment().format('DD.MM.YYYY')


  return (
    <label>

      <CalendarSvg />
      <input
        value={`${formData.startDate ? 
          isToday(formData.startDate) ? Translate({ tKey:'today', isString: true }) : moment(formData.startDate).format('DD.MM.YYYY') : Translate({ tKey:'from', isString: true })} 
           ${formData.endDate ? 
            isToday(formData.endDate) ? Translate({ tKey:'today', isString: true }) : moment(formData.endDate).format('DD.MM.YYYY') : Translate({ tKey:'until', isString: true })}`
        }
        className="calendar-input"
        readOnly
        onClick={() => setOpen(!open) }
      />
      
      
        {open &&
          <div ref={refOne}>
            <DateRange
              onChange={(item: any) => setFormData({ ...formData, ...item.range1 })}
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
  )
}

export default DateRangePicker