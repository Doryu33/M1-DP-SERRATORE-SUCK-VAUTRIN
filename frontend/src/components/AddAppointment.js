import React, { useContext, useState } from "react";
import "../styles/appointment.css";
import network from "../configs/axiosParams";
import { UserContext } from "../contexts/UserContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { weekdays, frequency } from "../configs/weekdays";

const AddAppointment = ({ startDate, endDate, setShowAddAppointment }) => {
    const { user } = useContext(UserContext);
    const { isDark } = useContext(ThemeContext);
    const [isReoccuring, setReoccuring] = useState();

    const handleReoccuring = (e) => {
        setReoccuring(e.target.value);
    };

    const [untilDate, setUntilDate] = useState("")

    const [event, setvalueevent] = useState({
        title: "",
        description: "",
        backgroundColor: "#ff0000",
        start: null,
        end: null,
        freq: "",
        byweekday: [],
        until: null
    });


    const updateUntilDate = (e) => {
        setUntilDate(e.target.value);
    }




    const updateEventData = (e) => {
        const val = e.target.value;
        const name = e.target.name;

        const updatedForm = {
            ...event,
            [name]: val,
        };
        setvalueevent(updatedForm);
    };

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
                    ownerId: user.id,
                },
            }
            if (isReoccuring) {
                data.rrule = {
                    until: untilDate,
                    freq: event.freq,
                    byweekday: event.byweekday,
                    dtstart: startDate
                };
            };


            if (data.rrule.until === "") delete data.rrule.until;

            const sendForm = async (data) => {
                const response = await network.post(
                    "/calendar/" + user.id + "/add",
                    data
                );
                return response;
            };

            try {
                await sendForm(data);
                setShowAddAppointment(false);
            } catch (err) {
                console.log(err.response.data.error);
            }
        })();
    };

    return (
        <form
            className={isDark ? "formAddAppointment dark" : "formAddAppointment"}
            onSubmit={formHandler()}
        >
            <div className="container">
                <h1 className="titleAddAppointment">Ajouter un rendez-vous</h1>

                <p className="labelInfoAddAp">
                    <b>Début :</b> {startDate.toLocaleString("fr-FR").slice(0, -3)}
                    <br />
                    <b>Fin :</b> {endDate.toLocaleString("fr-FR").slice(0, -3)}
                </p>
                <label htmlFor="title" className="labelInfoAddAp">
                    <b>Titre</b>
                </label>
                <input
                    className="inputTitle"
                    type="text"
                    placeholder="Ecrivez votre titre"
                    name="title"
                    id="title"
                    required
                    onChange={(e) => updateEventData(e)}
                />

                <label htmlFor="description" className="labelInfoAddAp">
                    <b>Description</b>
                </label>
                <textarea
                    className="inputDescription"
                    type="textarea"
                    placeholder="Ecrivez la description"
                    name="description"
                    id="description"
                    onChange={(e) => updateEventData(e)}
                />

                <div className="divType">
                    <div className="containerType">
                        <label htmlFor="type" className="labelInfoAddAp">
                            <b>Type</b>
                        </label>
                        <select
                            className="inputType"
                            name="backgroundColor"
                            id="type-select"
                            onChange={(e) => updateEventData(e)}
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

                <label htmlFor="recurring" className="labelInfoAddAp">
                    <b>Récurrence</b>
                </label>
                <div>
                    <input
                        type="radio"
                        name="recurrent"
                        value=""
                        onChange={handleReoccuring}
                    />
                    <label htmlFor="non_reoccuring" >Non récurrent</label>
                    <input
                        type="radio"
                        name="recurrent"
                        value="reoccuring"
                        onChange={handleReoccuring}
                    />
                    <label htmlFor="reoccuring">Récurrent</label>
                </div>

                {isReoccuring ? (
                    <div className="divReoccur">
                        <div htmlFor="frequence">
                            <label htmlFor="frequence" className="labelInfoAddAp">
                                <b>Fréquence</b>
                            </label>
                            <div>

                                {
                                    frequency.map(f => (
                                        <label htmlFor={f.value} key={f.key}>
                                            <input
                                                type="radio"
                                                name="freq"
                                                value={f.value}
                                                onChange={(e) => updateEventData(e)}
                                            />
                                            {f.label}
                                        </label>
                                    ))
                                }

                            </div>
                        </div>

                        <div htmlFor="byWeekDay" >
                            <label htmlFor="byWeekDay" className="labelInfoAddAp">
                                <b>Jour de la semaine</b>
                            </label>
                            <div className="divWeekdayCheckbox">
                                {
                                    weekdays.map(day => (

                                        <label htmlFor={day.value} key={day.key} >
                                            <input type="checkbox" name="byweekday" value={day.value} />
                                            {day.day}
                                        </label>

                                    ))
                                }
                            </div>

                            <div htmlFor="endDate" className="divEndDate">
                                <label htmlFor="endDate" className="labelInfoAddAp">
                                    <b>Date de fin</b>
                                </label>
                                <div>
                                    <input type="date" name="endDate" value={untilDate} onChange={(e) => updateUntilDate(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                <div className="containerButtons">
                    <button className="buttonValidate" type="submit">
                        Ajouter
                    </button>
                    <button
                        className="buttonCancel"
                        onClick={(e) => setShowAddAppointment(false)}
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddAppointment;
