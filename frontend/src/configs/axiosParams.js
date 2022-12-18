import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000/api/';



/**
 * Création d'une instance axios avec des paramètres de base: ici l'url de base est défini 
 * ça veut dire qu'il suffit par exemple de faire 
 * network.get('/users/10') pour demander les données de l'utilisateur dont l'identifiant est '10' 
 * Au lieu de faire 
 * network.get('http://localhost:5000/users/10') 
 * ce qui est plus ennuyant, pas pratique et si jamais on change le port faudrait le modifier partout et juste.. non.
 * 
 * Les headers permettent d'assurer au serveur qu'on envoie tout au format json, 
 * et qu'on n'accepte de recevoir des données qu'au format json.
 * Y'a moyen de rajouter des choses éventuellement si vous voulez. 
 * 
 * network.GET ou network.POST pour utiliser des requêtes GET / POST 
 * 
 */
const network = axios.create(
    {
        baseURL: BACKEND_URL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
);

export default network;