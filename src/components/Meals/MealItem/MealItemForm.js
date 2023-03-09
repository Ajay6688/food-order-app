import { useRef , useState} from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props)=>{

    let [isAmountValid , setAmountValid] = useState(true);

    const inputRef = useRef();

    const onSubmitHandler = (event)=>{
        event.preventDefault();

        const enteredAmount = inputRef.current.value ;
        const enteredAmountNumber = +enteredAmount;
        if(enteredAmount.trim().length === 0 || enteredAmountNumber<1 || enteredAmountNumber > 10 ){
            setAmountValid(false);
            return 
        }

        props.onAddToCart(enteredAmountNumber);

    }

    return <form className={classes.form} onSubmit={onSubmitHandler}>
        <Input 
            ref={inputRef}
            label="amount"
            input={{
              id:"amount_" + props.id,
              type:"number",
              min:"1",
              max:"10",
              step:"1",
              defaultValue:"1"
            }}
        />
        <button type='submit'>+ Add</button>
        {!isAmountValid && <p>please enter valid amount (1-5) !</p>}
    </form>
}

export default MealItemForm ;