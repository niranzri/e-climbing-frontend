import classes from '../styles/navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faUser} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'


const Navbar = () => {
    return (
        <nav>
            <Link to="/">
            <div className={classes.logoCtn}> 
                <p> CrimpIt </p>
            </div>
            </Link>
            <div className={classes.linksCtn}>
                <Link to='/profile/wishlist'>
                    <FontAwesomeIcon icon={faHeart}/>
                </Link>
                <Link to='/profile/cart'>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                </Link>
                <Link to='/profile'>
                    <FontAwesomeIcon icon={faUser}/>
                </Link>
            </div>
        </nav>
    );
}
 
export default Navbar;