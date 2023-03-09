import { useContext , useEffect , useState } from 'react';
import cartIcon from '../../assets/cart_icon.png';
import classes from './HeaderCartButton.module.css'
import CartContext from '../../Store/CartContext';

const HeaderCartButton = (props)=>{
    let [isButtonHighlighted , setButtonHighlighted ] = useState(false);
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((currNumber , item)=>{
        return currNumber +item.amount ;
    } , 0)

    const btnClasses = `${classes.button} ${isButtonHighlighted ? classes.bump : ''}`;

    useEffect(()=>{
        if(cartCtx.items.length ===0){
            return 
        }
        setButtonHighlighted(true);

        const timer =  setTimeout(()=>{
            setButtonHighlighted(false)
        }, 300)

        return ()=>{
            clearTimeout(timer);
        }
    },[cartCtx.items])

    return <button className={btnClasses} onClick={props.onClick}>
        <span><img className={classes.icon} src={cartIcon} alt="cart icon"/></span>
        <span> My Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}

export default HeaderCartButton;