



const Product =({data,setCartItem})=>
{
  
  let {image,description,name} ={...data}

    return(
    <>
 
<div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden my-10">
  <div className="px-4 py-2">
    <h1 className="text-gray-900 font-bold text-xl lg:text-3xl uppercase">{name}</h1>
    <div className="text-gray-600 text-sm mt-1" dangerouslySetInnerHTML={{ __html:description}}></div>
  </div>
  <img className="h-56 w-full object-cover mt-2" src={`${image.url}`} alt="NIKE AIR"/>
  <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
    <h1 className="text-gray-200 font-bold text-xl">{data.price.raw}$</h1>
    <button className="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded hover:bg-blue-500" onClick={()=>{
      
 
   
      setCartItem(data.id,1); 
      alert(`${name} has been added to your cart`)    
      
      
    }}>Add to card</button>
  </div>
</div>
    </>
    )

}

export default Product;