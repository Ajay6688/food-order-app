// this is cart component 

import axios from 'axios';
import React, { useContext , useState} from 'react';
import CartContext from '../../Store/CartContext';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';


const Cart = (props)=>{

    let [isCheckout , setIsCheckout] = useState(false);
    let [ submitting , setSubmitting] = useState(false);
    let [didSubmit , setDidSubmit] = useState(false);

    // making the object of CartContext context
    const cartCtx = useContext(CartContext);

    // const cartData  = [
    //     {id:1 , name:"gol gappe" , amount : 2 , price :20},
    //     {id:2 , name:"chole bhature" , amount : 1 , price :40}
    // ]

    // to make the totalAmount upto two decimal point and adding currency symbol
    const totalAmount = `₹ ${cartCtx.totalAmount.toFixed(2)}`;
    const hasItem = cartCtx.items.length > 0;


    const cartItemRemoveHandler = (id)=>{
        cartCtx.removeItem(id); // calling removeItem function from cart context to remove item from cart 
    }

    const cartItemAddHandler = (item)=>{
        cartCtx.addItem(item);  // calling addItem to increace the amount by one
    }

    const orderHandler =()=>{
        setIsCheckout(true);
    }

    const submitHandler = async (userData)=>{

        setSubmitting(true);
        try {
            const response = await axios.post("https://test-c4de6-default-rtdb.firebaseio.com/orders.json" ,{
                    user : userData ,
                    order :cartCtx.items
                });
            console.log(response);
        } catch (error) {
            console.log(error)
        }

        setSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    // assigning jsx code to  cartItems variable which will show the cart items inside cart 
    const cartItems = (<ul className={classes['cart-items']}>
        {cartCtx.items.map(item =>{
           return <CartItem 
                   id ={item.id}
                   key={item.id} 
                   name = {item.name} 
                   amount= {item.amount} 
                   price ={item.price} 
                   onRemove= {cartItemRemoveHandler.bind(null , item.id)} 
                   onAdd={cartItemAddHandler.bind(null , {...item , amount :1})}/>  // we are sending amount 1 so that after clicking + 
                                                                                    // there should be add of one item not the double
        })}
    </ul>);

    const cartModalContent = <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm ={submitHandler}  onClose={props.onHideCart} />}
        {!isCheckout && <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onHideCart}>Close</button>
            {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent = <React.Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>Close</button>
        </div>
    </React.Fragment>
    return <Modal hideCart = {props.onHideCart}>
        {!submitting && !didSubmit &&cartModalContent}
        {submitting && isSubmittingModalContent}
        { !submitting && didSubmit && didSubmitModalContent}
    </Modal>
}

export default Cart;