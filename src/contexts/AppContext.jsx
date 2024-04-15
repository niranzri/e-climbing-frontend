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


    const addToFavourites = (productId) => {
        setProducts(prevProducts => {
            const updatedProducts = prevProducts.map(product => {
            if (product._id === productId) {
                return {...product, isFavourite: true}; // .map() creates a new object, so one needs a shallow copy, to which the updated isFavourite property is added
            }
            return product; 
        })
        console.log(updatedProducts)
        return updatedProducts;
        });
    }

    const removeFromFavourites = (productId) => {
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product._id === productId) {
                    return { ...product, isFavourite: false }; // Update the isFavourite property to false
                }
                return product;
            });
        });
    }

    return (
        <AppContext.Provider 
            value={{ products, setProducts, addToFavourites, removeFromFavourites }}> 
                {children} 
        </AppContext.Provider>
      );
}
 
export default AppContextProvider;