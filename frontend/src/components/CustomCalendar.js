import React, { useState, useContext, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import rrulePlugin from '@fullcalendar/rrule';

import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import '../styles/customCalendar.css';
import AddAppointment from './AddAppointment';
import network from '../configs/axiosParams';
import { UserContext } from '../contexts/UserContext';
import ModifyAppointment from './ModifyAppointment';
import { ThemeContext } from '../contexts/ThemeContext';
import { getAllEvents } from '../configs/events';


const CustomCalendar = () => {

    const { user } = useContext(UserContext);
    const { isDark } = useContext(ThemeContext);

    const [showAddAppointment, setShowAddAppointment] = React.useState(false);
    const [showModifyAppointment, setShowModifyAppointment] = React.useState(false);


    const calendarRef = React.createRef();

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [events, setEvents] = useState([]);
    const [targetedEvent, setTargetEvent] = useState(null);

    /*
    const onEventAdded = (e) => {
        const api = calendarRef.current.getApi();
        api.addEvent(e);
    };*/

    
    useEffect(() => {
        (async () => {
            try {
                const res = await getAllEvents(user.id);
                setEvents(res.data);
            } catch (err) {
                console.log(err.response.data.error)
            }
        })();
    }, [showAddAppointment, showModifyAppointment, user.id]);


    const updateTargetedEvent = (e) =>{
        const val = e.target.value;
        const name = e.target.name;

        let update;
        
            update = {
                ...targetedEvent,
                "extendedProps": {
                    ...targetedEvent.extendedProps,
                    [name] : val,
                },
                "rrule": {
                    ...targetedEvent.rrule,
                    [name] : val,
                }
            };
        
        setTargetEvent(update)
    }


    const updateEventInBackend = (e) =>{
        e.preventDefault();

        const update = async () => {
            const response = await network.patch(`/calendar/${user.id}/${targetedEvent.id}/update`, 
            {
                ...targetedEvent,
                start: startDate.toISOString(),
                end: endDate.toISOString()
            }
            );
            return response;
        }

        (async () => {
           

            try {
                await update();
                setShowModifyAppointment(false);
            } catch (err) {
                console.log(err.response.data.error)
            }
        })();
    }




    return (

        <div className={isDark ? 'MainContainer dark' : "MainContainer"}>
            <div className="CustomCalendar" >
                <FullCalendar
                    //Reference du calendar
                    ref={calendarRef}
                    //Indicateur de la date actuelle
                    nowIndicator
                    locale={frLocale}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        center: 'timeGridDay,timeGridWeek,dayGridMonth new',
                    }}
                    customButtons={{
                        new: {
                            text: 'Ajouter un événement',
                            click: () => {
                                setShowAddAppointment(true);
                                setShowModifyAppointment(false);
                            },
                        },
                    }}
                    events={events}
                    eventClick={(e) => {
                        setShowModifyAppointment(false);
                        setTargetEvent({
                            extendedProps: e.event.extendedProps,
                            title: e.event.title,
                            backgroundColor: e.event.backgroundColor,
                            id: e.event.id,
                        });
                        setShowModifyAppointment(true);
                        setShowAddAppointment(false);
                    }}

                    //dateClick={(e) => console.log(e.dateStr)}

                    selectable="true"
                    select={(e) => {
                        setStartDate(e.start)
                        setEndDate(e.end)
                    }}
                />
            </div>
            {showAddAppointment ? <AddAppointment startDate={startDate} endDate={endDate} setShowAddAppointment={setShowAddAppointment} /> : null}
            {showModifyAppointment ? <ModifyAppointment
                startDate={startDate}
                endDate={endDate}
                targetedEvent={targetedEvent}
                setTargetEvent={setTargetEvent}
                setShowModifyAppointment={setShowModifyAppointment}
                handleForm={updateTargetedEvent}
                updateBackend= {updateEventInBackend}
            /> : null}
        </div>
    );
};

export default CustomCalendar;