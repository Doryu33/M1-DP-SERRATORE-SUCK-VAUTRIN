import React from 'react';
import { weekdays, frequency } from "../configs/weekdays";


const Occurence = ({ untilDate, updateUntilDate, updateEventData }) => {
    return (
        <div className="divReoccur">
            <div htmlFor="frequence" className="divFrequence">
                <label htmlFor="frequence" className="labelFrequence">
                    <b>Fréquence</b>
                </label>
                <div>

                    {
                        frequency.map(f => (
                            <label htmlFor={f.value} key={f.key}>
                                <input
                                    type="radio"
                                    name="freq"
                                    value={f.value}
                                    onChange={(e) => updateEventData(e)}
                                />
                                {f.label}
                            </label>
                        ))
                    }

                </div>
            </div>

            <div htmlFor="byWeekDay" className="divByWeekDay">
                <label htmlFor="byWeekDay" className="labelByWeekDay">
                    <b>Jour de la semaine</b>
                </label>
                <div className="divWeekdayCheckbox">
                    {
                        weekdays.map(day => (

                            <label htmlFor={day.value} key={day.key}>
                                <input type="checkbox" name="byweekday" value={day.value} />
                                {day.day}
                            </label>

                        ))
                    }
                </div>

                <div htmlFor="endDate" className="divEndDate">
                    <label htmlFor="endDate" className="labelEndDate">
                        <b>Date de fin</b>
                    </label>
                    <div>
                        <input type="date" name="endDate" value={untilDate} onChange={(e) => updateUntilDate(e)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Occurence;