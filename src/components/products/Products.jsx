import React from "react";
import Product from "./product/Product"


const Products=({products,setCartItem})=>
{
  return (
      <>
      <div className="grid md:grid-cols-3 md:gap-x-4 bg-gray-100 grid-cols-1 ml-4">
         {
             products.map((data)=> <Product key={data.id} data={data} setCartItem={setCartItem}/>)

         }
      
           </div>




     </>
  )

}

export default Products;