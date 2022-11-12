import React from 'react';
import { useState } from 'react';
import { Helmet } from "react-helmet";
import Navigation from './Navigation';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import '../styles/customCalendar.css';

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
];

const CustomCalendar = () => {

    const [date, setDate] = useState(new Date())
    return (
        <div>
            <Helmet>
                <title>Calendrier</title>
            </Helmet>
            <Navigation />
            <div className="CustomCalendar" >
                <FullCalendar
                    locale={frLocale}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        center: 'dayGridMonth,timeGridWeek,timeGridDay new',
                    }}
                    customButtons={{
                        new: {
                            text: 'Ajouter un événement',
                            click: () => console.log('new event'),
                        },
                    }}
                    events={events}
                    nowIndicator
                    dateClick={(e) => console.log(e.dateStr)}
                    eventClick={(e) => console.log(e.event.id)}
                
                />
            </div>
            <div>
                Selected date: {date.toDateString()}
            </div>
        </div>
    );
};

export default CustomCalendar;