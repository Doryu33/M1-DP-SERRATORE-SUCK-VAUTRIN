import '../styles/register&login.css';
import { Helmet } from "react-helmet";
import Navigation from './Navigation';
import React, { useState } from 'react';
import network from '../configs/axiosParams';

const Register = () => {

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const sendInfo = async (e) => {
        e.preventDefault();
        console.log("senINfo");
        const data = await network.post(
            "users/register",
            {
                username: username,
                name: name,
                email: email,
                password: password,
            }
        );
        console.log(data);
    }

    return (
        <div>
            <Helmet>
                <title>S'enregistrer</title>
            </Helmet>
            <Navigation />
            <form className="formRegister">
                <div className="container">
                    <h1 className="titleRegister">Créer un compte</h1>

                    <label htmlFor="name" className="labelInfo"><b>Prénom</b></label>
                    <input className="inputRegister"
                        type="name"
                        placeholder="Entrer votre prénom"
                        name="name"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="username" className="labelInfo"><b>Pseudonyme</b></label>
                    <input className="inputRegister"
                        type="text"
                        placeholder="Entrer votre pseudonyme"
                        name="username"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label htmlFor="email" className="labelInfo"><b>Email</b></label>
                    <input className="inputRegister"
                        type="text"
                        placeholder="Entrer votre email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password" className="labelInfo"><b>Mot de passe</b></label>
                    <input className="inputRegister"
                        type="password"
                        placeholder="Entrer votre mot de passe"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className="buttonRegister" type="submit" onClick={(e) => sendInfo(e)}>Envoyer</button>
                </div>

                <div>
                    <p className="pAlreadyAccount">Vous avez déjà un compte ? <a className="loginRedirection" href="http://localhost:3000/login">Connexion</a></p>
                </div>
            </form>
        </div>
    );
};

export default Register;