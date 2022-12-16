import React, { useContext } from 'react';
import '../styles/appointment.css';
import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { deleteEvent } from '../configs/events';



const ModifyAppointment = ({ startDate, endDate, setShowModifyAppointment, targetedEvent, handleForm, updateBackend }) => {
    const { user } = useContext(UserContext);
    const { isDark } = useContext(ThemeContext);



    const deleteAppointment = (e) => {
        e.preventDefault();
        (async () => {
            try {
                await deleteEvent(user.id, targetedEvent.id);
                setShowModifyAppointment(false);
            } catch (err) {
                console.log(err.response.data.error)
            }
        })();
    };



    return (
        <form className={isDark ? "formAddAppointment dark" : "formAddAppointment"} onSubmit={(e) => updateBackend(e)}>
            <div className="container">
                <h1 className="titleAddAppointment">Modifier le rendez-vous</h1>

                <label htmlFor="actuelDate" className="labelInfoAddAp">
                    <b>Rendez-vous entre le {startDate.toLocaleString('fr-FR').slice(0, -3)} et le {endDate.toLocaleString('fr-FR').slice(0, -3)}
                    </b></label>

                <label htmlFor="title" className="labelInfoAddAp"><b>Titre</b></label>
                <input className="inputTitle"
                    type="text"
                    placeholder="Titre"
                    name="title"
                    id="title"
                    required
                    value={targetedEvent.title}
                    onChange={(e) => handleForm(e)}
                />

                <label htmlFor="description" className="labelInfoAddAp"><b>Description</b></label>
                <textarea className="inputDescription"
                    type="textarea"
                    placeholder="Description"
                    name="description"
                    id="description"
                    value={targetedEvent.extendedProps.description}
                    onChange={(e) => handleForm(e)}

                />

                <div className="divType">
                    <div className="containerType">
                        <label htmlFor="type" className="labelInfoAddAp"><b>Type</b></label>
                        <select className="inputType" name="backgroundColor" id="type-select"
                            value={targetedEvent.backgroundColor}
                            onChange={(e) => handleForm(e)}
                        >
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
                    <button className="buttonCancel" onClick={() => setShowModifyAppointment(false)}>Annuler</button>
                    <button className='buttonDelete' onClick={(e) => {
                        deleteAppointment(e);
                    }}>Supprimer</button>
                </div>
            </div>
        </form>
    );
};

export default ModifyAppointment;