import { initialize, generateID } from './model.js';
import { appointmentValidation } from './validators/calendarValidator.js';
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

        // Génère un identifiant
        let id = generateID();;
        while (appointments.hasOwnProperty(id)) id = generateID();
        appointment.id = id;


        appointmentValidation(appointment);
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
        appointmentValidation(appointment);

        if (appointment.extendedProps.hasOwnProperty("ownerId")) delete appointment.extendedProps.ownerId;
        const extension = Object.assign(events[eventId].extendedProps, appointment.extendedProps);
        events[eventId] = Object.assign(events[eventId], appointment);
        events[appointment.id].extendedProps = extension;
        await this.db.write()
    }


    /**
     * Suppression d'un événement
     * @param {*} userId 
     * @param {*} eventId 
     */
    async deleteEvent (userId, eventId) {
        const users = this.db.data.users;
        const events = this.db.data.events;

        if (!events.hasOwnProperty(eventId)) throw new ValidationError(`Event ${eventId} not found`, 404);
        if (!users.hasOwnProperty(userId)) throw new ValidationError(`User ${userId} not found`, 404);

        const targetedEvent = events[eventId];
        if (targetedEvent.extendedProps.hasOwnProperty("ownerId") && targetedEvent.extendedProps.ownerId !== userId) throw new ValidationError(`User ${userId} is not allow to delete event ${eventId}`, 403);
        delete events[eventId];
        await this.db.write();
    }
}