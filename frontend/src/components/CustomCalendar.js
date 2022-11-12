import React from 'react';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import '../styles/customCalendar.css';
import AddAppointment from './AddAppointment';

/*
const events = [
    {
        id: 1,
        title: 'event 1',
        start: '2022-11-12T20:00:00',
        end: '2022-11-12T21:00:00',
        backgroundColor: 'rgb(255,0,0)'
    },
    {
        id: 2,
        title: 'event 2',
        start: '2022-11-20T20:00:00',
        end: '2022-11-20T20:00:00',
        backgroundColor: 'rgb(0,0,255)'
    },
];*/


const CustomCalendar = () => {

    const calendarRef = React.createRef();

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [events, setEvents] = useState([]);

    const onEventAdded = (event) => {
        const api = calendarRef.current.getApi();
        api.addEvent(event);
    };

    var idi = 0;

    return (
        <>
        <div>
            <div>
                <p>Date de debut: {startDate.toISOString()}</p>
                <p>Date de fin: {endDate.toISOString()}</p>
            </div>
            <div className="CustomCalendar" >
                <FullCalendar
                    //Reference du calendar
                    ref={calendarRef}
                    //Indicateur de la date actuelle
                    nowIndicator
                    locale={frLocale}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        center: 'timeGridDay,timeGridWeek,dayGridMonth new testdebug',
                    }}
                    customButtons={{
                        new: {
                            text: 'Ajouter un événement',
                            click: () => {
                                onEventAdded({
                                    id: idi++,
                                    title: 'my event',
                                    start: startDate,
                                    end: endDate,
                                  })
                            },
                        },
                        testdebug: {
                            text: 'Afficher la selection',
                            click: () => alert('Date selectionnee: du ' + startDate.toISOString() + ' au ' + endDate.toISOString())
                        }
                    }}
                    events={events}
                    eventClick={(e) => console.log(e.event.id)}

                    dateClick={(e) => console.log(e.dateStr)}

                    selectable="true"
                    select={(e) => {
                        setStartDate(e.start)
                        setEndDate(e.end)
                    }}
                />
            </div>
        </div>
        <AddAppointment class="AppointmentPopUp"/>
        </>
    );
};

export default CustomCalendar;