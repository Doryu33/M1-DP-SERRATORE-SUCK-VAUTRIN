import UserModel from '../models/userModel.js';

/**
 * Controller qui traite des requêtes sur les utilisateurs
 */
export default class UserController {

    constructor() {
        this.model = new UserModel();
    }

    /**
     * Retourne pour le moment rien d'intéressant.
     */
    getAllUsers = async (req, res) => {
        console.log(this.model.generateID());
        return res.status(200).send("Surprise!");
    }


    registerUser = async (req, res) => {
        
    }

}