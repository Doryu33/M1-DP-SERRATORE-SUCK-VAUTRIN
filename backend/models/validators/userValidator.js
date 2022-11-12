import Validator from "validatorjs";
import { ValidationError } from "../../errors/validationError.js";
Validator.useLang('fr');



/**
 * Vérifie la validité des champs
 * @param {Object} newUser 
 */
export function registerValidation (newUser){

    const rules = {
        username: 'required',
        name: 'required',
        email: 'required|email',
        password: 'required'
      };

    const validate = new Validator(newUser, rules);
    validate.passes();
    const errors = validate.errors.all();
    if (Object.values(errors).length > 0){
        throw new ValidationError("Invalid input(s)", 422, errors);
    }
}