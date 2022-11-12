import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userUsername");
        localStorage.removeItem("userName");
        navigate('/login');
    }, []);

    return (
        <div>

        </div>
    );
};

export default Logout;