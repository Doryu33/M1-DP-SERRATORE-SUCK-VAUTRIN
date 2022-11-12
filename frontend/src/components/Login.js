import React, { useRef } from 'react';
import '../styles/register&login.css';
import { Helmet } from "react-helmet";
import Navigation from './Navigation';
import { NavLink } from 'react-router-dom';
import network from '../configs/axiosParams';

const Login = () => {

    const username = useRef("");
    const password = useRef("");

    const formHandler = () => (event) => {
        event.preventDefault();

        (async () => {
            const sendForm = async ({ username, password }) => {
                const response = await network.post('/users/login', {
                    username: username,
                    password: password,
                });
                console.log("dans try ", response);
                return response;
            }

            const data = {
                username: username.current?.value,
                password: password.current?.value,
            };

            try {
                const res = await sendForm(data);
                console.log("en dehors ", res);
            } catch (err) {
                console.log("erreur ", err.response);
            }
        })();
    }

    return (
        <div>
            <Helmet>
                <title>Connexion</title>
            </Helmet>
            <Navigation />

            <form className="formLogin" onSubmit={formHandler()}>
                <div className="container">
                    <h1 className="titleLogin">Se connecter</h1>

                    <label htmlFor="username" className="labelInfo"><b>Pseudonyme</b></label>
                    <input className="inputLogin"
                        type="text"
                        ref={username}
                        placeholder="Entrer votre pseudonyme"
                        name="username"
                        id="username"
                        required
                    />

                    <label htmlFor="password" className="labelInfo"><b>Mot de passe</b></label>
                    <input className="inputLogin"
                        type="text"
                        ref={password}
                        placeholder="Entrer votre mot de passe"
                        name="password"
                        id="password"
                        required
                    />

                    <button className="buttonLogin" type="submit">Se connecter</button>
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