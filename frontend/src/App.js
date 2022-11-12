import './styles/App.css';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/calendar" element={<Home />} />

            {/*path="*" va vers l'accueil si l'url n'est pas reconnu*/}
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
