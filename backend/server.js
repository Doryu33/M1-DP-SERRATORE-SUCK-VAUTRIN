import express from 'express';
import userRouter from './routers/userRoutes.js';
import calendarRouter from './routers/calendarRoutes.js';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { errorHandler, wrongRouteHandler } from './middlewares/errorHandler.js';


// initialise la lecture du fichier .env
dotenv.config({ debug: true })

// Port utilisé par le serveur
const PORT = process.env.BACKEND_PORT;


// instance d'express permettant de faire tourner le serveur
const app = express();

// Stratégie CORS public
app.use(cors());

// ----------- Configuration du serveur avant de lui permettre de traiter des requêtes  -------------- //


// Accepte uniquement des données au format json
app.use(express.json());


// Utilisations de routeurs pour répondre aux diverses requêtes possibles


// Exemple de Middleware : une requête URL avec '.../users/...' sera traité par le routeur userRouteur. 
// userRouteur traite la partie entre crochets pour déterminer quoi répondre : .../users/[...]
app.use('/users', userRouter);
app.use('/calendar', calendarRouter);
app.use('*', wrongRouteHandler);

// Gestion des erreurs 
app.use(errorHandler);

// Lance l'écoute
app.listen(PORT, () => console.log(`Server started (port ${PORT})`));

