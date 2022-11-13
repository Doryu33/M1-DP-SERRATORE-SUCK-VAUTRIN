import React from 'react';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import '../styles/customCalendar.css';
import AddAppointment from './AddAppointment';

const CustomCalendar = () => {

    const [showAddAppointment, setShowAddAppointment] = React.useState(false)

    const calendarRef = React.createRef();

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [events, setEvents] = useState([]);

    const onEventAdded = (event) => {
        const api = calendarRef.current.getApi();
        api.addEvent(event);
    };

    return (
        <div className='MainContainer'>
            <div className="CustomCalendar" >
                <p>Date de debut: {startDate.toISOString()}</p>
                <p>Date de fin: {endDate.toISOString()}</p>
                <FullCalendar
                    //Reference du calendar
                    ref={calendarRef}
                    //Indicateur de la date actuelle
                    nowIndicator
                    locale={frLocale}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        center: 'timeGridDay,timeGridWeek,dayGridMonth new',
                    }}
                    customButtons={{
                        new: {
                            text: 'Ajouter un événement',
                            click: () => {
                                setShowAddAppointment(true)
                                
                            },
                        },
                    }}
                    events={events}
                    //eventClick={(e) => console.log(e.event.id)}

                    //dateClick={(e) => console.log(e.dateStr)}

                    selectable="true"
                    select={(e) => {
                        setStartDate(e.start)
                        setEndDate(e.end)
                    }}
                />
            </div>
            { showAddAppointment ? <AddAppointment startDate={startDate} endDate={endDate}/> : null }
        </div>
    );
};

export default CustomCalendar;