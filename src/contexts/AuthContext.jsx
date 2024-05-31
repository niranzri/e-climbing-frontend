import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false); // we can use this one for the login

    const saveToken = token => {
        setToken(token)
        setIsAuthenticated(true)
        window.localStorage.setItem('authToken', token)
    }

    const logOut = () => {
        setToken('')
        setIsAuthenticated(false)
        window.localStorage.removeItem('authToken')
    }

    const verifyToken = async tokenToVerify => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
                headers: {
                  Authorization: `Bearer ${tokenToVerify}`,
                },
            });
            if (response.status === 200) {
                setToken(tokenToVerify);
                window.localStorage.setItem('authToken', tokenToVerify);
                setIsAuthenticated(true);
                setIsLoading(false);
            }
            if (response.status === 401) { // handles invalid authentication tokens
                throw new Error('Invalid token');
            }

        } catch (error) { // catches any error coming from the network, server-side, etc. 
            setIsLoading(false)
        }
    }

    const fetchWithToken = async (endpoint, method = 'GET', payload) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api${endpoint}`, {
                method,
                headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
        })
        return response
        } catch (error) {
            console.error('Something went wrong with the fetchWithToken', error)
        }
    }


    useEffect(() => {
        const tokenFromLS = window.localStorage.getItem('authToken')
        if (tokenFromLS) {
          verifyToken(tokenFromLS)
        } else {
          setIsLoading(false)
        }
    }, [])


    return ( 
        <AuthContext.Provider value={{ isLoading, isAuthenticated, logOut, saveToken, fetchWithToken }}>
            { children }
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;