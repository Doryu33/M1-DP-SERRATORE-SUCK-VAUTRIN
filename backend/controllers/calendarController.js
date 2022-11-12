import { ValidationError } from '../errors/validationError.js';
import CalendarModel from '../models/calendarModel.js';

function verifyJsonBody(json){
    if (Object.keys(json).length == 0 && json.constructor === Object) {
        throw new ValidationError("Invalid or empty Json object", 404);
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
        try  {
            verifyJsonBody(json, next);
            const appointmentId = await this.model.addAppointment(req.params.userId, json);
            return res.status(200).json({appointmentId: appointmentId});
        } catch (err) {
            return next(err);
        }
    }

    updateAppointment = async (req, res, next) => {
        const json = req.body;


    }

    /**
     * Charge toutes les rendez-vous d'un utilisateur
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    getAllAppointments = async (req, res, next) => {
        try{
            const appointments = await this.model.getAllAppointments(req.params.userId);
            const copy = JSON.parse(JSON.stringify(appointments));
            return res.status(200).json(copy);
        } catch (err) {
            return next(err);
        }
        
    }

}