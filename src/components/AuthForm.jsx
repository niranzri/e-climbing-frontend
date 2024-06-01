import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Box, Button, PasswordInput, Text, TextInput } from '@mantine/core'
import { AuthContext } from '../contexts/AuthContext'
import classes from '../styles/auth.module.css'

// eslint-disable-next-line react/prop-types
const AuthForm = ( { isLogin = true }) => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { saveToken } = useContext(AuthContext);

    // Connect frontend to backend
    const handleSubmit = async event => {
        event.preventDefault()

        const credentials = { email, password };
        if (!isLogin) {
            credentials.username = username;
        }

        try {
          // POST request with the user's credentials to the server, so that the backend can use them.
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/${isLogin ? 'login' : 'signup'}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              // The body is a JSON-formatted string, send as the body of the request
              body: JSON.stringify(credentials),
            }
          )
          if (response.status === 201) {
            navigate('/login')
          }
          
          if (response.status === 200) {
            const parsed = await response.json()
            saveToken(parsed.authToken)
            navigate('/products')
          } 
        } catch (error) {
          console.error(error)
        }
    }

    return (
        <div className={classes.formCtn}>
            <Text align='center' size='xl' weight='bold'>
                {isLogin ? 'Login' : 'Signup'}
            </Text>
    
            <Box
                component='form'
                onSubmit={handleSubmit}>
                {!isLogin && (
                <TextInput 
                    label='Username' 
                    id='username'
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    variant='filled' 
                    withAsterisk 
                    type="text"
                />
                )}
        
                <TextInput 
                    label='E-mail' 
                    id='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    variant='filled' 
                    withAsterisk 
                    type="email"
                />

                <PasswordInput 
                    label='Password'
                    id='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    variant='filled' 
                    withAsterisk />

                <Button
                    type='submit'
                    variant='filled'
                    color='green'> 
                    { isLogin ? 'Log in' : 'Sign up'}
                </Button>
                <div className={classes.registrationCtn}>
                    <p>New to CrimpIt? Register <Link to={`/signup`}><span> here </span></Link></p> 
                </div>
            </Box>
        </div>
    );
}
 
export default AuthForm;