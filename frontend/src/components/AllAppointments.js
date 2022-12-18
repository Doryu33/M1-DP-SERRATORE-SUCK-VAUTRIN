import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Navigation from './Navigation';
import AppointmentAsList from './AppointmentAsList';
import '../styles/appointmentAsList.css';
import { ThemeContext } from '../contexts/ThemeContext';
import { UserContext } from '../contexts/UserContext';
import { deleteEvent, getAllEvents } from '../configs/events';

const AllAppointments = () => {
    const { isDark } = useContext(ThemeContext);
    const { user } = useContext(UserContext);


    const [events, setEvents] = useState([]);
    const [updatedList, setUpdatedList] = useState(false);

    const requestDeletion = (userId, eventId) => {
        (async () => {
            try {
                await deleteEvent(userId, eventId);
                setUpdatedList(!updatedList)
            } catch (err) {
                console.log(err.response.data.error)
            }
        })();
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await getAllEvents(user.id);
                res.data.sort((a, b) => {
                    return new Date(b.start) - new Date(a.start);
                });
                setEvents(res.data);
            } catch (err) {
                console.log(err.response.data.error)
            }
        })();
    }, [user.id, updatedList])



    return (
        <div className={isDark ? "dark list" : "list"}>
            <Helmet>
                <title>Mes rendez-vous</title>
            </Helmet>
            <Navigation />
            <h1 className="globalTitleAllApp">Tous mes rendez-vous</h1>

            <div className='listingEvents'>


                {
                    events.map(event => (
                        <AppointmentAsList
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            start={event.start}
                            end={event.end}
                            description={event.extendedProps.description}
                            frequency={event?.rrule?.freq}
                            requestDeletion={requestDeletion} />

                    ))
                }


                {/*
            <h2 className="titleOfDate">Décembre 2022</h2>
            <AppointmentAsList title="Un grand titre cela donne quoi ?" date="23 décembre" description="Bonjour je suis une decription d'un rendez-vous. Bonjour je suis une decription d'un rendez-vous. Bonjour je suis une decription d'un rendez-vous. Bonjour je suis une decription d'un rendez-vous" />
            <h2 className="titleOfDate">Janvier 2023</h2>
            <AppointmentAsList title="Hello le titre" date="4 Janvier" description="Bonjour je suis une decription d'un rendez-vous" />
        */}
            </div>
        </div>

    );


};

export default AllAppointments;