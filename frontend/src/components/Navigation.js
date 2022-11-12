import React, { useEffect, useState } from 'react';
import '../styles/navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {

    const [pseudo, setPseudo] = useState("");

    useEffect(() => {
        let p = localStorage.getItem("userUsername");
        setPseudo(p);
    }, [pseudo]);

    return (
        <header className="navbar">
            <div className="navbarLeft">
                {pseudo ? (
                    <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <p>Calendrier</p>
                    </NavLink>
                ) : (<> </>)}

            </div>
            <div className="navbarRight">
                {!pseudo ? (
                    <NavLink to="/login" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <p>Connexion</p>
                    </NavLink>
                ) : (
                    <>
                        <NavLink to="/logout" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <p>Déconnexion</p>
                        </NavLink>
                    </>
                )}

                <NavLink to="/register" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <p>S'enregistrer</p>
                </NavLink>

                {pseudo ? (
                    <NavLink to="/calendar" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <p>{pseudo}</p>
                    </NavLink>
                ) : (<> </>)}
            </div >
        </header >
    );
};

export default Navigation;