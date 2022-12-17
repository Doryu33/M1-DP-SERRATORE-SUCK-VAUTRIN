import {Router} from 'express';
import CalendarController from '../controllers/calendarController.js';


// Exemple de routeur pour gérer les utilisateurs
const router = Router();

const controller = new CalendarController();

/*
 * Traite les requêtes GET comme au-dessus, sauf que ':id' permet d'utiliser une URL de type :
 * site.com/users/12121235321 pour obtenir les données de l'utilisateur à l'identifiant correspondant.
 * on retrouve 'id' dans req.params.id de la fonction userController.loadUserData (req, res)
 */
router.get('/:userId/all/', controller.getAllAppointments);
router.get('/:userId/:eventId', controller.getAppointmentById);

//router.get('/:userId/options', controller.getAllEventsBetweenDate)

router.post('/:userId/add', controller.addAppointment);

router.delete('/:userId/:eventId/delete', controller.deleteAppointment)

router.patch('/:userId/:eventId/update', controller.updateAppointment);






export default router;