import React, { useContext, useEffect, useState } from 'react';
import '../styles/appointment.css';
import { UserContext } from '../contexts/UserContext';
import network from '../configs/axiosParams';



const ModifyAppointment = ({ startDate, endDate, setShowModifyAppointment, showModifyAppointment, targetedEvent, setTargetEvent}) => {
    const { user } = useContext(UserContext);

    const [event, setValueEvent] = useState({
        title: null,
        description: targetedEvent.extendedProps.description,
        backgroundColor: targetedEvent.backgroundColor,
        start: null,
        end: null
    });

    const deleteAppointment = (e) => {
        e.preventDefault();
        (async () => {
            const send = async () => {
                const response = await network.delete('/calendar/' + user.id +'/'+ targetedEvent.id +'/delete');
                console.log(response);
                return response;
            }
            try {
                const res = await send();
                setShowModifyAppointment(false);
            } catch (err) {
                console.log(err.response.data.error)
            }
        })();
    
    };

    const updateEventData = (e) => {
        const val = e.target.value;
        const name = e.target.name;

        const updatedForm = {
            ...event,
            [name]: val,
        };
        setValueEvent(updatedForm)
    }

    useEffect(() => {
        setValueEvent(targetedEvent);
    },[showModifyAppointment])

    return (
        <form className="formAddAppointment">
            <div className="container">
                <h1 className="titleAddAppointment">Modifier le rendez-vous</h1>

                <label htmlFor="actuelDate" className="labelInfoAddAp"><b>Date du rendez-vous : {startDate.toDateString()}</b></label>

                <label htmlFor="title" className="labelInfoAddAp"><b>Titre</b></label>
                <input className="inputTitle"
                    type="text"
                    placeholder="Titre"
                    name="title"
                    id="title"
                    required
                    value={event.title}
                    onChange={(e) => updateEventData(e)}
                />

                <label htmlFor="description" className="labelInfoAddAp"><b>Description</b></label>
                <textarea className="inputDescription"
                    type="textarea"
                    placeholder="Description"
                    name="description"
                    id="description"
                    value={targetedEvent.extendedProps.description}
                />

                <div className="divType">
                    <div className="containerType">
                        <label htmlFor="type" className="labelInfoAddAp"><b>Type</b></label>
                        <select className="inputType" name="backgroundColor" id="type-select" value={targetedEvent.backgroundColor} >
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
                    <button className="buttonCancel" onClick={(e) => setShowModifyAppointment(false)}>Annuler</button>
                    <button className='buttonDelete' onClick={(e) => {
                        deleteAppointment(e);
                    }}>Supprimer</button>
                </div>
            </div>
        </form>
    );
};

export default ModifyAppointment;