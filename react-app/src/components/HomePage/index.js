import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCartThunk } from '../../store/cart';
import { ChangeingNumOfPizza, deletePizzaThunk, getIndividualPizza, makePizza, putPizzaThunk } from '../../store/pizza';
import './HomePage.css'

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [price, setPrice] = useState('');
    const [cheese, setCheese] = useState(true);
    const [mushroom, setMushroom] = useState(true);
    const [peperoni, setPeperoni] = useState(true);
    const [pineapple, setPineapple] = useState(true);
    const [Created, setCreated] = useState(true);
    const user = useSelector(state => state.session.user);
    const cart = useSelector(state => state.cart.cart)
    const pizza = useSelector(state => state.pizza)
    const allpizzas = useSelector(state => state.cart.pizzas)
    const dispatch = useDispatch();

    // const MakePizzaFunc = async (e) => {
    //     e.preventDefault();
    //     const data = await dispatch(makePizza(price, cart.id));
    //     if (data) {
    //         setErrors(data);
    //     }
    // };

    useEffect(async () => {
        setShowModal(false)
        setShowCart(false)
        await dispatch(getCartThunk(user.id))
    }, [])
    const OpenModal = async () => {
        await dispatch(makePizza(price, cart.id));
        dispatch(getCartThunk(user.id))
        setCheese(true)
        setMushroom(true)
        setPeperoni(true)
        setPineapple(true)
        setShowModal(true)
    }
    const CloseModal = async () => {
        await dispatch(deletePizzaThunk(pizza.id));
        dispatch(getCartThunk(user.id))
        setShowModal(false)
    }
    const AddIngredient = async (price, Ingredient, whatToDo) => {

        if (pizza.price === 0 && price === -1) {
        }
        else {
            await dispatch(putPizzaThunk(pizza.id, price, Ingredient, whatToDo))
            dispatch(getCartThunk(user.id))
        }
    }

    const ChangeNumOfPizza = async (total, id, classId) => {
        if (allpizzas[classId].total === 1 && total === -1) {
            if (cart.total !== 0) {
                await dispatch(deletePizzaThunk(id));
                dispatch(getCartThunk(user.id))
            }
        }
        else {
            await dispatch(ChangeingNumOfPizza(total, id))
            dispatch(getCartThunk(user.id))
        }
    }


    const Checkout = async () => {
        await dispatch(makePizza());
        dispatch(getCartThunk(user.id))
    }
    const EditPizza = async (pizzaId) => {
        await dispatch(getIndividualPizza(pizzaId));
        for (let topping = 0; topping < pizza.toppings.length; topping++) {
            const element = pizza.toppings[topping];
            if (element === 'cheese') {
                setCheese(false)
            }
            else if (element === 'mushroom') {
                setMushroom(false)
            }
            else if (element === 'peperoni') {
                setPeperoni(false)
            }
            else if (element === 'pineapple') {
                setPineapple(false)
            }
        }
        setShowModal(true)
    }
    return (
        <div id='HomeContainer'>
            <button id='MakePizzaButton' onClick={() => { OpenModal() }}>Make Pizza</button>
            {showModal ? <div id='PizzaMakingModalContainer'>
                <div id='PizzaMakingModal'>
                    <div id='CloseButtonContainer'><button id='exitButton' onClick={() => { CloseModal() }}>x</button></div>
                    <div id='IngredientsContainer'>
                        <div className='Ingredient'>
                            {cheese ? <button className='IngredientButton' onClick={() => { AddIngredient(1.0, 'cheese', 'add'); setCheese(!cheese) }}>Add</button> :
                                <button className='IngredientButton' onClick={() => { AddIngredient(-1.0, 'cheese', 'remove'); setCheese(!cheese) }}>Remove</button>}
                            <div className='ingredientNameContainer'><span>Extra Cheese + $1</span></div>
                        </div>
                        <div className='Ingredient'>
                            {mushroom ? <button className='IngredientButton' onClick={() => { AddIngredient(2.0, 'mushroom', 'add'); setMushroom(!mushroom) }}>Add</button> :
                                <button className='IngredientButton' onClick={() => { AddIngredient(-2.0, 'mushroom', 'remove'); setMushroom(!mushroom) }}>Remove</button>}
                            <div className='ingredientNameContainer'><span>Mushroom + $2</span></div>
                        </div>
                        <div className='Ingredient'>
                            {peperoni ? <button className='IngredientButton' onClick={() => { AddIngredient(2.0, 'peperoni', 'add'); setPeperoni(!peperoni) }}>Add</button> :
                                <button className='IngredientButton' onClick={() => { AddIngredient(-2.0, 'peperoni', 'remove'); setPeperoni(!peperoni) }}>Remove</button>}
                            <div className='ingredientNameContainer'><span>Peperoni + $2</span></div>
                        </div>
                        <div className='Ingredient'>
                            {pineapple ? <button className='IngredientButton' onClick={() => { AddIngredient(2.0, 'pineapple', 'add'); setPineapple(!pineapple) }}>Add</button> :
                                <button className='IngredientButton' onClick={() => { AddIngredient(-2.0, 'pineapple', 'remove'); setPineapple(!pineapple) }}>Remove</button>}
                            <div className='ingredientNameContainer'><span>Pineapple + $2</span></div>
                        </div>
                    </div>
                    <div id='TotalAndSubmitbutton'><button onClick={() => { setShowModal(false) }}>Make Pizza</button><div>{'Total:$' + pizza.price}</div></div>
                </div>
            </div> : <></>
            }
            {!showCart ? <button id='cartButton' onClick={() => { setShowCart(true) }}>
                <i class="fas fa-shopping-cart"></i>
            </button> : <></>}
            {showCart ? <div id='CartContainer'>
                <div id='CartCloseButtonContainer'><button onClick={() => { setShowCart(false) }}>x</button></div>
                <div id='CartItemsContainer'><ul>{allpizzas.map((pizza, i) => (
                    <><li className='Items' id={pizza.id}>
                        {pizza.total + ' Pizza'}
                        <button className={i} id={pizza.id} onClick={(e) => { ChangeNumOfPizza(1, e.target.id, e.target.className) }}>Add</button>
                        <button id={pizza.id} onClick={(e) => { EditPizza(e.target.id) }}>Edit</button>
                        <button className={i} id={pizza.id} onClick={(e) => { ChangeNumOfPizza(-1, e.target.id, e.target.className) }}>Remove</button>
                    </li>
                        <span>
                            {pizza.toppings.map((topping, i) => (
                                <span>{topping.name}</span>
                            ))}
                        </span>
                    </>
                ))}</ul></div>
                <div id='CartTotalContainer'><button>Checkout</button>{'Total:$' + cart.total} </div>
            </div> : <></>}
        </div >
    );
}

export default HomePage;
