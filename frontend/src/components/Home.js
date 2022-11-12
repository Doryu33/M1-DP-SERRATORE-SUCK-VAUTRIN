import React from 'react';
import { Helmet } from "react-helmet";
import Navigation from './Navigation';
import AddAppointment from './AddAppointment';
import CustomCalendar from './CustomCalendar';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Navigation />
            <CustomCalendar />

        </div>
    );
};

export default Home;