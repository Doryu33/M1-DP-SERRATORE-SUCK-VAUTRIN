/**
 * Controller qui traite des requêtes sur les utilisateurs
 */
export default class UserController {

    /**
     * Retourne pour le moment rien d'intéressant.
     */
    getAllUsers = async (req, res) => {
        console.log(req)
        return res.status(200).send("Surprise!");
    }

}