import React from 'react';
import { Typography, Button, Link } from '@mui/material';

const Footer = () => {
  return (
    <div>
      <div
        className="text-white mt-10 w-full"
        style={{ background: 'linear-gradient(135deg, #1e1b2e 0%, #0f172a 100%)', color: 'white', paddingTop: '24px', paddingBottom: '24px' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-12 w-full flex flex-col">
        {/* Columns wrapper */}
        <div className="w-full mui-grid-container-div md:flex-nowrap md:items-start md:gap-12">
        {/* Column 1 */}
        <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6 mui-col-md-3 w-full md:w-1/4 flex flex-col items-start gap-3">
          <Typography className="mb-4 text-base font-semibold tracking-wider uppercase" variant="h6" sx={{ color: '#a5b4fc', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}> Company </Typography>
          <div><Button className="block mb-2 p-0 text-left text-sm font-normal hover:text-indigo-300 transition-colors duration-200" variant="h6" sx={{ textTransform: 'none', color: '#94a3b8', fontSize: '0.875rem' }}> About </Button></div>
          <div><Button className="block mb-2 p-0 text-left text-sm font-normal hover:text-indigo-300 transition-colors duration-200" variant="h6" sx={{ textTransform: 'none', color: '#94a3b8', fontSize: '0.875rem' }}> Blog </Button></div>
          <div><Button className="block mb-2 p-0 text-left text-sm font-normal hover:text-indigo-300 transition-colors duration-200" variant="h6" sx={{ textTransform: 'none', color: '#94a3b8', fontSize: '0.875rem' }}> Press </Button></div>
          <div><Button className="block mb-2 p-0 text-left text-sm font-normal hover:text-indigo-300 transition-colors duration-200" variant="h6" sx={{ textTransform: 'none', color: '#94a3b8', fontSize: '0.875rem' }}> Jobs </Button></div>
          <div><Button className="block mb-2 p-0 text-left text-sm font-normal hover:text-indigo-300 transition-colors duration-200" variant="h6" sx={{ textTransform: 'none', color: '#94a3b8', fontSize: '0.875rem' }}> Partners </Button></div>
        </div>

        {/* Column 2 */}
        <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6 mui-col-md-3 w-full md:w-1/4 flex flex-col items-start gap-3">
          <Typography className="mb-4 text-base font-semibold tracking-wider uppercase" variant="h6" sx={{ color: '#a5b4fc', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}> Solutions </Typography>
          <div><Button className="block mb-2 p-0 text-left text-sm font-normal hover:text-indigo-300 transition-colors duration-200" variant="h6" sx={{ textTransform: 'none', color: '#94a3b8', fontSize: '0.875rem' }}> Marketing </Button></div>
          <div><Button className="block mb-2 p-0 text-left text-sm font-normal hover:text-indigo-300 transition-colors duration-200" variant="h6" sx={{ textTransform: 'none', color: '#94a3b8', fontSize: '0.875rem' }}> Analytics </Button></div>
          <div><Button className="block mb-2 p-0 text-left text-sm font-normal hover:text-indigo-300 transition-colors duration-200" variant="h6" sx={{ textTransform: 'none', color: '#94a3b8', fontSize: '0.875rem' }}> Commerce </Button></div>
          <div><Button className="block mb-2 p-0 text-left text-sm font-normal hover:text-indigo-300 transition-colors duration-200" variant="h6" sx={{ textTransform: 'none', color: '#94a3b8', fontSize: '0.875rem' }}> Insights </Button></div>
          <div><Button className="block mb-2 p-0 text-left text-sm font-normal hover:text-indigo-300 transition-colors duration-200" variant="h6" sx={{ textTransform: 'none', color: '#94a3b8', fontSize: '0.875rem' }}> Support </Button></div>
        </div>

        {/* Column 3 */}
        <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6 mui-col-md-3 w-full md:w-1/4 flex flex-col items-start gap-3">
          <Typography className="mb-4 text-base font-semibold tracking-wider uppercase" variant="h6" sx={{ color: '#a5b4fc', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}> Documentation </Typography>
          <div><Button className="block mb-2 p-0 text-left text-sm font-normal hover:text-indigo-300 transition-colors duration-200" variant="h6" sx={{ textTransform: 'none', color: '#94a3b8', fontSize: '0.875rem' }}> Guides </Button></div>
          <div><Button className="block mb-2 p-0 text-left text-sm font-normal hover:text-indigo-300 transition-colors duration-200" variant="h6" sx={{ textTransform: 'none', color: '#94a3b8', fontSize: '0.875rem' }}> API Status </Button></div>
        </div>

        {/* Column 4 */}
        <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6 mui-col-md-3 w-full md:w-1/4 flex flex-col items-start gap-3">
          <Typography className="mb-4 text-base font-semibold tracking-wider uppercase" variant="h6" sx={{ color: '#a5b4fc', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}> Legal </Typography>
          <div><Button className="block mb-2 p-0 text-left text-sm font-normal hover:text-indigo-300 transition-colors duration-200" variant="h6" sx={{ textTransform: 'none', color: '#94a3b8', fontSize: '0.875rem' }}> Claim </Button></div>
          <div><Button className="block mb-2 p-0 text-left text-sm font-normal hover:text-indigo-300 transition-colors duration-200" variant="h6" sx={{ textTransform: 'none', color: '#94a3b8', fontSize: '0.875rem' }}> Privacy </Button></div>
          <div><Button className="block mb-2 p-0 text-left text-sm font-normal hover:text-indigo-300 transition-colors duration-200" variant="h6" sx={{ textTransform: 'none', color: '#94a3b8', fontSize: '0.875rem' }}> Terms </Button></div>
        </div>
        </div>

        {/* Copyright Section */}
        <div className="mui-grid-item-div mui-col-xs-12 w-full flex flex-col items-center pt-8 mt-8 border-t border-gray-700/50">
          <Typography className="text-gray-500 text-xs mt-6" variant="body2" component="p" align="center" sx={{ color: '#64748b' }}>
            &copy; 2023 My Company. All rights reserved.
          </Typography>
          <Typography className="text-gray-500 text-xs" variant="body2" component="p" align="center" sx={{ color: '#64748b' }}>
            Made with <span className="text-red-400">&#10084;</span> by Me.
          </Typography>
          <Typography className="text-gray-500 text-xs" variant="body2" component="p" align="center" sx={{ color: '#64748b' }}>
            Icons made by{' '}
            <Link href="https://www.freepik.com" color="inherit" underline="always" className="hover:text-indigo-300 transition-colors">Freepik</Link>{' '}
            from{' '}
            <Link href="https://www.flaticon.com/" color="inherit" underline="always" className="hover:text-indigo-300 transition-colors">www.flaticon.com</Link>
          </Typography>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;