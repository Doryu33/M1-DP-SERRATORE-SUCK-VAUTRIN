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
        //console.log(this.model.generateID());
        this.model.addUser(null);
        return res.status(200).send("Surprise!");
    }


    /**
     * Enregistre l'utilisateur tel quel et renvoie son identifiant unique.
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    registerUser = async (req, res) => {
        const userId = await this.model.addUser(null);
        return res.status(200).json({userId: userId});
    }

    /**
     * Charge les données utilisateur si trouvé, sinon erreur 404.
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    loadUserData = async (req, res) => {
        const userData = await this.model.getUserById(req.params.id);
        if (!userData) return res.status(404).json({error: "User not found."});
        const copy = JSON.parse(JSON.stringify(userData));
        
        return res.status(200).json(userData);
    }


    /**
     * Mets à jour le profil d'un utilisateur
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    updateUserData = async (req, res) => {
        let userData;
        try{
            userData = await this.model.updateUser(req.params.id, res.data.user);
        }catch(error){
            return res.status(404).json({error: error.message});
        }
        return res.status(200).json({user : userData})
    }


    /**
     * Tente d'authentifier l'utilisateur
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    login = async (req, res) => {
        const password = req.data?.password;
        const login = req.data?.login;

        if (!password || !login){
            return res.status(404).json({error: 'Login ou mot de passe absent de la requête.'});
        }

        try{
            const userFound = await this.model.findUserByLoginAndPassword(login, password);
            return res.status(200).json({user: userFound});
        }catch(error){
            return res.status(404).json({error: 'Utilisateur non authentifié.'});
        }

    }

}