import { initialize, generateID } from './model.js';



export default class UserModel {
    constructor(){
        this.db = initialize();
    }


    async addUser(user){
        const users = this.db.users;

        users.push(user);
        await this.db.write()
    }



    

   
}