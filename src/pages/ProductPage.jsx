import { useState, useContext }  from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Image, Text, Badge, Group, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { AppContext } from "../contexts/AppContext";
import { AuthContext } from "../contexts/AuthContext";
import classes from '../styles/shoppage.module.css';
import newclasses from '../styles/shopdetailspage.module.css';
import axios from "axios";

const ProductPage = () => {
    const { productId } = useParams();
    const { products, addToFavourites, removeFromFavourites} = useContext(AppContext);
    const { isAuthenticated } = useContext(AuthContext)
    const [showLoginNotificationFavourites, setShowLoginNotificationFavourites] = useState(false);
    const [showLoginNotificationCart, setShowLoginNotificationCart] = useState(false);
    const { opened, close, open } = useDisclosure();

    const selectedProduct = products.find(product => product._id === productId);

    if (!selectedProduct) {
        return <div> Loading... </div>; 
    }

    console.log(isAuthenticated)

    const handleSaveToFavourites = () => {
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
    // () => saveToFavourites(selectedProduct._id)

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            setShowLoginNotificationCart(true);
        } else {
            // push product to cart in user routes
            console.log("request to add product to cart needed")
        }
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
                                    onClick={handleSaveToFavourites} // function to save item to favourites
                                />
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

                            <Button color="green" mt="md" radius="md"> Add to cart </Button>
                        </Card>
                        )
                    }

                    <div className={newclasses.reviewCtn}> 
                        Reviews
                            <Button type='subutton' color="purple" mt="md" radius="md"> Add review </Button>

                        <Link to="/products">
                            <Button color="green" mt="md" radius="md"> Go back to list </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <Modal opened={showLoginNotificationFavourites} onClose={() => setShowLoginNotificationFavourites(false)}>
                <Modal.Body>You need to login to save this product to favourites.</Modal.Body>
                <div className="modal-buttons">
                    <Button color="green" onClick={() => setShowLoginNotificationFavourites(false)}>Close</Button>
                    <Link to="/login">
                        <Button color="green">Login</Button>
                    </Link>
                </div>
            </Modal>

            <Modal opened={showLoginNotificationCart} onClose={() => setShowLoginNotificationCart(false)}>
                <Modal.Body>You need to login to add this product to your cart.</Modal.Body>
                <div className="modal-buttons">
                    <Button color="green" onClick={() => setShowLoginNotificationCart(false)}>Close</Button>
                    <Link to="/login">
                        <Button color="green">Login</Button>
                    </Link>
                </div>
            </Modal>
        </>
     );
}
 
export default ProductPage;