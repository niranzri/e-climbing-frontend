import classes from '../styles/navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faUser} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'



const Navbar = () => {
    const { isAuthenticated } = useContext(AuthContext);

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
                { !isAuthenticated ?
                <Link to='/login'>
                    <FontAwesomeIcon icon={faUser}/>
                </Link> :
                <Link to='/profile'>
                    <FontAwesomeIcon icon={faUser}/>
                </Link>
                }
            </div>
        </nav>
    );
}
 
export default Navbar;