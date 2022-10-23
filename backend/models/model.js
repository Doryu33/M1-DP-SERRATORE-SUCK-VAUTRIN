import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'


const DB_FILEPATH = 'backend/resources/db.json';

/**
 * Initialise les données et les rend disponibles pour l'application
 * En cas d'erreur (json vide ou avec juste un objet vide), génère un nouveau json avec une liste d'users
 * @returns instance de Low, module qui gère la base de données.
 */
export async function initialize(){
    const adapter = new JSONFile(DB_FILEPATH);
    const db = new Low(adapter);

    // Si le format du json est mauvais (donc si le json est totalement vide), erreur!
    try {
        await db.read()

        // Si l'objet est vide, erreur!
        if (Object.keys(db.data).length === 0){
            throw new Error('Erreur: Json Object est vide')
        } 
    }catch (err){
        db.data = { users: [] };
        await db.write();
    }
    
    return db;
}


export function generateID(){
    let generateNumber = () => {
        return Math.floor((1 + Math.random()) * 0x10101)
            .toString();
      }
    return generateNumber()+generateNumber();
}

