import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from './Navigation';
import AppointmentAsList from './AppointmentAsList';
import '../styles/appointmentAsList.css';

const AllAppointments = () => {
    return (
        <div>
            <Helmet>
                <title>Mes rendez-vous</title>
            </Helmet>
            <Navigation />
            <h1 className="globalTitleAllApp">Tous mes rendez-vous</h1>
            <h2 className="titleOfDate">Décembre 2022</h2>
            <AppointmentAsList title="Un grand titre cela donne quoi ?" date="23 décembre" description="Bonjour je suis une decription d'un rendez-vous. Bonjour je suis une decription d'un rendez-vous. Bonjour je suis une decription d'un rendez-vous. Bonjour je suis une decription d'un rendez-vous" />
            <h2 className="titleOfDate">Janvier 2023</h2>
            <AppointmentAsList title="Hello le titre" date="4 Janvier" description="Bonjour je suis une decription d'un rendez-vous" />
        </div>
    );
};

export default AllAppointments;