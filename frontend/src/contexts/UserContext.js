import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(() =>{

        // Récupère les données stockées dans le localstorage pour initialiser l'utilisateur
        let username = JSON.parse(localStorage.getItem("userUsername")) || null;
        let name = JSON.parse(localStorage.getItem("userName")) || null;
        let email = JSON.parse(localStorage.getItem("userEmail")) || null;
        let id = JSON.parse(localStorage.getItem("userId")) || null;

        if (!username || !email || !name || !id) {
            return false
        }
        return {
            username: username,
            name: name,
            email: email,
            id: id
        }
    });


    return (
        <>
        <UserContext.Provider value={{user, setUser}}>
            {children}

        </UserContext.Provider>
        </>
    )
}

export {UserContext, UserProvider};