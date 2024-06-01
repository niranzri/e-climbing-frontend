import { useState, useEffect, useContext }  from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Image, Text, Badge, Group, Button, Modal } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { AppContext } from "../contexts/AppContext";
import { AuthContext } from "../contexts/AuthContext";
import classes from '../styles/shoppage.module.css';
import newclasses from '../styles/shopdetailspage.module.css';


const ProductPage = () => {
    const { productId } = useParams();
    const { addToFavourites, removeFromFavourites, addToCart, removeFromCart, updateProductReviews, getProduct } = useContext(AppContext);
    const { isAuthenticated } = useContext(AuthContext)
    const [showLoginNotificationFavourites, setShowLoginNotificationFavourites] = useState(false);
    const [showLoginNotificationCart, setShowLoginNotificationCart] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                await updateProductReviews(productId); // Update product review first;
                const product = await getProduct(productId);
                setSelectedProduct(product);
            } catch (error) {
                console.error("Error fetching product with reviews:", error);
            }
        };

        fetchProduct();

    }, [ productId, updateProductReviews, getProduct ]);


    if (!selectedProduct) {
        return <div> Loading... </div>; 
    }

    // console.log(selectedProduct)

    const toggleFavouritesStatus = () => {
        if (!isAuthenticated) {
            setShowLoginNotificationFavourites(true);
        } else {
            const isProductInFavorites = selectedProduct.isFavourite;
            if (!isProductInFavorites) {
                addToFavourites(selectedProduct._id); // POST request to server and products state update
            } else {
                removeFromFavourites(selectedProduct._id); // DELETE request to server and products state update
            }
        }
    }

    const toggleCartStatus = () => {
        if (!isAuthenticated) {
            setShowLoginNotificationCart(true);
        } else {
            const isProductInCart = selectedProduct.isInCart;
            if (!isProductInCart) {
                addToCart(selectedProduct._id); // POST request to server and products state update
            } else {
                removeFromCart(selectedProduct._id); // DELETE request to server and products state update
            }
        }
    }

    const handleAddReview = () => {
        console.log("complete")
    }

    return ( 
        <> 
            <div className={classes.header}>
                <p> Check product details below </p>
            </div>
            <div className={newclasses.mainCtn}> 
                <div className={newclasses.productsCtn}>
                    { selectedProduct && (
                        <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.productCtn} key={selectedProduct._id}>
                            <Card.Section position="relative"> {/* allows positioning of child heart icon */}
                                <FontAwesomeIcon 
                                    icon={selectedProduct.isFavourite ? solidHeart : regularHeart} 
                                    size="lg"
                                    className={classes.heartIcon} 
                                    onClick={toggleFavouritesStatus} // function to save item to favourites
                                />
                                {console.log(selectedProduct)} 
                                <Image
                                    src={selectedProduct.image}
                                    height={160}
                                    alt="product image"
                                />
                            </Card.Section>

                            <Group justify="space-between" mt="md" mb="xs">
                                <Text fw={500}> {selectedProduct.name} </Text>
                                <Text fw={500}> {selectedProduct.brand} </Text>
                                <Badge color="black"> On Sale </Badge>
                            </Group>

                            <Group justify="space-between" mt="md" mb="xs">
                                <Text size="sm" c="dimmed"> {selectedProduct.price} € </Text>
                            </Group>

                            <Button 
                                color="green" mt="md" radius="md"
                                onClick={toggleCartStatus}> { selectedProduct.isInCart ? 'Remove from Cart' : 'Add to Cart'}
                            </Button>
                        </Card>
                        )
                    }

                    <div className={newclasses.rightCtn}> 
                        <p> Reviews </p>
                        <div className={newclasses.reviewsCtn}>
                            {selectedProduct.reviews && selectedProduct.reviews.map((review)=> (
                                <div key={review._id} className={newclasses.reviewCtn}>
                                    <div>{review.rating}</div>
                                    <div>{review.title}</div>
                                    <div>{review.description}</div>
                                </div>
                            ))}
                        </div>
                        
                        <div className={newclasses.buttonsCtn}>
                            { isAuthenticated &&
                            <div className={newclasses.buttonCtn}>
                            <Button 
                                color="purple" 
                                mt="md" 
                                radius="md"
                                fluid
                                onClick={handleAddReview}> 
                                    Add review 
                            </Button> 
                            </div>
                            }
                            <Link to="/products">
                                <Button 
                                color="green" 
                                mt="md" 
                                radius="md"> 
                                    Go back to list 
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Modal opened={showLoginNotificationFavourites} onClose={() => setShowLoginNotificationFavourites(false)}>
                <Modal.Body>You need to login to save this product to favourites.</Modal.Body>
                <div className={newclasses.modalButtons}>
                    <Link to="/login">
                        <Button color="green"> Login </Button>
                    </Link>
                </div>
            </Modal>

            <Modal opened={showLoginNotificationCart} onClose={() => setShowLoginNotificationCart(false)}>
                <Modal.Body>You need to login to add this product to your cart.</Modal.Body>
                <div className={newclasses.modalButtons}>
                    <Link to="/login">
                        <Button color="green"> Login </Button>
                    </Link>
                </div>
            </Modal>
        </>
     );
}
 
export default ProductPage;