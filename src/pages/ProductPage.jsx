import { useState, useEffect, useContext }  from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Image, Text, Badge, Group, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { AppContext } from "../contexts/AppContext";
import classes from '../styles/shoppage.module.css';
import newclasses from '../styles/shopdetailspage.module.css';

const ProductPage = () => {
    const { productId } = useParams();
    const { products, saveToFavourites } = useContext(AppContext);
    const selectedProduct = products.find(product => product._id === productId);

    if (!selectedProduct) {
        return <div> Loading... </div>; 
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
                                    onClick={() => saveToFavourites(selectedProduct._id)} // function to save item to favourites
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
                            <Button color="purple" mt="md" radius="md"> Add review </Button>

                        <Link to="/products">
                            <Button color="green" mt="md" radius="md"> Go back to list </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default ProductPage;