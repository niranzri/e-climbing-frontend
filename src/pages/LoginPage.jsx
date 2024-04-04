import classes from '../styles/auth.module.css'
import AuthForm from '../components/AuthForm'

const LoginPage = () => {

    return ( 
        <div className={classes.mainCtn}> 
            <AuthForm />
        </div>
     );
}
 
export default LoginPage;