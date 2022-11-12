import { initialize, generateID } from './model.js';
import { addAppointmentValidation } from './validators/calendarValidator.js';
import { ValidationError } from '../errors/validationError.js';

const baseCalendar = {
    "id": null,
    "start": null,
    "end": null,
    "title": null,
    "description": null,
    "type": 1, // 1 à 10 : type de rendez-vous, couleurs
    "reoccurrence-type": 0, // 0: jamais, 1: journaliers, 2: hebdomadaire, 3: mensuel, 4: annuel,
};




export default class CalendarModel {
    constructor(){
        (async () => {
            this.db = await initialize();
        })();
    }


    async addAppointment(userId, appointment){
        const users = this.db.data.users;
        if (userId == null || isNan(userId) || !users.hasOwnProperty(userId)){
            throw new ValidationError(`User not found or invalid user ID "${userId}".`, 404);
        }
        addAppointmentValidation(appointment);
        const appointments = this.db.data.users[userId].appointments;
        let id = generateID();
        while (appointments.some(e => e.id === id)) id = generateID();

        appointments[id] = Object.assign(baseCalendar, appointment);
        appointments[id].id = id;
        await this.db.write()
        return id;
    }

    /**
     * Récupère tous les rdv d'un utilisateur
     * @param {Number} userId 
     * @returns Array de rendez-vous
     */
    async getAllAppointments (userId){
        const users = this.db.data.users;
        if (userId == null || isNaN(userId) || !users.hasOwnProperty(userId)){
            throw new ValidationError(`User not found or invalid user ID "${userId}".`, 404);
        }
        const appointments = users[userId].appointments;
        return appointments;
    } 



    

   
}