import React from 'react';
import '../styles/register.css';

const Register = () => {
    return (
        <div>
            <form className="formRegister">
                <div class="container">
                    <h1 class="titleRegister">Créer un compte</h1>

                    <label for="name" className="labelInfo"><b>Prénom</b></label>
                    <input className="inputRegister"
                        type="name"
                        placeholder="Entrer votre prénom"
                        name="name"
                        id="name"
                        required
                    />

                    <label for="username" className="labelInfo"><b>Pseudonyme</b></label>
                    <input className="inputRegister"
                        type="text"
                        placeholder="Entrer votre pseudonyme"
                        name="username"
                        id="username"
                        required
                    />

                    <label for="email" className="labelInfo"><b>Email</b></label>
                    <input className="inputRegister"
                        type="text"
                        placeholder="Entrer votre email"
                        name="email"
                        id="email"
                        required
                    />

                    <label for="password" className="labelInfo"><b>Mot de passe</b></label>
                    <input className="inputRegister"
                        type="password"
                        placeholder="Entrer votre mot de passe"
                        name="password"
                        id="password"
                        required
                    />

                    <button className="buttonRegister" type="submit">Terminer</button>
                </div>

                <div>
                    <p class="pAlreadyAccount">Vous avez déjà un compte ? <a className="loginRedirection" href="http://localhost:3000/login">Connexion</a></p>
                </div>
            </form>
        </div>
    );
};

export default Register;