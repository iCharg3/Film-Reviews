import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar,Typography,Toolbar,Button,Avatar } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';
import films from '../../images/reviews.jpg';

export const Navbar = () => {
    const classes = useStyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    //console.log(user);

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/auth');
        setUser(null);
    };

    return (
        <AppBar className={classes.appBar} position="static" color="inherit" elevation={6}>
            <div className={classes.brandContainer}>
                <Button size="medium" component={Link} to="/">
                    <HomeIcon color="primary" fontSize="large"/> &nbsp;
                </Button>
                <Typography className={classes.heading} variant="h4" align="center">Film Reviews</Typography>
                <img className={classes.image} src={films} alt="icon" height="60" />
            </div>
            {!location.pathname.includes("auth") && <Toolbar className={classes.toolbar}>
                {user?.data ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.data.name} src={user?.data.picture}>{user?.data.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.data.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>}
        </AppBar>
    )
}
