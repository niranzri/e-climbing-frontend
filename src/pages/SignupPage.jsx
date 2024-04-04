import classes from '../styles/auth.module.css'
import AuthForm from '../components/AuthForm'

const SignupPage = () => {
    return ( 
        <div className={classes.mainCtn}> 
            <AuthForm isLogin={false}/>
        </div>
     );
}
 
export default SignupPage;