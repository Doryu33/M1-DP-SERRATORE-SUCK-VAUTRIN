import {Router} from 'express';
import UserController from '../controllers/userController.js';


// Exemple de routeur 
const router = Router();

const userController = new UserController();

/*
 Traite les requêtes GET (car router.get(...)) sur l'url .../users/all en utilisant la fonction getAllUsers
 du contrôleur userController
*/
router.get('/all', userController.getAllUsers)

export default router;