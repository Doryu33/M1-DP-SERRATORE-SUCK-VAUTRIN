import Validator from "validatorjs";
import { ValidationError } from '../../errors/validationError.js';

const requiredFields = ["start", "end", "title", "description", "type", "reoccurrence-type"];


/**
 * Vérifie la validité des champs
 * @param {Object} newUser 
 */
export function addAppointmentValidation (newAppointment){

    const rules = {
        title: 'required',
        start: 'required',
        end: 'required|',
        description: 'required',
        type : 'required|numeric|min:0',
        reoccurence_type : 'required|numeric|min:0',
      };

    const validate = new Validator(newAppointment, rules);
    validate.passes();
    const errors = validate.errors.all();
    if (Object.values(errors).length > 0){
        throw new ValidationError ("Invalid input(s)", 422, errors);
    }
}