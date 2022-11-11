import React from 'react';
import '../styles/register&login.css';
import { Helmet } from "react-helmet";
import Navigation from './Navigation';
import { NavLink } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <Helmet>
                <title>Connexion</title>
            </Helmet>
            <Navigation />

            <form className="formLogin">
                <div className="container">
                    <h1 className="titleLogin">Se connecter</h1>

                    <label htmlFor="username" className="labelInfo"><b>Pseudonyme</b></label>
                    <input className="inputLogin"
                        type="text"
                        placeholder="Entrer votre pseudonyme"
                        name="username"
                        id="username"
                        required
                    />

                    <label htmlFor="password" className="labelInfo"><b>Mot de passe</b></label>
                    <input className="inputLogin"
                        type="password"
                        placeholder="Entrer votre mot de passe"
                        name="password"
                        id="password"
                        required
                    />

                    <button className="buttonLogin" type="submit">Terminer</button>
                </div>

                <div>
                    <p className="pNoAccount">Vous n'avez pas de compte ?&nbsp;
                        <NavLink to="/register" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            S'enregistrer
                        </NavLink>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;