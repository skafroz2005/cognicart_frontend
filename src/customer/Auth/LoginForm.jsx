import { Button, Grid, TextField } from '@mui/material';
// import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../State/Auth/Action';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (jwt) {
    //         dispatch(getUser(jwt))
    //     }
    // }, [jwt, auth.jwt])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const userData = {
            email: data.get("email"),
            password: data.get("password")
        };

        dispatch(login(userData));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField required id="email" name="email" label="Email" fullWidth autoComplete="email" type='email' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required id="password" name="password" label="Password" fullWidth autoComplete="password" type="password" inputProps={{ minLength: 8 }} // <--- Forces them to type at least 8 characters
        helperText="Password must be at least 8 characters long." />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            className='w-full'
                            sx={{ py: "1.5rem", mt: 2, bgcolor: "#9155fd" }}
                            size='large'
                            variant='contained'
                            type="submit"
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <div className='flex justify-center flex-col items-center mt-5'>
                <p className='pb-2 text-gray-500'>if you don't have account?</p>
                <Button onClick={() => navigate("/register")} className='w-full' variant='text' sx={{ color: "#9155fd" }}>
                    Register
                </Button>
            </div>
        </div>
    );
};

export default LoginForm;