import {useState } from "react"; 
import Cart from "./components/Cart/Cart";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./Store/CartProvider";

function App() {

  let [isCartShow , setCartShow] = useState(false);

  const showCartHandler = ()=>{
    setCartShow(true);
  }

  const hideCartHandler = ()=>{
    setCartShow(false);
  }

  return (
    <CartProvider>
      {isCartShow && <Cart onHideCart = {hideCartHandler} />}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
