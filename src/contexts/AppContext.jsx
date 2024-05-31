import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
const AppContextProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const { fetchWithToken } = useContext(AuthContext)

    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
            const modifiedProducts = initializeProducts(response.data);
            setProducts(modifiedProducts);
        } catch (error) {
            console.error("Error fetching products:", error)
        }
    };

    const initializeProducts = (products) => {
        return products.map(product => ({
            ...product, isFavourite: false, isInCart: false
        }));
    }

    useEffect(() => {
        getAllProducts()
    }, []);


    // unify addToFavourites and removeFromFavourites in one function
    const addToFavourites = async (productId) => {

        // something like: if product.id === productId
        // if product.isFavourite === false
            // THEN POST to wishlist and update product state. 
            // ELSE DELETE from wishlist and update product state.
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

    // same logic wishlist > add to cart
    const addToCart = async (productId) => {
        try {
            const response = await fetchWithToken('/users/me/cart', 'POST', { productId })

            if (response.ok) {
                setProducts(prevProducts => {
                    const updatedProducts = prevProducts.map(product => {
                    if (product._id === productId) {
                        return {...product, isInCart: true}; // .map() creates a new object, so one needs a shallow copy, to which the updated isFavourite property is added
                    }
                    return product; 
                    })
                    return updatedProducts;
                });
            console.log("Product added to cart successfully");
            }

        } catch (error) {
            console.log("Error adding product to cart:", error);
        }
    }

    const removeFromCart = async (productId) => {
        try {
            const response = await fetchWithToken(`/users/me/cart/${productId}`, 'DELETE', { productId })

            if (response.ok) {
                setProducts(prevProducts => {
                    const updatedProducts = prevProducts.map(product => {
                        if (product._id === productId) {
                            return { ...product, isInCart: false }; // Update the isInCart property to false
                        }
                        return product;
                    })
                    return updatedProducts;
                });
                console.log("Product removed from cart successfully");
            }

        } catch (error) {
            console.log("Error removing product from cart:", error);
        }

    }

    const updateProductReviews = async (productId, newReviews) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${productId}/reviews`, newReviews);
            return response.data;

        } catch (error) {
            console.log("Error updating product reviews:", error)
            throw error;
        }
    }

    const getProduct = async (productId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${productId}`);
            return response.data;

        } catch (error) {
            console.log("Error getting product:", error)
            throw error;
        }
    }


    return (
        <AppContext.Provider 
            value={{ products, setProducts, addToFavourites, removeFromFavourites, addToCart, removeFromCart, updateProductReviews, getProduct }}> 
                {children} 
        </AppContext.Provider>
      );
}
 
export default AppContextProvider;