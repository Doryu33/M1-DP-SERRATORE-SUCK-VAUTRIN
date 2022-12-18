import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { UserContext } from '../contexts/UserContext';
import '../styles/appointmentAsList.css';
import { frequency as frequence } from '../configs/weekdays';

const AppointmentAsList = ({id, start, end, title, description, requestDeletion, frequency}) => {
    const {isDark} = useContext(ThemeContext);
    const {user} = useContext(UserContext);
    const dateStart = new Date(start);
    const dateEnd = new Date(end);


    const translateFrequencyToLabel = (freq) =>{
        const obj = frequence.find(f => freq === f.value);
        return obj.label;
    }


    return (
        <div className={ isDark ? "containerAppList dark" : "containerAppList"}>
            <div className="containerInfos">
                <h3 className="dateSubtitle">{dateStart.toLocaleDateString('fr-FR')+" - "+ dateEnd.toLocaleDateString('fr-FR')}</h3>
                <h4 className="timeSubtitle">{dateStart.toLocaleTimeString('fr-FR', { timeZone: 'UTC' }).slice(0, -3)+" - "+ dateEnd.toLocaleTimeString('fr-FR', { timeZone: 'UTC' }).slice(0, -3)}
                {
                    frequency ? (<>
                        {" / Fréquence : "+ translateFrequencyToLabel(frequency)}
                    </>)
                    : null
                }
                </h4>
                <div className="containerAppointment">
                    <div className="titleAndDescriAppList">
                        <h3 className="titleAppList">{title}</h3>
                        <p className="descriptionAppList">{description}</p>
                        
                    </div>
                    <div className="containerButtons">
                        <button className="buttonAppList" onClick={() => requestDeletion(user.id, id)}>Supprimer</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AppointmentAsList;