import { initialize, generateID } from './model.js';

const baseCalendar = {
    "id": null,
    "start": null,
    "end": null,
    "title": null,
    "description": null,
    "type": 1, // 1 à 10 : type de rendez-vous, couleurs
    "reoccurrence-type": 0, // 0: jamais, 1: journaliers, 2: hebdomadaire, 3: mensuel, 4: annuel,
};

const requiredFields = ["start", "end", "title", "description", "length", "type", "reoccurrence-type"];



export default class CalendarModel {
    constructor(){
        this.db = initialize();
    }


    async addAppointment(userId, appointment){
        const id = generateID();

    } 



    

   
}