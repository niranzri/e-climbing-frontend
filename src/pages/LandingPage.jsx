import classes from '../styles/landingpage.module.css'
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';

const LandingPage = () => {

    const images = [
        'https://images.pexels.com/photos/3077882/pexels-photo-3077882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/97804/pexels-photo-97804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/449609/pexels-photo-449609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/434400/pexels-photo-434400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ];

    const slides = images.map((url) => (
        <Carousel.Slide key={url}>
            <Image src={url} alt="carousel slide"/>
        </Carousel.Slide>
    ));

    return (
        <div className={classes.carouselCtn}>
            <Carousel withIndicators loop >
                {slides}
            </Carousel>
        </div>
    );
}

export default LandingPage

