import { useRef } from 'react';
import classes from '../styles/landingpage.module.css'
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';

const LandingPage = () => {

    const images = [
        'https://images.pexels.com/photos/3077882/pexels-photo-3077882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/97804/pexels-photo-97804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/449609/pexels-photo-449609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/434400/pexels-photo-434400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ];

    const slides = images.map((url) => (
        <Carousel.Slide key={url}>
            <div className={classes.imageWrapper}>
                <Image src={url} width= "100%" height="auto" alt="carousel slide" className={classes.image}/>
            </div>
        </Carousel.Slide>
    ));

    const autoplay = useRef(Autoplay({ delay: 4000 }));

    return (
        <div className={classes.landingCtn}>
            <div className={classes.header}>
                <p> Your climbing adventure begins <span> here </span> </p>
            </div>
            <div className={classes.carouselCtn}>
                <Carousel 
                mx="auto"
                loop
                withIndicators 
                style={{ width: '100%' }}       
                plugins={[autoplay.current]}>
                    {slides}
                </Carousel>
            </div>
            <div className={classes.collectionCtn}>
                <div className={classes.collectionText}> 
                    Explore our collection 
                </div>
                <div className={classes.collectionBoxes}>
                    <div className={classes.collectionItemBox}></div>
                    <div className={classes.collectionItemBox}></div>
                    <div className={classes.collectionItemBox}></div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage

