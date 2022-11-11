import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import network from './configs/axiosParams';

function App() {

  useEffect(()=>{

    /**
     * Exemple de requête avec Fetch, c'est englobé dans une fonction asynchrone pour éviter ce genre d'horreur:
     * const data = fetch(...).then(data => data.json()).then(data => faire des trucs avec data).then(data => encore une fois).catch(err => afficher erreur());
     */
    const getUsersWithFetchAPI = async (body) => {
      const response = await fetch('http://localhost:5000/users/id/10',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        // body: JSON.stringify(data)   // potransformé un objet en json pour l'envoyer via le body au serveur (password / login, etc)
      });
      // parse la réponse en json 
      const data = await response.json();
      console.log(data);
    };


    /**
     * Exemple de requête avec Axios ; comme au dessus, c'est englobé dans une fonction asynchrone pour pas faire un truc immonde 
     * Pour l'utiliser, suffit d'importer network depuis configs/axiosParams 
     * D'ailleurs pour modifier la config selon vos besoin vous pouvez aler voir là-dedans
     */
    const getUsersWithAxios = async() =>{
      const response = await network.get('/users/id/10');
      console.log(response.data);

      /* Exemple (qui ne marche actuellement PAS) de requête POST avec des données fournies : 
  
      const response. await network.post('/users',{
        username: 'Finn',
        email: 'fred@f.fr'
      });



      */
    }

    getUsersWithFetchAPI();
    getUsersWithAxios();


  }, [])




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
