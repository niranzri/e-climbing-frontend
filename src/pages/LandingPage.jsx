import { useRef } from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/landingpage.module.css'
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import shoes from '../images/shoes.jpg';
import chalkBag from '../images/chalkbag.jpg';
import harness from '../images/harness.jpg';
import gear from '../images/gear.jpg';

const LandingPage = () => {

    const images = [
        'https://images.pexels.com/photos/3077882/pexels-photo-3077882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/97804/pexels-photo-97804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/449609/pexels-photo-449609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/434400/pexels-photo-434400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
        <>
            <div className={classes.header}>
                <p> Look no further for top-quality climbing gear. <br/> Your climbing adventure begins <span> <Link to='/products'> here </Link> </span> </p>
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
                <p> The finest climbing equipment </p>
                <Link to='/products'>
                    <button className={`${classes['c-button']} ${classes['c-button--gooey']}`}> Explore our collection 
                    <div className={classes['c-button__blobs']}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                        <svg className={classes.svgCtn} version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                            <filter id="goo">
                                <feGaussianBlur result="blur" stdDeviation="10" in="SourceGraphic"></feGaussianBlur>
                                <feColorMatrix result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" mode="matrix" in="blur"></feColorMatrix>
                                <feBlend in2="goo" in="SourceGraphic"></feBlend>
                            </filter>
                            </defs>
                        </svg>
                    </button>
                </Link>
                </div>
                <div className={classes.collectionBoxes}>
                    <div className={classes.collectionItemBox} style={{backgroundImage: `url(${shoes})`}}></div>
                    <div className={classes.collectionItemBox} style={{backgroundImage: `url(${chalkBag})`}}></div>
                    <div className={classes.collectionItemBox} style={{backgroundImage: `url(${harness})`}}></div>
                    <div className={classes.collectionItemBox} style={{backgroundImage: `url(${gear})`}}></div>
                </div>
            </div>
        </>
    );
}

export default LandingPage

