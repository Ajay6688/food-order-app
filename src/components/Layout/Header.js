import {Fragment } from "react";
import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from "./HeaderCartButton";

const Header = (props)=>{
    return <Fragment>
        <header className={classes.header}>
            <h1>Nabha Meals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
            <h1>hhh</h1>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="a table full of delicious food dishes"/>
        </div>
    </Fragment>
}

export default Header;