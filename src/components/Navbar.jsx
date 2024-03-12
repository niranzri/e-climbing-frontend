import classes from '../styles/navbar.module.css'

const Navbar = () => {
    return (
        <nav>
            <div className={classes.linksCtn}>
                <p> Link1 </p>
                <p> Link2 </p>
                <p> Link3 </p>
            </div>
        </nav>
    );
}
 
export default Navbar;