import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import '../styles/customCalendar.css';
import AddAppointment from './AddAppointment';
import network from '../configs/axiosParams';
import { UserContext } from '../contexts/UserContext';

const CustomCalendar = () => {

    const { user } = useContext(UserContext);

    const [showAddAppointment, setShowAddAppointment] = React.useState(false)

    const calendarRef = React.createRef();

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [events, setEvents] = useState([]);

    const onEventAdded = (e) => {
        const api = calendarRef.current.getApi();
        api.addEvent(e);
    };

    useEffect(() => {(async () => {
        const getData = async () => {
            const response = await network.get('/calendar/' + user.id + '/all');
            return response;
        }

        try {
            const res = await getData();
            console.log(res.data);
            setEvents(res.data);
            console.log("event:"+events);
        } catch (err) {
            console.log(err.response.data.error)
        }
    })();}, [showAddAppointment] );

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
            { showAddAppointment ? <AddAppointment startDate={startDate} endDate={endDate} setShowAddAppointment={setShowAddAppointment}/> : null }
        </div>
    );
};

export default CustomCalendar;