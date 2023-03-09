
import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props)=>{

    const [formValidity , setFormValidity] = useState({
        name : true ,
        street : true ,
        postal : true ,
        city : true
    });

    const nameRef = useRef();
    const streetRef = useRef();
    const postalRef = useRef();
    const cityRef = useRef();

    const isEmpty = value=>value.trim()==='';
    const isMaxSixDigit = value=>value.length !==6 ;

    const confirmHandler = (event)=>{
        event.preventDefault();

        const nameInput = nameRef.current.value ;
        const streetInput = streetRef.current.value ;
        const postalInput = postalRef.current.value ;
        const cityInput = cityRef.current.value;

        const isNameValid = !isEmpty(nameInput);
        const isStreetValid = !isEmpty(streetInput);
        const isPostalValid = !isMaxSixDigit(postalInput);
        const isCityValid = !isEmpty(cityInput);

        console.log(isNameValid , isStreetValid , isPostalValid , isCityValid)

        setFormValidity({
            name:isNameValid ,
            street : isStreetValid ,
            postal : isPostalValid ,
            city : isCityValid
        })

        const isFormValid = isNameValid && isStreetValid && isPostalValid && isCityValid ;

        if(!isFormValid){
            return ;
        }

        // submit the data to the database

        props.onConfirm({
            name : nameInput ,
            street : streetInput ,
            postal : postalInput ,
            city : cityInput
        })

    }

    
    return <form onSubmit={confirmHandler}>
        <div className={`${classes.control} ${!formValidity.name? classes.invalid:''}`}>
            <label>Your Name</label>
            <input type='text' id='name' ref={nameRef} />
            {!formValidity.name && <p>please enter a valid Name</p>}
        </div>
        <div className={`${classes.control} ${!formValidity.street? classes.invalid:''}`}>
            <label>street</label>
            <input type='text' id='street' ref={streetRef}/>
            {!formValidity.street && <p>please enter a valid street</p>}
        </div>
        <div className={`${classes.control} ${!formValidity.postal? classes.invalid:''}`}>
            <label>Postal code</label>
            <input type='text' id='postalCode' ref={postalRef}/>
            {!formValidity.postal && <p>please enter a valid postal code</p>}
        </div>
        <div className={`${classes.control} ${!formValidity.city? classes.invalid:''}`}>
            <label>city</label>
            <input type='text' id='city' ref={cityRef} />
            {!formValidity.city && <p>please enter a valid city</p>}
        </div>
        <div className={classes.actions}>
           <button type='button' onClick={props.onClose}>Cancel</button>
           <button className={classes.submit}>Confirm</button>
        </div>
    </form>
}

export default Checkout;