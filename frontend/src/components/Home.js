import React, { useContext, useEffect, } from 'react';
import { Helmet } from "react-helmet";
import Navigation from './Navigation';
import CustomCalendar from './CustomCalendar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Home = () => {

    const { user } = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        // Si l'utilisateur n'est pas connecté, directon vers la page de login
        if (!user) {
            navigate('/login');
        }
    }, [])

    return (
        <div>
            <Helmet>
                <title>Calendrier</title>
            </Helmet>
            <Navigation />
            <CustomCalendar />

        </div>
    );
};

export default Home;