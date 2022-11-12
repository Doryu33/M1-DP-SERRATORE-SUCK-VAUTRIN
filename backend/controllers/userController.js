import UserModel from '../models/userModel.js';
import { ValidationError } from '../errors/validationError.js';

/**
 * Controller qui traite des requêtes sur les utilisateurs
 */
export default class UserController {

    constructor() {
        this.model = new UserModel();
    }



    /**
     * Enregistre l'utilisateur tel quel et renvoie son identifiant unique.
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    registerUser = async (req, res, next) => {
        const json = req.body;

        // Si les données reçues sont vides on retourne une erreur
        if (Object.keys(json).length == 0 && json.constructor === Object) {
            return next(new ValidationError("Invalid or empty userdata", 400));
        }

        try {
            const userId = await this.model.addUser(json);
            return res.status(200).json({userId: userId});
        } catch (err) {
            return next(err);
        }
    }

    /**
     * Charge les données utilisateur si trouvé, sinon erreur 404.
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    loadUserData = async (req, res, next) => {
        try{
            const userData = await this.model.getUserById(req.params.userId);
            return res.status(200).json(userData);
        } catch (err){
            next(err);
        }
    }


    /**
     * Mets à jour le profil d'un utilisateur
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    updateUserData = async (req, res, next) => {
        let userData;
        try{
            userData = await this.model.updateUser(req.params.userId, res.data.user);
        }catch(error){
            return next(error);
        }
        return res.status(200).json({user : userData})
    }


    /**
     * Tente d'authentifier l'utilisateur
     * @param {*} req 
     * @param {*} res 
     * @param {*} next
     * @returns 
     */
    login = async (req, res, next) => {
        const data = req.body;
        const password = data.password;
        const login = data.username;

        if (!password || !login){
            return next (new ValidationError(`Invalid or missing password or username`, 404));
        }

        try{
            const userFound = await this.model.findUserByLoginAndPassword(login, password);
            return res.status(200).json(userFound);
        }catch(error){
            next(error);
        }

    }

}