import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export function Dateranges() {
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <div className='calendar-container'>
                <Calendar
                    onChange={setDate}
                    value={date}
                    selectRange={true}
                    minDate={new Date()}
                />
            </div>
            {date.length > 0 ? (
                <p className='text-center'>
                    <span className='bold'>Start:</span>{' '}
                    {date[0].toDateString()}
                    &nbsp;|&nbsp;
                    <span className='bold'>End:</span> {date[1].toDateString()}
                </p>
            ) : (
                <p className='text-center'>
                    <span className='bold'>Default selected date:</span>{' '}
                    {date.toDateString()}
                </p>
            )}
        </div>
    );
}