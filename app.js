import { app, PORT } from './backend/server.js';


// Lance l'écoute
app.listen(PORT, () => console.log(`Server started (port ${PORT})`))
