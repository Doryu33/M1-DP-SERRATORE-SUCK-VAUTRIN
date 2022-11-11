import React from 'react';
import { Helmet } from "react-helmet";
import Navigation from './Navigation';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Navigation />
            <p>Home</p>
        </div>
    );
};

export default Home;