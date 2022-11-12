import { throwError } from "../../middlewares/errorHandler.js";
import Validator from "validatorjs";

const requiredFields = ["start", "end", "title", "description", "type", "reoccurrence-type"];


/**
 * Vérifie la validité des champs
 * @param {Object} newUser 
 */
export function addAppointmentValidation (newUser){

    const rules = {
        title: 'required',
        start: 'required',
        end: 'required|',
        description: 'required',
        type : 'required',
        reoccurence_type : 'required',
      };

    const validate = new Validator(newUser, rules);
    validate.passes();
    const errors = validate.errors.all();
    if (Object.values(errors).length > 0){
        throwError(422, "Invalid input(s)", errors);
    }
}