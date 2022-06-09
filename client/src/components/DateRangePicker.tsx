import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'


import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import moment from 'moment'
import { ReactComponent as CalendarSvg } from '../style/calendar.svg';

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
          isToday(formData.startDate) ? 'today' : moment(formData.startDate).format('DD.MM.YYYY') : '...'} 
           ${formData.endDate ? 
            isToday(formData.endDate) ? 'today' : moment(formData.endDate).format('DD.MM.YYYY') : '...'}`
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