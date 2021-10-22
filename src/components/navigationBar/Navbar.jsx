import React from "react";
import {useHistory} from "react-router-dom";


const Navbar = ({cart}) => {
  
  let history= useHistory(); 
  return (
    
    <nav className="flex items-center justify-between flex-wrap bg-gray-900 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6 cursor-pointer" onClick={()=>history.push("/")}>
        {/* Website Logo */}
        <i className="fas fa-store"  ></i>
        <span  className="font-semibold text-xl tracking-tight">E-Store</span>
      </div>
      <div className="block lg:hidden"></div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-900 mr-4 text-lg cursor-pointer" onClick={()=>history.push("/")}> 
            Home
          </a>
          <a
            to="/cart"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-900 mr-4 text-lg cursor-pointer" onClick={()=>history.push("/cart")} >
            Cart
          </a>
        </div>

        {/* Shopping Cart */}
        <div className="flex mr-10 my-2 ">
          <i className="flex-inline fas fa-shopping-cart text-white mr-2 cursor-pointer  " onClick={()=>history.push("/cart")} ></i>
          <p className="flex-inline text-lg font-bold  text-white ">{cart.total_items}</p>
        </div>
      </div>
    
    </nav>
    
  );
};

export default Navbar;
