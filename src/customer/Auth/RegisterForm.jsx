import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, register } from '../../State/Auth/Action';

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {auth} = useSelector(store => store);

    useEffect(() => {
        if(jwt){
            dispatch(getUser(jwt))
        }
    }, [jwt, auth.jwt])  


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        
        const userData = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
            password: data.get("password")
        };
        
        dispatch(register(userData));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField required id="firstName" name="firstName" label="First Name" fullWidth autoComplete="given-name" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField required id="lastName" name="lastName" label="Last Name" fullWidth autoComplete="family-name" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required id="email" name="email" label="Email" fullWidth autoComplete="email" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required id="password" name="password" label="Password" fullWidth autoComplete="password" type="password" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            className='w-full' 
                            sx={{ py: "1.5rem", mt: 2, bgcolor: "#9155fd" }} 
                            size='large' 
                            variant='contained' 
                            type="submit"
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
            
            <div className='flex justify-center flex-col items-center mt-5'>
                <p className='pb-2 text-gray-500'>if you have already account?</p>
                <Button onClick={() => navigate("/login")} className='w-full' variant='text' sx={{ color: "#9155fd" }}>
                    Login
                </Button>
            </div>
        </div>
    );
};

export default RegisterForm;