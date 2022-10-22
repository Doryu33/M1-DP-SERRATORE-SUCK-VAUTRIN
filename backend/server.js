import express from 'express';
import userRouter from './routers/userRoutes.js';

const PORT = 5000;

// instance d'express permettant de faire tourner le serveur
const app = express();


// ----------- Configuration du serveur avant de lui permettre de traiter des requêtes  -------------- //


/* Permet de livrer des fichiers statiques (html, images, etc) contenu dans le fichier resources
du frontend */
app.use(express.static('frontend/resources',
    {
        etag: false
    })
);

// Utilisations de routeurs pour répondre aux diverses requêtes possibles


// Exemple de Middleware : une requête URL avec '.../users/...' sera traité par le routeur userRouteur. 
// userRouteur traite la partie entre crochets pour déterminer quoi répondre : .../users/[...]
app.use('/users', userRouter);


// Traitement des requêtes lancés.
app.listen(PORT, () => console.log(`Server started (port ${PORT})`))


// Export du module vers app.js, à la racine du projet
export default app;

