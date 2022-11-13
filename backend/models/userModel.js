import { initialize, generateID, copyBase } from './model.js';
import { registerValidation } from './validators/userValidator.js';
import { ValidationError } from '../errors/validationError.js';

const baseUser = {
    "id": null,
    "username": null,
    "password": null,
    "email": null,
    "name": null,
    "preferences": [],
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

        if (Object.values(users).some(e => e.username === user.username))throw new ValidationError("Username already used.", 400);
        const newId = generateID();
        // Utilise le format de base d'un utilisateur pour s'assurer que tous les champs existent dans la db
        const base = copyBase(baseUser);
        users[newId] = Object.assign(base, user);
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
        if (!users.hasOwnProperty(userId)) throw new ValidationError (`User with ${userId} not found`, 404);
        const copy = JSON.parse(JSON.stringify(users[userId]));
        delete copy.password;
        return copy;
    }

    /**
     * Mets à jour les données d'un utilisateur
     * @param {*} userId 
     * @param {*} newUserData 
     */
    async updateUser(userId, newUserData) {
        const users = this.db.data.users;
        if (!users[userId]) throw new ValidationError (`UserId ${userId} not found`, 404);

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
        const loggedInUser = usersArray.filter(user => user.username === login && user?.password === password);
        if (!loggedInUser[0]) throw new ValidationError (`Login failed : user not found`, 404);
        const copy = JSON.parse(JSON.stringify(loggedInUser[0]));
        delete copy.password;
        return copy;
    }


}
