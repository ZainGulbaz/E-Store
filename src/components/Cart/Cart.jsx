import React from 'react';
import { useHistory  } from 'react-router-dom';









const Cart = ({cart,removeProduct,handleCartQty}) => {
 
  
  let history= useHistory();
  
  const displayProducts=(items)=>
  {
    
 
  
    
  return(
  
     
        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden my-10 max-h flex flex-col">
    <img className="h-56 w-full object-cover mt-2" src={`${items.image.url}`} alt="NIKE AIR"/>
    <div className="px-4 py-2">
      <h1 className="text-gray-900 font-bold text-lg lg:text-xl uppercase">{items.product_name}</h1>
    </div>
    <div className=" flex items-center justify-between px-2 py-2  bg-gray-900">
      <h1 className="text-gray-200 font-bold text-xl">{items.line_total.formatted_with_symbol}</h1>
         {/* Increament Decreament Button Set */}
         <div className="inline-flex">
    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={()=>{
      handleCartQty(items.id, items.quantity+1)
    }}>
    +
    </button>
    <h1 className="text-blue-500 text-lg font-bold mt-1 mx-2">{items.quantity}</h1>
    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={()=>handleCartQty(items.id,items.quantity-1)}>
      -
    </button>
  </div>
      <button className="mx-2 bg-transparent hover:bg-red-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded " onClick={()=>{
        removeProduct(items.id)
        
      }}>
      <i className="fas fa-trash-alt"></i>
  </button>
      
     </div>
  </div>
  
      
  )
  }

  const isCartEmpty=()=>
  {
    <h1 className="text-3xl text-gray-900 font-bold">Your Cart is Empty</h1>

  }

    return (
         

        <>
              <div className="bg-gray-200 w-100 grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 ml-20 mr-20 gap-x-10 ">       
                 {
                     (cart.line_items!=null)? cart.line_items.map((items)=>displayProducts(items)):
                     isCartEmpty()
                 }
                 </div>
                 <br />
                 <hr />
                 <br />
                 <div className="grid grid-cols-5 place-items-center gap-x-0">
                   
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={()=> history.push("/checkout")}>Proceed</button>
                    <h1 className="text-gray-900 font-bold text-3xl">Subtotal:{cart.subtotal.formatted_with_symbol} </h1>
                    </div>
                <br />
                <br />


       </>
    )


    
}




export default Cart;
 
