import {Router} from 'express';
import UserController from '../controllers/userController.js';


// Exemple de routeur pour gérer les utilisateurs
const router = Router();

const controller = new UserController();


/**
 * Traite les requêtes GET comme au-dessus, sauf que ':userId' permet d'utiliser une URL de type :
 * site.com/users/12121235321 pour obtenir les données de l'utilisateur à l'identifiant correspondant.
 * on retrouve 'userId' dans req.params.id de la fonction userController.loadUserData (req, res)
 */
router.get('/id/:userId', controller.loadUserData);


router.post('/login', controller.login);

router.post('/register', controller.registerUser);

export default router;