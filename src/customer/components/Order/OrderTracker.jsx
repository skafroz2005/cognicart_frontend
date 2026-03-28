import React from 'react';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckIcon from '@mui/icons-material/Check';

const steps = [
    "Placed",
    "Order Confirmed",
    "Shipped",
    "Out For Delivery",
    "Delivered"
];

const OrderTracker = ({ activeStep }) => {
    const currentStep = Number(activeStep || 0);

    return (
        <div className='w-full rounded-2xl border border-gray-200 bg-white px-5 py-6 md:px-7 md:py-7 shadow-sm'>
            <div className='mb-8 flex items-center gap-2'>
                <LocalShippingOutlinedIcon sx={{ color: '#6366f1', fontSize: '1.05rem' }} />
                <h2 className='text-[1.6rem] font-semibold text-gray-900 leading-none'>Order Status</h2>
            </div>

            <div className='overflow-x-auto'>
                <div className='min-w-[720px]'>
                    <div className='relative flex items-center justify-between px-2'>
                        {steps.map((label, index) => {
                            const stepNumber = index + 1;
                            const completed = currentStep > stepNumber;
                            const current = currentStep === stepNumber;

                            return (
                                <div key={label} className='relative flex flex-1 flex-col items-center'>
                                    {index !== steps.length - 1 && (
                                        <div className='absolute left-1/2 top-[18px] h-[2px] w-full -translate-y-1/2'>
                                            <div className='h-full w-full bg-gray-200' />
                                            <div
                                                className='absolute left-0 top-0 h-full bg-indigo-500 transition-all duration-500'
                                                style={{
                                                    width: completed ? '100%' : '0%',
                                                }}
                                            />
                                        </div>
                                    )}

                                    <div
                                        className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-300 ${
                                            completed
                                                ? 'border-indigo-600 bg-indigo-600 text-white shadow-[0_0_0_4px_rgba(99,102,241,0.15)]'
                                                : current
                                                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-[0_0_0_4px_rgba(99,102,241,0.15)]'
                                                    : 'border-gray-300 bg-white text-gray-400'
                                        }`}
                                    >
                                        {completed ? <CheckIcon sx={{ fontSize: '0.95rem' }} /> : stepNumber}
                                    </div>

                                    <p className={`mt-4 max-w-[110px] text-center text-xs font-medium leading-tight ${completed || current ? 'text-indigo-600' : 'text-gray-500'}`}>
                                        {label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracker;