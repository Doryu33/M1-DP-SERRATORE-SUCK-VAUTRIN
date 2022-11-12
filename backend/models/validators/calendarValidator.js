import Validator from "validatorjs";
import { ValidationError } from '../../errors/validationError.js';
Validator.useLang('fr');
const requiredFields = ["start", "end", "title", "description", "type", "reoccurrence-type"];


/**
 * Vérifie la validité des champs
 * @param {Object} newUser 
 */
export function addAppointmentValidation(newAppointment) {

    const rules = {
        id: "required",
        title: 'required',
        start: 'required|date',
        end: 'required|date',
        extendedProps: {
            description: "required",
        },
        backgroundColor: 'required|hex|size:6',
    }


    const validate = new Validator(newAppointment, rules);
    validate.passes();
    const errors = validate.errors.all();
    if (Object.values(errors).length > 0) {
        throw new ValidationError("Invalid input(s)", 422, errors);
    }
}