import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';

const steps = ['Login', 'Delivery Address', 'Order Summary', 'Payment'];

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    
    // Extract the step number from the URL query parameters (e.g., ?step=2)
    const querySearch = new URLSearchParams(location.search);
    const step = parseInt(querySearch.get("step"));

    const handleBack = () => {
        const newStep = step - 1;
        navigate(`/checkout?step=${newStep}`);
    };

    return (
        <div className='px-10 lg:px-20 pt-10'>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={step}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                
                {step === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={step === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {/* The 'Next' button is intentionally removed here as per the tutorial. 
                                Navigation happens inside the individual forms. */}
                        </Box>

                        <div className='mt-10'>
                            {/* Conditionally render the correct component based on the URL step parameter */}
                            {step == 2 ? <DeliveryAddressForm /> : <OrderSummary />}
                        </div>

                    </React.Fragment>
                )}
            </Box>
        </div>
    );
}