import React from 'react';
import '../styles/appointment.css';

const ModifyAppointment = () => {
    return (
        <form className="formAddAppointment">
            <div className="container">
                <h1 className="titleAddAppointment">Modifier le rendez-vous</h1>

                <label htmlFor="actuelDate" className="labelInfoAddAp"><b>Date du rendez-vous : {/*startDate.toDateString()*/}</b></label>

                <label htmlFor="title" className="labelInfoAddAp"><b>Titre</b></label>
                <input className="inputTitle"
                    type="text"
                    placeholder="Ecrivez votre titre"
                    name="title"
                    id="title"
                    required

                />

                <label htmlFor="description" className="labelInfoAddAp"><b>Description</b></label>
                <textarea className="inputDescription"
                    type="textarea"
                    placeholder="Ecrivez la description"
                    name="description"
                    id="description"


                />

                <div className="divType">
                    <div className="containerType">
                        <label htmlFor="type" className="labelInfoAddAp"><b>Type</b></label>
                        <select className="inputType" name="backgroundColor" id="type-select" >
                            <option value="#ff0000">Rouge</option>
                            <option value="#3366ff">Bleu</option>
                            <option value="#00cc00">Vert</option>
                            <option value="#ffcc00">Jaune</option>
                            <option value="#9933ff">Violet</option>
                            <option value="#ff9933">Orange</option>
                        </select>
                    </div>
                </div>

                <div className="containerButtons">
                    <button className="buttonValidate" type="submit">Modifier</button>
                    <button className="buttonCancel">Annuler</button>
                </div>
            </div>
        </form>
    );
};

export default ModifyAppointment;