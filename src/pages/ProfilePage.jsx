import { useContext } from "react"
import { AuthContext } from '../contexts/AuthContext'
import { Button } from '@mantine/core';
import classes from '../styles/profile.module.css'

const ProfilePage = () => {

    const { logOut } = useContext(AuthContext);

    return (
        <div className={classes.mainCtn}> 
        <p> User details + purchase history </p>
         <Button 
            color="green" 
            mt="md" 
            radius="md"
            onClick={() => logOut()} > Log Out </Button> 
        </ div>
    );
}
 
export default ProfilePage;

