import Validator from "validatorjs";
import { ValidationError } from '../../errors/validationError.js';
Validator.useLang('fr');

const rules = {
    id: "required",
    title: 'required',
    start: 'required|date',
    end: 'required|date',
    extendedProps: {
        description: "required",
    },
    backgroundColor: 'required|size:7',
}


/**
 * Vérifie la validité des champs
 * @param {Object} newUser 
 */
export function appointmentValidation(newAppointment) {

    const validate = new Validator(newAppointment, rules);
    validate.passes();
    const errors = validate.errors.all();
    if (Object.values(errors).length > 0) {
        throw new ValidationError("Invalid input(s)", 422, errors);
    }
}