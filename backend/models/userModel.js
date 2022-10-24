import { initialize, generateID } from './model.js';

const baseUser = {
    "username": null,
    "password": null,
    "email": null,
    "name": null,
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



    

   
}