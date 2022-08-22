import React , { useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';
import { GoogleLogin ,} from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import {signin,signup} from '../../actions/auth';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

export const Auth = () => {

    const classes = useStyles();
    const [showPassword,setShowPassword] = useState(false);
    const [isSignup,setIsSignup] = useState(false);
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    const switchMode = () => {
        setIsSignup((prev)=> !prev);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isSignup) {
            dispatch(signup(form, history));
        } 
        else{
            dispatch(signin(form, history));
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const googleSuccess = async (res) => {  
        try {
            const data = jwt_decode(res?.credential);
            //console.log(data);
            dispatch({ type:'AUTH', payload: {data} });
            history.push('/'); 
        } catch (error) {
            console.log(error);
        }
    };
    
    const googleError = (error) => {
        console.log(error);
        alert('Google Sign In was unsuccessful. Try again later')
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                        <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <Container className={classes.googleButton}>
                    {/*!isSignup && <GoogleLogin  data-theme="filled_blue" data-type="icon"
                                    onSuccess={googleSuccess}
                                    onError={googleError}
                        />*/}
                    </Container>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
  )
}
