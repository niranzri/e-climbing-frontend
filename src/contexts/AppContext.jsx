import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const { fetchWithToken } = useContext(AuthContext)

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


    const addToFavourites = async (productId) => {
        try {
            const response = await fetchWithToken('/users/me/wishlist', 'POST', { productId })

            if (response.ok) {
                setProducts(prevProducts => {
                    const updatedProducts = prevProducts.map(product => {
                    if (product._id === productId) {
                        return {...product, isFavourite: true}; // .map() creates a new object, so one needs a shallow copy, to which the updated isFavourite property is added
                    }
                    return product; 
                    })
                    return updatedProducts;
                });
            console.log("Product added to favourites successfully");
            }

        } catch (error) {
            console.log("Error adding product to favourites:", error);
        }
    }

    const removeFromFavourites = async (productId) => {
        try {
            const response = await fetchWithToken(`/users/me/wishlist/${productId}`, 'DELETE', { productId })

            if (response.ok) {
                setProducts(prevProducts => {
                    const updatedProducts = prevProducts.map(product => {
                        if (product._id === productId) {
                            return { ...product, isFavourite: false }; // Update the isFavourite property to false
                        }
                        return product;
                    })
                    return updatedProducts;
                });
                console.log("Product removed from favourites successfully");
            }

        } catch (error) {
            console.log("Error removing product from favourites:", error);
        }

    }

    return (
        <AppContext.Provider 
            value={{ products, setProducts, addToFavourites, removeFromFavourites }}> 
                {children} 
        </AppContext.Provider>
      );
}
 
export default AppContextProvider;