import { initialize, generateID } from './model.js';
import { addAppointmentValidation } from './validators/calendarValidator.js';
import { ValidationError } from '../errors/validationError.js';

const baseCalendar = {
    id: null,
    title: null,
    start: null,
    end: null,
    backgroundColor: null,
    extendedProps: {
        description: null,
        ownerId: null,
        invitedId: [],
    }
}




export default class CalendarModel {
    constructor() {
        (async () => {
            this.db = await initialize();
        })();
    }


    async addAppointment(userId, appointment) {
        const users = this.db.data.users;
        if (userId == null || isNaN(userId) || !users.hasOwnProperty(userId)) {
            throw new ValidationError(`User not found or invalid user ID "${userId}".`, 404);
        }
        addAppointmentValidation(appointment);
        const appointments = this.db.data.events;

        if (Object.values(appointments).some(e => e?.id === appointment.id)){
            throw new ValidationError(`Event id "${appointment.id}" already exists.`, 403);
        }


        // Copie de la base du modèle et ajout des données nécessaire
        appointment.extendedProps.ownerId = userId;
        const extension = Object.assign(baseCalendar.extendedProps, appointment.extendedProps);
        appointments[appointment.id] = Object.assign(baseCalendar, appointment);
        appointments[appointment.id].extendedProps = extension;
        await this.db.write()
    }

    /**
     * Récupère tous les rdv d'un utilisateur
     * @param {Number} userId 
     * @returns Array de rendez-vous
     */
    async getAllAppointments(userId) {
        const users = this.db.data.users;
        if (userId == null || isNaN(userId) || !users.hasOwnProperty(userId)) {
            throw new ValidationError(`User not found or invalid user ID "${userId}".`, 400);
        }
        const appointments = this.db.data.events;
        const eventsFiltered = Object.values(appointments).filter(event => event?.extendedProps?.owner == userId || event?.extendedProps?.invitedId == userId)
        const copy = JSON.parse(JSON.stringify(eventsFiltered));
        return copy;
    }


    async getAppointmentById(eventId) {

        if (eventId == null || isNaN(eventId)) {
            throw new ValidationError(`Invalid event ID "${eventId}".`, 400);
        }
        const events = this.db.data.events;
        if (!events.hasOwnProperty(eventId)) throw new ValidationError(`Event not found`, 404);
        const copy = JSON.parse(JSON.stringify(events[eventId]));
        return copy;
    }


    async updateAppointment (userId, eventId, appointment){
        
        const events = this.db.data.events;
        const users = this.db.data.users;

        if (!users.hasOwnProperty(userId)) throw new ValidationError(`User not found`, 404);
        if (!events.hasOwnProperty(eventId)) throw new ValidationError(`Event not found`, 404);


        if (events[eventId].extendedProps.ownerId != userId) throw new ValidationError("Update forbidden : user is not owner of event.", 403);

        delete appointment.extendedProps.ownerId;
        const extension = Object.assign(events[eventId].extendedProps, appointment.extendedProps);
        events[eventId] = Object.assign(events[eventId], appointment);
        events[appointment.id].extendedProps = extension;
        await this.db.write()
    }

    async generateID() {
        const events = this.db.data.events;
        let id = generateID();;
        while (events.hasOwnProperty(id)) id = generateID();
        return id;

    }
}