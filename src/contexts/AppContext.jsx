import { createContext, useState, useEffect } from 'react';
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
            const modifiedProducts = initializeFavourites(response.data);
            setProducts(modifiedProducts);
        } catch (error) {
            console.error("Error fetching products:", error)
        }
    };

    const initializeFavourites = (products) => {
        return products.map(product => ({
            ...product, isFavourite: false
        }));
    }

    useEffect(() => {
        getAllProducts()
    }, []);

    return (
        <AppContext.Provider 
            value={{ products, setProducts }}> 
                {children} 
        </AppContext.Provider>
      );
}
 
export default AppContextProvider;