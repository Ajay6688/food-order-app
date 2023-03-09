import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';


const AvailableMeals = ()=>{
    let [mealsData , setMealsData] = useState([]);
    let [isLoading , setIsLoading] = useState(true);
    let [httpError , setHttpError] = useState('');

    const sendRequest = async()=>{
        try {
            let response = await axios.get('https://test-c4de6-default-rtdb.firebaseio.com/meals.json');
            // let mealsData =await response.json();
            await setMealsData(Object.values(response.data));
            setIsLoading(false);
            console.log(Object.values(response.data));
    
        } catch (error) {
            setIsLoading(false)
            setHttpError(error.message);
            console.log(error)
        }
    }
    
    useEffect(()=>{
        sendRequest();
    },[])

    if(isLoading){
        return <section className={classes.mealsLoading}>
            <h2>Loading...</h2>
        </section>
    }

    if(httpError){
        return <secton className={classes.mealsHttpError}>
            <h1>{httpError}</h1>
        </secton>
    }

    let mealsList = mealsData.map(meal=>(
        <MealItem 
        key={meal.id} 
        id={meal.id} 
        name={meal.name} 
        description={meal.description} 
        price={meal.price}
         />
    ))

    return <section className={classes.meals}>
        <Card>
        <ul>
            {mealsList}
        </ul>
        </Card>
    </section>
}

export default AvailableMeals ;