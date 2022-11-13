import { ValidationError } from '../errors/validationError.js';
import CalendarModel from '../models/calendarModel.js';


function verifyJsonBody(json) {
    if (Object.keys(json).length == 0 && json.constructor === Object) {
        throw new ValidationError("Invalid or empty Json object", 400);
    }
}

/**
 * Controller qui traite des requêtes sur les utilisateurs
 */
export default class CalendarController {

    constructor() {
        this.model = new CalendarModel();
    }

    /**
     * Enregistre l'utilisateur tel quel et renvoie son identifiant unique.
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    addAppointment = async (req, res, next) => {
        const json = req.body;

        // Si les données reçues sont vides on retourne une erreur
        try {
            verifyJsonBody(json, next);
            await this.model.addAppointment(req.params.userId, json);
            return res.status(200).json(true);
        } catch (err) {
            return next(err);
        }
    }


    deleteAppointment = async (req, res, next) => {
        const userId = req.params.userId;
        const eventId = req.params.eventId;

        try{
            if (userId == null || isNaN(userId)) {
                throw new ValidationError(`Invalid user ID "${userId}".`, 400);
            }
            if (eventId == null || isNaN(eventId)) {
                throw new ValidationError(`Invalid event ID "${eventId}".`, 400);
            }

            await this.model.deleteEvent(userId, eventId);
            return res.status(200).json(true);
        } catch (error){
            return next(error);
        }

    }


    /**
     * Récupère un événement d'un utilisateur par leurs ID
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    getAppointmentById = async (req, res, next) => {
        const eventId = req.params?.eventId;

        if (!eventId) {
            next(new ValidationError(`eventId and/or UserId missing`, 400));
        }

        try {
            const result = await this.model.getAppointmentById(eventId);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }


    }

    updateAppointment = async (req, res, next) => {
        const json = req.body;
        const userId = req.params?.userId;
        const eventId = req.params?.eventId;
        try {
            if (userId == null || isNaN(userId)) {
                throw new ValidationError(`Invalid user ID "${userId}".`, 400);
            }
            if (eventId == null || isNaN(eventId)) {
                throw new ValidationError(`Invalid event ID "${eventId}".`, 400);
            }

            verifyJsonBody(json);
            await this.model.updateAppointment(userId, eventId, json);
            return res.status(200).json(true);
        } catch (e) {
            return next(e);
        }
    }

    /**
     * Charge toutes les rendez-vous d'un utilisateur
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    getAllAppointments = async (req, res, next) => {
        try {
            const copy = await this.model.getAllAppointments(req.params.userId);
            return res.status(200).json(copy);
        } catch (err) {
            return next(err);
        }

    }

}