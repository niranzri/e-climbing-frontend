import { useState, useEffect }  from "react";
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import classes from '../styles/shoppage.module.css';

const ShopPage = () => {

    const [products, setProducts] = useState([]);

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

    return ( 
        <> 
            <div className={classes.header}>
                <h2> All our products </h2>
            </div>

            <div className={classes.productsCtn}>
                {products.map(product => (
                    <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.productCtn} key={product._id}>
                    <Card.Section>
                    <Image
                        src={product.image}
                        height={160}
                        alt="Norway"
                    />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}> {product.name}</Text>
                    <Text fw={500}> {product.brand}</Text>
                    <Badge color="black">On Sale</Badge>
                    </Group>


                    <Group justify="space-between" mt="md" mb="xs">
                    <Text size="sm" c="dimmed">
                        {product.price} € 
                    </Text>
                    </Group>

                    <Button color="green" mt="md" radius="md"> Add to cart </Button>
                    </Card>
                ))}
            </div>
        </>
     );
}
 
export default ShopPage;