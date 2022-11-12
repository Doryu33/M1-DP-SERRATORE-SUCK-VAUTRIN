import { initialize, generateID } from './model.js';
import { throwError } from '../middlewares/errorHandler.js';
import { registerValidation } from './validators/userValidator.js';

const baseUser = {
    "id": null,
    "username": "",
    "password": "",
    "email": "",
    "name": "",
    "preferences": [],
    "appointments": [],
};

export default class UserModel {
    constructor() {
        (async () => {
            this.db = await initialize();
        })();
    }


    /**
     * Ajoute un utilisateur en générant un ID
     * Les utilisateurs sont stockés dans une 'hashmap' (un objet users) et identifiés par leur ID unique 
     * @param {*} user 
     * @returns {int} identifiant unique généré pour cet utilisateur
     */
    async addUser(user) {
        const users = this.db.data.users;
        registerValidation(user);

        if (Object.values(users).some(e => e.username === user.username)) throwError(400, "Username already used.");
        const newId = generateID();
        // Utilise le format de base d'un utilisateur pour s'assurer que tous les champs existent dans la db
        users[newId] = Object.assign(baseUser, user);
        users[newId].id = newId;

        await this.db.write()
        return newId;
    }

    /**
     * Retourne toutes les données utilisateurs
     * @param {int} userId 
     * @returns {Object} Données utilisateurs
     */
    async getUserById(userId) {
        const users = this.db.data.users;
        delete users[userId].password;
        delete users[userId].appointments;
        return users[userId];
    }

    /**
     * Mets à jour les données d'un utilisateur
     * @param {*} userId 
     * @param {*} newUserData 
     */
    async updateUser(userId, newUserData) {
        const users = this.db.data.users;
        if (!users[userId]) throw new Error(`UserId ${userId} not found`);

        Object.assign(users[userId], newUserData);

        await this.db.write();
    }

    /**
     * Trouve un utilisateur via son login & mot de passe
     * @param {*} login 
     * @param {*} password 
     * @returns null | user
     * @throws Error user not recognized
     */
    async findUserByLoginAndPassword(login, password) {
        const users = this.db.data.users;
        const usersArray = Object.values(users);
        const loggedInUser = usersArray.filter(user => user.username === login && user.password === password);
        delete loggedInUser[0].password;
        delete loggedInUser[0].appointments;
        if (!loggedInUser[0]) throwError(404, "User not found.");
        return loggedInUser[0];
    }


}


export { requiredFields, baseUser };