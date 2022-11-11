import React from 'react';
import '../styles/register&login.css';
import { Helmet } from "react-helmet";
import Navigation from './Navigation';

const Login = () => {
    return (
        <div>
            <Helmet>
                <title>Connexion</title>
            </Helmet>
            <Navigation />

            <form className="formLogin">
                <div class="container">
                    <h1 class="titleLogin">Se connecter</h1>

                    <label for="username" className="labelInfo"><b>Pseudonyme</b></label>
                    <input className="inputLogin"
                        type="text"
                        placeholder="Entrer votre pseudonyme"
                        name="username"
                        id="username"
                        required
                    />

                    <label for="password" className="labelInfo"><b>Mot de passe</b></label>
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
                    <p class="pNoAccount">Vous n'avez pas de compte ? <a className="registerRedirection" href="http://localhost:3000/register">S'enregistrer</a></p>
                </div>
            </form>
        </div>
    );
};

export default Login;