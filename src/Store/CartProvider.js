import { useReducer } from "react";
import CartContext from "./CartContext"


const defaultCartState = {
    items : [] ,
    totalAmount : 0 ,
}

const cartReducer = (state , action )=>{

    // first we will check type of dispatchCartAction function to check either to perform add or remove operation from the cart 
    if(action.type === "ADD"){

        //first we calculate the updated total price of the items after atting the item in the cart
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        // here we find the index of the item if it is existed in the cart , if it finds the item in the cart then it will assign 
        // the index otherwise it will assign the -1 to the existingCartItemsIndex
        const existingCartItemsIndex = state.items.findIndex((StateItem)=>{
            return StateItem.id === action.item.id
        })

        // it will assign the item if the item is existing in the cart otherwise it will assign undefined
        const existingCartItem = state.items[existingCartItemsIndex];

        let updatedItems;
        // if existingCartItem is not undefined then it will continue with the if condition 
        if(existingCartItem){
            // created a variable to store new existing item
            const updatedItem = {       
                ...existingCartItem ,     
                amount : existingCartItem.amount +action.item.amount  // over writing the amount of existingCartItem to update the amount
            }
            updatedItems = [...state.items]; // adding all the previous items present inside state to the variable updatedItems
            updatedItems[existingCartItemsIndex] = updatedItem; // adding new updatedItem inside the variable 
        }
        else{    // if the item is not present in existing items in state then adding the item to the state using concat 
            updatedItems = state.items.concat(action.item); 
        }

        return {     // return the object after adding updated values to the keys 
            items: updatedItems ,
            totalAmount : updatedTotalAmount
        }
    }
    if(action.type === "REMOVE"){

        // find the existing item using the id to remove
        const existingCartItemsIndex = state.items.findIndex(
            (StateItem)=> StateItem.id ===action.id
        )

        // assign the item in the variable existingCartItem
        const existingCartItem = state.items[existingCartItemsIndex];

        // update the total price by subtracting the price of the removable item from the total price 
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems ;
        if(existingCartItem.amount === 1){  // if amount is 1 then we are removing the item from the all items in the cart 
            updatedItems = state.items.filter(item => item.id !==action.id);
        }else{  // if the amount is in between 2-10 then we decrease the amount by -1 
            let updatedItem = { ...existingCartItem , amount: existingCartItem.amount -1 };
            updatedItems = [...state.items];  // adding the previos items of the cart 
            updatedItems[existingCartItemsIndex] = updatedItem;  // adding new item to the cart 
        } 

        return {   // return the object after updating the values of the keys of the object
            items : updatedItems ,
            totalAmount : updatedTotalAmount
        }
    }

    if(action.type ==='CLEAR'){
        return defaultCartState;
    }

    return defaultCartState ;
}

const CartProvider = (props)=>{

    // initialize the useReducer  
    // defaultCartState is the initial value of cartState
    //initializing the cartState using the return value of cartReducer
    // dispatchCartAction will call the cartReducer passing the cartState and object as state and action 
    let [cartState , dispatchCartAction] =useReducer(cartReducer , defaultCartState);

    const addItemToCartHandler = (item) =>{
        dispatchCartAction({
            type:"ADD",
            item:item
        })
    };

    const removeItemFromCartHandler = (id)=>{
        dispatchCartAction({
            type:"REMOVE",
            id : id,
        })
    };

    const clearCartHandler = ()=>{
        dispatchCartAction({
            type : 'CLEAR'
        })
    }

    // initializing cartContext
    const cartContext={
        items : cartState.items,
        totalAmount : cartState.totalAmount ,
        addItem : addItemToCartHandler,
        removeItem : removeItemFromCartHandler,
        clearCart : clearCartHandler
    }

    
    return (                    // passing the cartContext as value inside Context.Provider
    <CartContext.Provider value={cartContext}>  
        {props.children}
    </CartContext.Provider>
    );
}

export default CartProvider ;