import React, { useContext, useState } from 'react';
import '../styles/appointment.css';
import network from '../configs/axiosParams';
import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';

const AddAppointment = ({ startDate, endDate, setShowAddAppointment }) => {

    const { user } = useContext(UserContext);
    const { isDark } = useContext(ThemeContext);
    const [isReoccuring, setReoccuring] = useState();

    const handleReoccuring = (e) => {
        setReoccuring(e.target.value);
    }

    const [event, setvalueevent] = useState({
        title: "",
        description: "",
        backgroundColor: "#ff0000",
        start: null,
        end: null,
        freq: "",
        byweekday: []
    });

    const updateEventData = (e) => {
        const val = e.target.value;
        const name = e.target.name;

        const updatedForm = {
            ...event,
            [name]: val,
        };
        setvalueevent(updatedForm)
    }

    const formHandler = () => (e) => {
        e.preventDefault();

        (async () => {
            const data = {
                title: event.title,
                start: startDate,
                end: endDate,
                backgroundColor: event.backgroundColor,
                extendedProps: {
                    description: event.description,
                    ownerId: user.id
                },
                rrule: {
                    until: null,
                    freq: event.freq,
                    byweekday: event.byweekday
                }
            };

            const sendForm = async (data) => {
                const response = await network.post('/calendar/' + user.id + '/add', data);
                return response;
            }

            try {
                await sendForm(data);
                setShowAddAppointment(false);
            } catch (err) {
                console.log(err.response.data.error)
            }
        })();

    };


    return (
        <form className={isDark ? "formAddAppointment dark" : "formAddAppointment"} onSubmit={formHandler()}>
            <div className="container">
                <h1 className="titleAddAppointment">Ajouter un rendez-vous</h1>

                <p className="labelInfoAddAp">
                    <b>Début :</b> {startDate.toLocaleString('fr-FR').slice(0, -3)}
                    <br />
                    <b>Fin :</b> {endDate.toLocaleString('fr-FR').slice(0, -3)}
                </p>
                <label htmlFor="title" className="labelInfoAddAp"><b>Titre</b></label>
                <input className="inputTitle"
                    type="text"
                    placeholder="Ecrivez votre titre"
                    name="title"
                    id="title"
                    required
                    onChange={(e) => updateEventData(e)}
                />

                <label htmlFor="description" className="labelInfoAddAp"><b>Description</b></label>
                <textarea className="inputDescription"
                    type="textarea"
                    placeholder="Ecrivez la description"
                    name="description"
                    id="description"
                    onChange={(e) => updateEventData(e)}

                />

                <div className="divType">
                    <div className="containerType">
                        <label htmlFor="type" className="labelInfoAddAp"><b>Type</b></label>
                        <select className="inputType" name="backgroundColor" id="type-select" onChange={(e) => updateEventData(e)}>
                            <option value="#ff0000">Rouge</option>
                            <option value="#3366ff">Bleu</option>
                            <option value="#00cc00">Vert</option>
                            <option value="#ffcc00">Jaune</option>
                            <option value="#9933ff">Violet</option>
                            <option value="#ff9933">Orange</option>
                        </select>
                    </div>
                </div>

                <label htmlFor="recurring" className="labelInfoAddAp"><b>Récurent</b></label>
                <div>
                    <input type="radio" name="recurrent" value="" onChange={handleReoccuring} /><label htmlFor="non_reoccuring">Non récurrent</label>
                    <input type="radio" name="recurrent" value="reoccuring" onChange={handleReoccuring} /><label htmlFor="reoccuring">Récurrent</label>
                </div>

                {
                    isReoccuring ? (
                        <div>
                            <div htmlFor="frequence" className="divFrequence">
                                <label htmlFor="frequence" className="labelFrequence"><b>Fréquence</b></label>
                                <div>
                                    <input type="radio" name="freq" value="daily" onChange={(e) => updateEventData(e)} /><label htmlFor="daily">Journalier</label>
                                    <input type="radio" name="freq" value="weekly" onChange={(e) => updateEventData(e)} /><label htmlFor="weekly">Hebdomadaire</label>
                                    <input type="radio" name="freq" value="monthly" onChange={(e) => updateEventData(e)} /><label htmlFor="monthly">Mensuel</label>
                                </div>
                            </div>

                            <div htmlFor="byWeekDay" className="divByWeekDay">
                                <label htmlFor="byWeekDay" className="labelByWeekDay"><b>Jour de la semaine</b></label>
                                <div>
                                    <table>
                                        <tr>
                                            <td><label htmlFor="mo">Lundi</label></td>
                                            <td><label htmlFor="tu">Mardi</label></td>
                                            <td><label htmlFor="we">Mercredi</label></td>
                                            <td><label htmlFor="th">Jeudi</label></td>
                                            <td><label htmlFor="fr">Vendredi</label></td>
                                            <td><label htmlFor="sa">Samedi</label></td>
                                            <td><label htmlFor="su">Dimanche</label></td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" name="byweekday" value="mo" /></td>
                                            <td><input type="checkbox" name="byweekday" value="tu" /></td>
                                            <td><input type="checkbox" name="byweekday" value="we" /></td>
                                            <td><input type="checkbox" name="byweekday" value="th" /></td>
                                            <td><input type="checkbox" name="byweekday" value="fr" /></td>
                                            <td><input type="checkbox" name="byweekday" value="sa" /></td>
                                            <td><input type="checkbox" name="byweekday" value="su" /></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                            <div htmlFor="endDate" className="divEndDate">
                                <label htmlFor="endDate" className="labelEndDate"><b>Date de fin</b></label>
                                <div>
                                    <input type="date" name="endDate" value="" />

                                </div>
                            </div>

                        </div>
                    ) :
                        null
                }

                <div className="containerButtons">
                    <button className="buttonValidate" type="submit">Ajouter</button>
                    <button className="buttonCancel" onClick={(e) => setShowAddAppointment(false)}>Annuler</button>
                </div>
            </div>
        </form>
    );


};

export default AddAppointment;