import { useState, useEffect }  from "react";
import { Card, Image, Text, Badge, Group, Pill, Button } from '@mantine/core';
import { Slider, TextField, Typography, Grid } from '@material-ui/core';
import classes from '../styles/shoppage.module.css';
import axios from "axios";

const ShopPage = () => {

    const [products, setProducts] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(300);

    /* fetch version (below with axios)
    useEffect(() => {
        const fetchProducts = async() => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`)
                console.log(response)
                if (response.ok) {
                    const productsData = await response.json()
                    setProducts(productsData);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    }, [])
    */

    const getAllProducts = () => {
        axios
        .get(`${import.meta.env.VITE_API_URL}/api/products`)
        .then(response => setProducts(response.data))
        .catch(error => console.log(error));
    };

    useEffect(() => {
        getAllProducts();
    }, []);

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

    return ( 
        <> 
            <div className={classes.header}>
                <h3> All our products </h3>
            </div>
            <div className={classes.mainCtn}> 
                <div className={classes.menuCtn}>
                    <div className={classes.filterCtn}> 
                        <h3> Type </h3>
                        {productTypes.map((product, index) => (
                            <Pill 
                            key={index} 
                            size="md" 
                            className={`${classes.pill} ${selectedType === product ? classes.selected : ""}`}
                            onClick={() => handleTypeSelection(product)}> {product} </Pill>
                        ))}
                    </div>
                    <div className={classes.filterCtn}> 
                        <h3> Brand </h3>
                        {productBrands.map((brand, index) => (
                            <Pill 
                            key={index} 
                            size="md" 
                            className={`${classes.pill} ${selectedBrand === brand ? classes.selected : ""}`}
                            onClick={() => handleBrandSelection(brand)}> {brand} </Pill>
                        ))}
                    </div>
                    <div className={classes.filterCtn}> 
                        <h3> Gender </h3>
                        {productGenders.map((gender, index) => (
                            <Pill 
                            key={index} 
                            size="md" 
                            className={`${classes.pill} ${selectedGender === gender ? classes.selected : ""}`}
                            onClick={()=> handleGenderSelection(gender)}> {gender} </Pill>
                        ))}
                    </div>
                    <div className={classes.filterCtn}> 
                        <h3> Price</h3>
                        <Typography variant="h6" gutterBottom></Typography>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={4}>
                            <TextField
                                label="Min Price"
                                type="number"
                                variant="outlined"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                fullWidth
                            />
                            </Grid>

                            <Grid item xs={4}>
                            <TextField
                                label="Max Price"
                                type="number"
                                variant="outlined"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                fullWidth
                            />

                            </Grid><Grid item xs={12}>

                            <Slider
                                value={[minPrice, maxPrice]}
                                onChange={(e, value) => {
                                    setMinPrice(value[0]);
                                    setMaxPrice(value[1]);
                                }}
                                min={0}
                                max={300}
                                step={1}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                            />
                            </Grid> <Grid item xs={12}>
                            {/*<Button color="green" mt="md" radius="md"> Apply </Button>*/}
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <div className={classes.productsCtn}>
                    {filteredProducts.map(product => (
                        <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.productCtn} key={product._id}>
                            <Card.Section>
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