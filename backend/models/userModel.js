import { initialize, generateID } from './model.js';

const baseUser = {
    "username": "",
    "password": "",
    "email": "",
    "name": "",
    "preferences": [],
    "appointments": [],
}

export default class UserModel {
    constructor(){
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
    async addUser(user){
        const users = this.db.data.users;
        const newId = generateID();

        // Utilise le format de base d'un utilisateur pour s'assurer que tous les champs existent dans la db
        users[newId] = Object.assign(baseUser, user);
    
        await this.db.write()
        return newId;
    }

    /**
     * Retourne toutes les données utilisateurs
     * @param {int} userId 
     * @returns {Object} Données utilisateurs
     */
    async getUserById(userId){
        const users = this.db.data.users;
        return users[userId];
    }

    /**
     * Mets à jour les données d'un utilisateur
     * @param {*} userId 
     * @param {*} newUserData 
     */
    async updateUser(userId, newUserData){
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
    async findUserByLoginAndPassword(login, password){
        const users = this.db.data.users;
        const usersArray = Object.values(users);
        const loggedInUser = usersArray.filter((user) => user.login === login && user.password === password);
        if (!loggedInUser[0]) throw new Error("User not recognized.");
        return loggedInUser[0];
    }



    

   
}