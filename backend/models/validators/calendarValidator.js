import Validator from "validatorjs";
import { ValidationError } from '../../errors/validationError.js';
Validator.useLang('fr');

const rules = {
    id: "required",
    title: 'required',
    start: 'required|date',
    end: 'required|date',
    extendedProps: {
        description: "string",
    },
    rrule : {

    },
    backgroundColor: 'required|size:7',
}


const reoccurenceRule = {
    freq: "required|string",
    interval: "integer",
    byweekday: "array",
    dtstart: "required|date", 
    until: "date|after_or_equal:dtstart"
      
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


/**
 * Vérifie la validité du contenu de l'objet
 * @param {Object} ruleset 
 */
export function reoccurenceValidation (ruleset){
    const validate = new Validator(ruleset, reoccurenceRule);
    validate.passes();
    const errors = validate.errors.all();
    if (Object.values(errors).length > 0){
        throw new ValidationError("Rules are not valid", 422, errors);
    }
}