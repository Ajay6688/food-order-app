import React from "react";

// creating the contex giving definition 
const CartContext =  React.createContext({
    items : [],
    totalAmount : 0,
    addItem : (item)=>{},
    removeItem : (id)=>{},
    clearCart : ()=>{}
})

export default CartContext ;