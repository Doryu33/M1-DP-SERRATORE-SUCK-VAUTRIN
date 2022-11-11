import {Router} from 'express';
import UserController from '../controllers/userController.js';


// Exemple de routeur pour gérer les utilisateurs
const router = Router();

const userController = new UserController();

/*
 Traite les requêtes GET (car router.get(...)) sur l'url .../users/all en utilisant la fonction getAllUsers
 du contrôleur userController
*/
router.get('/all', userController.getAllUsers);

/**
 * Traite les requêtes GET comme au-dessus, sauf que ':id' permet d'utiliser une URL de type :
 * site.com/users/12121235321 pour obtenir les données de l'utilisateur à l'identifiant correspondant.
 * on retrouve 'id' dans req.params.id de la fonction userController.loadUserData (req, res)
 */
router.get('/id/:id', userController.loadUserData);


router.post('/login', userController.login);

router.post('/register', userController.registerUser);

export default router;