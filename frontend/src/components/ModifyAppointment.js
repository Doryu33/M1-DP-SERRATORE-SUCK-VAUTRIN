import React, { useContext, useState, useEffect } from 'react';
import '../styles/appointment.css';
import { getEventByID, updateEvent as updateEventBackend } from "../configs/events";
import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { deleteEvent } from '../configs/events';
import { weekdays, frequency } from "../configs/weekdays";


const ModifyAppointment = ({ startDate, endDate, setShowModifyAppointment, targetedEvent }) => {
    const { user } = useContext(UserContext);
    const { isDark } = useContext(ThemeContext);

    const [checked, setChecked] = useState((new Array(weekdays.length).fill(false)));


    const [currentEvent, setCurrentEvent] = useState({
        // Original state, to be updated as soon as possible
        title: "",
        start: startDate,
        end: endDate,
        backgroundColor: "#ff0000",
        description: "",
    });

    const [rules, setRules] = useState({
        byweekday: [],
        freq: "",
        dtstart: "",
        until: "",
    })





    const [isReoccuring, setReoccuring] = useState(false);



    const updateRules = (e) => {
        const val = e.target.value;
        const name = e.target.name;

        const updatedForm = {
            ...rules,
            [name]: val,
        };
        setRules(updatedForm)
    }



    const handleCheckboxes = (index) => {
        const copy = [...checked];
        copy[index] = !checked[index];
        setChecked([...copy]);


        let value = [];
        weekdays.forEach((day, index) => {
            if (copy[index]) {
                value.push(day.value)
            }
        });
        setRules({
            ...rules,
            'byweekday': value,
        });
    }


    const updateEvent = (e) => {
        const val = e.target.value;
        const name = e.target.name;

        const updatedForm = {
            ...currentEvent,
            [name]: val,
        };
        setCurrentEvent(updatedForm)
    }


    const loadEvent = async () => {
        const response = await getEventByID(user.id, targetedEvent)
        const data = response.data;

        setReoccuring(data.hasOwnProperty("rrule"));
        let loaded = {
            title: data.title,
            start: data.start,
            end: data.end,
            backgroundColor: data.backgroundColor,
            description: data.extendedProps.description,
            ownerId: data.extendedProps.ownerId,
            invitedId: data.extendedProps.invitedId,
        }
        if ("rrule" in data) {
            setRules({
                byweekday: data.rrule.byweekday ? data.rrule.byweekday : [],
                freq: data.rrule.freq,
                dtstart: data.start,
                until: data.rrule.until ? data.rrule.until : "",
            });
            const bwd = data.rrule.byweekday ? data.rrule.byweekday : [];
            const chck = [];
            weekdays.forEach((day) => {
                chck.push(bwd.includes(day.value));
            })
            setChecked(chck);

        }
        setCurrentEvent(loaded);
    }


    const updateBackend = (e) => {
        e.preventDefault();
        (async () => {

            const data = {
                id: targetedEvent,
                title: currentEvent.title,
                start: startDate.toISOString(),
                end: endDate.toISOString(),
                backgroundColor: currentEvent.backgroundColor,
                extendedProps: {
                    description: currentEvent.description,
                    ownerId: currentEvent.ownerId,
                    invitedId: currentEvent.invitedId
                }
            };

            if (isReoccuring) {
                data.rrule = {
                    byweekday: rules.byweekday,
                    freq: rules.freq,
                    dtstart: startDate.toISOString(),
                    until: rules.until,
                }
            };


            try {
                updateEventBackend(user.id, targetedEvent, data);
                setShowModifyAppointment(false);
            } catch (err) {
                console.log(err.response.data.error)
            }
        })();
    }



    const deleteAppointment = (e) => {
        e.preventDefault();
        (async () => {
            try {
                await deleteEvent(user.id, targetedEvent);
                setShowModifyAppointment(false);
            } catch (err) {
                console.log(err.response.data.error)
            }
        })();
    };


    useEffect(() => {
        loadEvent();
    }, [targetedEvent])



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
                    value={currentEvent.title}
                    onChange={(e) => updateEvent(e)}
                />

                <label htmlFor="description" className="labelInfoAddAp"><b>Description</b></label>
                <textarea className="inputDescription"
                    type="textarea"
                    placeholder="Description"
                    name="description"
                    id="description"
                    value={currentEvent.description}
                    onChange={(e) => updateEvent(e)}

                />

                <div className="divType">
                    <div className="containerType">
                        <label htmlFor="type" className="labelInfoAddAp"><b>Type</b></label>
                        <select className="inputType" name="backgroundColor" id="type-select"
                            value={currentEvent.backgroundColor}
                            onChange={(e) => updateEvent(e)}
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

                <label className="labelInfoAddAp">
                    <b>Récurrence</b>
                </label>
                <div>
                    <input
                        type="checkbox"
                        name="reccuring"
                        className="inputType"
                        value={isReoccuring}
                        onChange={() => { setReoccuring(!isReoccuring) }}
                    /> Activer la réccurence ?
                </div>

                {
                    isReoccuring ?
                        (

                            <div className="divReoccur">
                                <div htmlFor="frequence" className="divFrequence">
                                    <label htmlFor="frequence" className="labelFrequence">
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
                                                        onChange={(e) => updateRules(e)}
                                                        checked={rules.freq === f.value}
                                                    />
                                                    {f.label}
                                                </label>
                                            ))
                                        }

                                    </div>
                                </div>




                                <div htmlFor="byWeekDay" className="divByWeekDay">

                                    {rules.freq !== "monthly" ? (
                                        <>
                                            <label htmlFor="byWeekDay" className="labelByWeekDay">
                                                <b>Jour de la semaine</b>
                                            </label>
                                            <div className="divWeekdayCheckbox">
                                                {

                                                    weekdays.map((day, index) => (

                                                        <label htmlFor={day.value} key={day.key}>
                                                            <input type="checkbox" name="byweekday" value={day.value} checked={checked[index]}
                                                                onChange={(e) => handleCheckboxes(e, index)} />
                                                            {day.day}
                                                        </label>

                                                    ))
                                                }
                                            </div>
                                        </>
                                    )

                                        : null
                                    }

                                    <div htmlFor="endDate" className="divEndDate">
                                        <label htmlFor="endDate" className="labelEndDate">
                                            <b>Date de fin</b>
                                        </label>
                                        <div>
                                            <input type="date" name="until" value={rules.until} onChange={(e) => updateRules(e)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        : null
                }







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