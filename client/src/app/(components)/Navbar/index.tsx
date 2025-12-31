"use client";

import { Menu } from 'lucide-react';
import React from 'react';

  const Navbar = () => {
    return (
    <div className="flex justify-between items-center w-full mb-7">
     {/*left side */} 
    <div className="flex justify-between items-center gap-5">
      <button 
        className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100" 
        onClick={() => {}}
      >
        <Menu className="w-4 h-4" />
        </button>
      </div>
      <div className='relative'>
        <input type="search" placeholder="Start type to search groups & products" className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-blue-500"> 
        </input>
        
      </div>  
    </div>
    );
  };

export default Navbar;