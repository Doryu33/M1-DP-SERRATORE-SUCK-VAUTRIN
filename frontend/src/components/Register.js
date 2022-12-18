import React, { useContext, useEffect, useRef, useState } from 'react';
import '../styles/register&login.css';
import { Helmet } from "react-helmet";
import Navigation from './Navigation';
import network from '../configs/axiosParams';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import ErrorHandler from './ErrorHandler';
import { ThemeContext } from '../contexts/ThemeContext';

const Register = () => {

    function clearInput() {
        document.getElementById("Form").reset();
    }

    const { user } = useContext(UserContext);
    const { isDark } = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(()=>{
        // Si l'utilisateur est connecté, directon la page principale
        if (user){
            navigate('/');
        }
    }, [])

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const username = useRef("");
    const password = useRef("");
    const name = useRef("");
    const email = useRef("");

    const formHandler = () => (event) => {
        event.preventDefault();
        setError(false);
        setSuccess(false);
        (async () => {
            const data = {
                username: username.current?.value,
                password: password.current?.value,
                name: name.current?.value,
                email: email.current?.value,
            };

            const sendForm = async ({ username, password, name, email }) => {
                const response = await network.post('/users/register', {
                    username: username,
                    password: password,
                    name: name,
                    email: email,
                });
                return response;
            }

            try {
                const res = await sendForm(data);
                setSuccess(true);
                clearInput();
                setError(false)
            } catch (err) {
                console.log(err.response.data.error)
                setError(err.response.data.error);
                setSuccess(false);
            }
        })();

    };

    return (
        <div>
            <Helmet>
                <title>S'enregistrer</title>
            </Helmet>
            <Navigation />
            <form id= "Form" className={isDark ? "formRegister dark" : "formRegister"} onSubmit={formHandler()}>
                <div className="container">
                    <h1 className="titleRegister">Créer un compte</h1>

                    <label htmlFor="name" className="labelInfo"><b>Prénom</b></label>
                    <input className="inputRegister"
                        ref={name}
                        type="name"
                        placeholder="Entrer votre prénom"
                        name="name"
                        id="name"
                        required
                    />

                    <label htmlFor="username" className="labelInfo"><b>Pseudonyme</b></label>
                    <input className="inputRegister"
                        ref={username}
                        type="text"
                        placeholder="Entrer votre pseudonyme"
                        name="username"
                        id="username"
                        required
                    />

                    <label htmlFor="email" className="labelInfo"><b>Email</b></label>
                    <input className="inputRegister"
                        ref={email}
                        type="text"
                        placeholder="Entrer votre email"
                        name="email"
                        id="email"
                        required
                    />

                    <label htmlFor="password" className="labelInfo"><b>Mot de passe</b></label>
                    <input className="inputRegister"
                        ref={password}
                        type="password"
                        placeholder="Entrer votre mot de passe"
                        name="password"
                        id="password"
                        required
                    />

                    <button className="buttonRegister" type="submit">S'enregistrer</button>

                    {
                        error ? 
                        <ErrorHandler message={error.message} details={error.details} /> 
                        :
                        <></>
                    }

                    {
                        success ?
                        <p className='success'>Compte crée avec succés</p>
                        :
                        <></>
                    }

                </div>

                <div>
                    <p className="pAlreadyAccount">Vous avez déjà un compte ?&nbsp;
                        <NavLink to="/login" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            Connexion
                        </NavLink>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;