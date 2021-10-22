



import {Products,Navbar,Cart,Check} from "./components";
import {commerce} from "./lib/Commerce";
import {React,useState,useEffect} from "react";
import "./index.css";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

function App() {

const [products,setProducts]=useState([]);
const [cart,setCart]=useState({});
const [order,setOrder]=useState({})

const fetchProducts= async()=>
{
  const {data} = await commerce.products.list();
  setProducts(data);
}
const fetchCart=async()=> setCart(await commerce.cart.retrieve());
const setCartItem=async(productID,quantity)=> 
{
  const item = await commerce.cart.add(productID,quantity);
  setCart(item.cart);
}
const handleCartQty=async(productID,quantity)=>
{
  const {cart}= await commerce.cart.update(productID,{quantity});
  setCart(cart);
}
const removeProduct = async(productID)=>
{
  const {cart}= await commerce.cart.remove(productID);
  setCart(cart);

}
const refreshCart = async ()=>
{
  const newCart = commerce.cart.refresh();
  setCart (newCart);
}

const handleCheckout=async (tokenID, newOrder)=>
{
  try {
    const inComingOrder = await commerce.checkout.capture(tokenID, newOrder);
    setOrder(inComingOrder);
    refreshCart();
  }
  catch(error)
  {

  }

}


useEffect(()=>{
fetchProducts();
fetchCart();
},[])




  return (
 <>

<Router>
<Navbar  cart={cart}/>

<Switch>
<Route exact path="/">
<Products products={products} setCartItem={setCartItem} />
</Route>

<Route  exact path="/cart">
<Cart cart={cart}  removeProduct={removeProduct} handleCartQty={handleCartQty}/>
</Route>
<Route exact path="/checkout">
  <Check cart={cart} order={order} handleCheckout={handleCheckout} refreshCart={refreshCart}/>
</Route>


</Switch>

</Router>

 </>
  )
}

export default App;
