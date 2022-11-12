import React from 'react';
import '../styles/navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <header className="navbar">
            <div className="navbarLeft">
                <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <p>Home</p>
                </NavLink>
            </div>
            <div className="navbarRight">
                <NavLink to="/login" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <p>Connexion</p>
                </NavLink>
                <NavLink to="/register" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <p>S'enregistrer</p>
                </NavLink>
            </div >
        </header >
    );
};

export default Navigation;