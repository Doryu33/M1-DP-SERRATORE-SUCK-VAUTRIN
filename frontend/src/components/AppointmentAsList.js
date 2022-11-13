import React from 'react';
import '../styles/appointmentAsList.css';

const AppointmentAsList = (props) => {
    return (

        <div className="containerAppList">
            <div className="containerInfos">
                <h3 className="dateSubtitle">{props.date}</h3>
                <div className="containerAppointment">
                    <div className="titleAndDescriAppList">
                        <h3 className="titleAppList">{props.title}</h3>
                        <p className="descriptionAppList">{props.description}</p>
                    </div>
                    <div className="containerButtons">
                        <button className="buttonAppList">Modifier</button>
                        <button className="buttonAppList">Supprimer</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AppointmentAsList;