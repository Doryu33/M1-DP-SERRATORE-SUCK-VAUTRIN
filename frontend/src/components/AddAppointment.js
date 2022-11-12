import React from 'react';
import '../styles/addAppointment.css';

const AddAppointment = () => {
    return (
        <form className="formAddAppointment">
            <div className="container">
                <h1 className="titleAddAppointment">Ajouter un rendez-vous</h1>

                <label htmlFor="actuelDate" className="labelInfoAddAp"><b>Date du rendez-vous : "Date"</b></label>

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

                <div className="divDurationType">
                    <div className="containerDurationType">
                        <label htmlFor="duration" className="labelInfoAddAp"><b>Durée</b></label>
                        <div className="divDuration">
                            <input className="inputDuration"
                                type="number"
                                min="0"
                                name="duration"
                                id="duration"
                            />
                            <input type="radio" id="hour" name="duration" value="hour" /><label htmlFor="hour">Heure(s)</label>
                            <input type="radio" id="day" name="duration" value="day" /><label htmlFor="day">Jour(s)</label>
                        </div>
                    </div>

                    <div className="containerDurationType">
                        <label htmlFor="type" className="labelInfoAddAp"><b>Type</b></label>
                        <select className="inputType" name="type" id="type-select">
                            <option value="red">Rouge</option>
                            <option value="blue">Bleu</option>
                            <option value="green">Vert</option>
                            <option value="yellow">Jaune</option>
                            <option value="purple">Violet</option>
                            <option value="orange">Orange</option>
                        </select>
                    </div>
                </div>

                <label htmlFor="recurring" className="labelInfoAddAp"><b>Récurent</b></label>
                <div>
                    <input type="radio" id="none" name="recurrent" value="" /><label htmlFor="none">Non récurrent</label>
                    <input type="radio" id="day" name="recurrent" value="day" /><label htmlFor="day">Chaque jour</label>
                    <input type="radio" id="week" name="recurrent" value="week" /><label htmlFor="week">Chaque semaine</label>
                </div>

                <div className="containerButtons">
                    <button className="buttonValidate" type="submit">Ajouter</button>
                    <button className="buttonCancel">Annuler</button>
                </div>
            </div>
        </form>
    );


};

export default AddAppointment;