import { useState, useContext }  from "react";
import { Card, Image, Text, Badge, Group, Pill, Button } from '@mantine/core';
import { Slider, TextField, Typography, Grid, useMediaQuery } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { AppContext } from "../contexts/AppContext";
import classes from '../styles/shoppage.module.css';


const ShopPage = () => {
    const [selectedType, setSelectedType] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(300);
    const isSmallScreen = useMediaQuery('(max-width: 1024px)'); 

    const { products, setProducts } = useContext(AppContext);

    function removeDuplicates(data) {
        return [... new Set(data)]
    }

    let productTypes = removeDuplicates(products.map(product => product.type));
    let productBrands = removeDuplicates(products.map(product => product.brand));
    let productGenders = removeDuplicates(products.map(product => product.gender));

    const handleTypeSelection = (type) => {
        setSelectedType(type === selectedType ? null : type);
    };

    const handleBrandSelection = (brand) => {
        setSelectedBrand(brand === selectedBrand ? null : brand);
    };

    const handleGenderSelection = (gender) => {
        setSelectedGender(gender === selectedGender ? null : gender);
    };

    const filteredProducts = products.filter(product => { // the filter method creates a new array with all elements that pass the test implemented by the provided function
        return (!selectedType || product.type === selectedType) && // first part ensures that all products will be shown if nothing is selected
               (!selectedBrand || product.brand === selectedBrand) &&
               (!selectedGender || product.gender === selectedGender) &&
               (product.price >= minPrice && product.price <= maxPrice);
    });


    const saveToFavourites = (productId) => {
        setProducts(prevProducts => {
            const updatedProducts = prevProducts.map(product => {
            if (product._id === productId) {
                return {...product, isFavourite: !product.isFavourite}; // .map() creates a new object, so one needs a shallow copy, to which the updated isFavourite property is added
            }
            return product; 
        })
        return updatedProducts;
    });
    }

    return ( 
        <> 
            <div className={classes.header}>
                <p> From harnesses to carabines, we've got you covered with our top-quality climbing gear </p>
            </div>
            <div className={classes.mainCtn}> 
                <div className={classes.menuCtn}>
                    <div className={classes.filterCtn}> 
                        <h3> Type </h3>
                        <div className={classes.optionsCtn}>
                            {productTypes.map((product, index) => (
                                <Pill 
                                key={index} 
                                size="md" 
                                style={{ 
                                    backgroundColor: selectedType === product ? 'green' : '',
                                    margin: '2%'}}
                                onClick={() => handleTypeSelection(product)}> {product} </Pill>
                            ))}
                        </div>
                    </div>
                    <div className={classes.filterCtn}> 
                        <h3> Brand </h3>
                        <div className={classes.optionsCtn}>
                            {productBrands.map((brand, index) => (
                                <Pill 
                                key={index} 
                                size="md" 
                                style={{ 
                                    backgroundColor: selectedBrand === brand ? 'green' : '',
                                    margin: '2%'}}
                                onClick={() => handleBrandSelection(brand)}> {brand} </Pill>
                            ))}
                        </div>
                    </div>
                    <div className={classes.filterCtn}> 
                        <h3> Gender </h3>
                        <div className={classes.optionsCtn}>
                            {productGenders.map((gender, index) => (
                                <Pill 
                                key={index} 
                                size="md" 
                                style={{ 
                                    backgroundColor: selectedGender === gender ? 'green' : '',
                                    margin: '2%'}}
                                onClick={()=> handleGenderSelection(gender)}> {gender} </Pill>
                            ))}
                        </div>
                    </div>
                    <div className={classes.filterCtn}> 
                        <h3> Price</h3>
                        <div className={classes.priceCtn}>
                            <Typography variant="h6" gutterBottom></Typography>
                            <Grid container spacing={3} justifyContent={isSmallScreen ? 'center' : 'flex-start'} alignItems={isSmallScreen ? 'center' : 'flex-start'}>
                                <Grid item xs={isSmallScreen ? 2 : 4}>
                                    <TextField
                                        label="Min Price"
                                        type="number"
                                        variant="outlined"
                                        value={minPrice}
                                        className={classes.selected} 
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={isSmallScreen ? 2 : 4}>
                                    <TextField
                                        label="Max Price"
                                        type="number"
                                        variant="outlined"
                                        value={maxPrice}
                                        className={classes.selected}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <Slider
                                        value={[minPrice, maxPrice]}
                                        onChange={(e, value) => {
                                            setMinPrice(value[0]);
                                            setMaxPrice(value[1]);
                                        }}
                                        min={0}
                                        max={300}
                                        step={1}
                                        style={{ 
                                            color: 'green', 
                                            width: isSmallScreen ? '70%' : '100%', 
                                        }}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>

                <div className={classes.productsCtn}>
                    {filteredProducts.map(product => (
                        <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.productCtn} key={product._id}>
                            <Card.Section position="relative"> {/* allows positioning of child heart icon */}
                                <FontAwesomeIcon 
                                    icon={product.isFavourite ? solidHeart : regularHeart} 
                                    size="lg"
                                    className={classes.heartIcon} 
                                    onClick={() => saveToFavourites(product._id)} // function to save item to favourites
                                />
                                <Image
                                    src={product.image}
                                    height={160}
                                    alt="product image"
                                />
                            </Card.Section>

                            <Group justify="space-between" mt="md" mb="xs">
                                <Text fw={500}> {product.name} </Text>
                                <Text fw={500}> {product.brand} </Text>
                                <Badge color="black"> On Sale </Badge>
                            </Group>


                            <Group justify="space-between" mt="md" mb="xs">
                                <Text size="sm" c="dimmed"> {product.price} € </Text>
                            </Group>

                            <Button color="green" mt="md" radius="md"> Add to cart </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </>
     );
}
 
export default ShopPage;