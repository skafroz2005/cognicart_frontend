import { Button, TextField } from '@mui/material';
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
    }, [jwt, auth.jwt, dispatch])  


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
            <h2 className='text-center text-2xl font-bold text-gray-900 mb-6'>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div className='mui-grid-container-div mui-spacing-3'>
                    <div className='mui-grid-item-div mui-col-xs-12 mui-col-sm-6'>
                        <TextField required id="firstName" name="firstName" label="First Name" fullWidth autoComplete="given-name" />
                    </div>
                    <div className='mui-grid-item-div mui-col-xs-12 mui-col-sm-6'>
                        <TextField required id="lastName" name="lastName" label="Last Name" fullWidth autoComplete="family-name" />
                    </div>
                    <div className='mui-grid-item-div mui-col-xs-12'>
                        <TextField required id="email" name="email" label="Email" fullWidth autoComplete="email" type="email"/>
                    </div>
                    <div className='mui-grid-item-div mui-col-xs-12'>
                        <TextField required id="password" name="password" label="Password" fullWidth autoComplete="password" type="password" inputProps={{ minLength: 8 }} // <--- Forces them to type at least 8 characters
        helperText="Password must be at least 8 characters long."/>
                    </div>
                    <div className='mui-grid-item-div mui-col-xs-12'>
                        <Button 
                            className='w-full' 
                            sx={{ py: "1.5rem", mt: 2, bgcolor: "#9155fd" }} 
                            size='large' 
                            variant='contained' 
                            type="submit"
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </form>
            
            <div className='flex justify-center flex-col items-center mt-6 pt-4 border-t border-gray-100'>
                <p className='pb-2 text-gray-500'>if you have already account?</p>
                <Button onClick={() => navigate("/login")} className='w-full' variant='text' sx={{ color: "#9155fd" }}>
                    Login
                </Button>
            </div>
        </div>
    );
};

export default RegisterForm;