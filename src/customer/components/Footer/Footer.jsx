import React from 'react';
import { Typography, Button, Link } from '@mui/material';

const Footer = () => {
  return (
    <div>
      <div
        className="bg-black text-white mt-10 w-full"
        style={{ backgroundColor: 'black', color: 'white', paddingTop: '24px', paddingBottom: '24px' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-12 w-full flex flex-col">
        {/* Columns wrapper */}
        <div className="w-full mui-grid-container-div md:flex-nowrap md:items-start md:gap-12">
        {/* Column 1 */}
        <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6 mui-col-md-3 w-full md:w-1/4 flex flex-col items-start gap-2">
          <Typography className="mb-4 text-base font-semibold tracking-wide" variant="h6"> Company </Typography>
          <div><Button className="block mb-3 p-0 text-left text-sm font-normal hover:text-yellow-400 transition-colors" variant="h6" sx={{ textTransform: 'none', color: 'inherit' }}> About </Button></div>
          <div><Button className="block mb-3 p-0 text-left text-sm font-normal hover:text-yellow-400 transition-colors" variant="h6" sx={{ textTransform: 'none', color: 'inherit' }}> Blog </Button></div>
          <div><Button className="block mb-3 p-0 text-left text-sm font-normal hover:text-yellow-400 transition-colors" variant="h6" sx={{ textTransform: 'none', color: 'inherit' }}> Press </Button></div>
          <div><Button className="block mb-3 p-0 text-left text-sm font-normal hover:text-yellow-400 transition-colors" variant="h6" sx={{ textTransform: 'none', color: 'inherit' }}> Jobs </Button></div>
          <div><Button className="block mb-3 p-0 text-left text-sm font-normal hover:text-yellow-400 transition-colors" variant="h6" sx={{ textTransform: 'none', color: 'inherit' }}> Partners </Button></div>
        </div>

        {/* Column 2 */}
        <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6 mui-col-md-3 w-full md:w-1/4 flex flex-col items-start gap-2">
          <Typography className="mb-4 text-base font-semibold tracking-wide" variant="h6"> Solutions </Typography>
          <div><Button className="block mb-3 p-0 text-left text-sm font-normal hover:text-yellow-400 transition-colors" variant="h6" sx={{ textTransform: 'none', color: 'inherit' }}> Marketing </Button></div>
          <div><Button className="block mb-3 p-0 text-left text-sm font-normal hover:text-yellow-400 transition-colors" variant="h6" sx={{ textTransform: 'none', color: 'inherit' }}> Analytics </Button></div>
          <div><Button className="block mb-3 p-0 text-left text-sm font-normal hover:text-yellow-400 transition-colors" variant="h6" sx={{ textTransform: 'none', color: 'inherit' }}> Commerce </Button></div>
          <div><Button className="block mb-3 p-0 text-left text-sm font-normal hover:text-yellow-400 transition-colors" variant="h6" sx={{ textTransform: 'none', color: 'inherit' }}> Insights </Button></div>
          <div><Button className="block mb-3 p-0 text-left text-sm font-normal hover:text-yellow-400 transition-colors" variant="h6" sx={{ textTransform: 'none', color: 'inherit' }}> Support </Button></div>
        </div>

        {/* Column 3 */}
        <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6 mui-col-md-3 w-full md:w-1/4 flex flex-col items-start gap-2">
          <Typography className="mb-4 text-base font-semibold tracking-wide" variant="h6"> Documentation </Typography>
          <div><Button className="block mb-3 p-0 text-left text-sm font-normal hover:text-yellow-400 transition-colors" variant="h6" sx={{ textTransform: 'none', color: 'inherit' }}> Guides </Button></div>
          <div><Button className="block mb-3 p-0 text-left text-sm font-normal hover:text-yellow-400 transition-colors" variant="h6" sx={{ textTransform: 'none', color: 'inherit' }}> API Status </Button></div>
        </div>

        {/* Column 4 */}
        <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6 mui-col-md-3 w-full md:w-1/4 flex flex-col items-start gap-2">
          <Typography className="mb-4 text-base font-semibold tracking-wide" variant="h6"> Legal </Typography>
          <div><Button className="block mb-3 p-0 text-left text-sm font-normal text-blue-400 hover:underline transition-colors" variant="h6" sx={{ textTransform: 'none', color: 'inherit' }}> Claim </Button></div>
          <div><Button className="block mb-3 p-0 text-left text-sm font-normal text-blue-400 hover:underline transition-colors" variant="h6" sx={{ textTransform: 'none', color: 'inherit' }}> Privacy </Button></div>
          <div><Button className="block mb-3 p-0 text-left text-sm font-normal text-blue-400 hover:underline transition-colors" variant="h6" sx={{ textTransform: 'none', color: 'inherit' }}> Terms </Button></div>
        </div>
        </div>

        {/* Copyright Section */}
        <div className="mui-grid-item-div mui-col-xs-12 w-full flex flex-col items-center pt-8 mt-6 border-t border-gray-800">
          <Typography className="text-gray-400 text-xs mt-6" variant="body2" component="p" align="center">
            &copy; 2023 My Company. All rights reserved.
          </Typography>
          <Typography className="text-gray-400 text-xs" variant="body2" component="p" align="center">
            Made with <span className="text-red-500">&#10084;</span> by Me.
          </Typography>
          <Typography className="text-gray-400 text-xs" variant="body2" component="p" align="center">
            Icons made by{' '}
            <Link href="https://www.freepik.com" color="inherit" underline="always" className="hover:text-yellow-400">Freepik</Link>{' '}
            from{' '}
            <Link href="https://www.flaticon.com/" color="inherit" underline="always" className="hover:text-yellow-400">www.flaticon.com</Link>
          </Typography>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;