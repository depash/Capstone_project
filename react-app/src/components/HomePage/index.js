import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getCartThunk, Checkout } from '../../store/cart';
import { ChangeingNumOfPizza, deletePizzaThunk, getIndividualPizza, makePizza, putPizzaThunk, makePreMadePizza } from '../../store/pizza';
import IconButton from '@mui/material/IconButton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseIcon from '@mui/icons-material/Close';
import './HomePage.css'

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [cheese, setCheese] = useState(true);
    const [mushroom, setMushroom] = useState(true);
    const [peperoni, setPeperoni] = useState(true);
    const [pineapple, setPineapple] = useState(true);
    const [editing, setEditing] = useState(true);
    const user = useSelector(state => state.session.user);
    const cart = useSelector(state => state.cart.cart)
    const allpizzas = useSelector(state => state.cart.pizzas)
    const pizza = useSelector(state => state.pizza)
    const dispatch = useDispatch();
    const history = useHistory();
    // const MakePizzaFunc = async (e) => {
    //     e.preventDefault();
    //     const data = await dispatch(makePizza(price, cart.id));
    //     if (data) {
    //         setErrors(data);
    //     }
    // };

    useEffect(() => {
        setShowModal(false)
        setShowCart(false)
        async function fetchData() {
            await dispatch(getCartThunk(user.id))
        }
        fetchData()
    }, [])
    const OpenModal = async () => {
        setEditing(true)
        await dispatch(makePizza(cart.id));
        dispatch(getCartThunk(user.id))
        setShowModal(true)
    }
    const CloseModal = async () => {
        await dispatch(deletePizzaThunk(pizza.id));
        dispatch(getCartThunk(user.id))
        setCheese(true)
        setMushroom(true)
        setPeperoni(true)
        setPineapple(true)
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
            if (allpizzas[classId].total === 25 && total > 0) {
            }
            else {
                await dispatch(ChangeingNumOfPizza(total, id))
                dispatch(getCartThunk(user.id))
            }
        }
    }
    useEffect(() => {
        if (editing === false) {
            for (let topping = 0; topping < pizza.toppings.length; topping++) {
                const element = pizza.toppings[topping];
                if (element.name === 'cheese') {
                    setCheese(false)
                }
                else if (element.name === 'mushroom') {
                    setMushroom(false)
                }
                else if (element.name === 'peperoni') {
                    setPeperoni(false)
                }
                else if (element.name === 'pineapple') {
                    setPineapple(false)
                }
            }
        }
    }, [pizza])

    const checkoutCart = async () => {
        await dispatch(Checkout(cart.id, cart.total))
    }
    const EditPizza = async (pizzaId) => {
        setEditing(false)
        await dispatch(getIndividualPizza(pizzaId))
        setShowModal(true)
    }
    if (!user) {
        return <Redirect to='/' />;
    }
    const closeUpdateModel = () => {
        setShowModal(false)
        setCheese(true)
        setMushroom(true)
        setPeperoni(true)
        setPineapple(true)
        setEditing(true)
    }

    const SubmitPizzaButton = () => {
        setShowModal(false)
        setCheese(true)
        setMushroom(true)
        setPeperoni(true)
        setPineapple(true)
        setShowCart(true)
    }
    const MakeNormalPizza = async () => {
        await dispatch(makePizza(cart.id));
        dispatch(getCartThunk(user.id))
        setShowCart(true)
    }

    const makePreMadePizzafunc = async (Ingredient, price) => {
        await dispatch(makePreMadePizza(cart.id, Ingredient, price))
        dispatch(getCartThunk(user.id))
        setShowCart(true)
    }
    return (
        <div id='HomeContainer'>
            <div id='MakePizzaButtonContainer'>
                <button id='MakePizzaButton' onClick={() => { OpenModal() }}>Make Pizza</button>
            </div>
            <div id='PremadePizzasContainer'>
                <div className='PremadePizza'>
                    <div className='image' id='cheeseimage'>
                    </div>
                    <div className='PremadePizzaInfo'>
                        <span>Normal Pizza</span>
                        <span>price: $10</span>
                        <button onClick={() => { MakeNormalPizza() }}>Buy</button>
                    </div>
                </div>
                <div className='PremadePizza'>
                    <div className='image' id='Peperoniimage'>

                    </div>
                    <div className='PremadePizzaInfo'>
                        <span> Peperoni Pizza</span>
                        <span>price: $12</span>
                        <button onClick={() => { makePreMadePizzafunc('peperoni', 12) }}>Buy</button>
                    </div>
                </div>
                <div className='PremadePizza'>
                    <div className='image' id='Mushroomimage'>

                    </div>
                    <div className='PremadePizzaInfo'>
                        <span>Mushroom Pizza</span>
                        <span>price: $12</span>
                        <button onClick={() => { makePreMadePizzafunc('mushroom', 12) }}>Buy</button>
                    </div>
                </div>
                <div className='PremadePizza'>
                    <div className='image' id='ExtraCheeseimage'>

                    </div>
                    <div className='PremadePizzaInfo'>
                        <span>Extra Cheese Pizza</span>
                        <span>price: $11</span>
                        <button onClick={() => { makePreMadePizzafunc('cheese', 11) }}>Buy</button>
                    </div>
                </div>
                <div className='PremadePizza'>
                    <div className='image' id='Pineappleimage'>

                    </div>
                    <div className='PremadePizzaInfo'>
                        <span>Pineapple Pizza</span>
                        <span>price: $12</span>
                        <button onClick={() => { makePreMadePizzafunc('pineapple', 12) }}>Buy</button>
                    </div>
                </div>
            </div>
            {
                showModal ? <div id='PizzaMakingModalContainer'>
                    <div id='PizzaMakingModal'>
                        <div id='CloseButtonContainer'>{editing ? <button id='exitButton' onClick={() => { CloseModal() }}>x</button> : <></>}</div>
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
                        <div id='TotalAndSubmitbutton'>{editing ? <button onClick={() => { SubmitPizzaButton() }}>Make Pizza</button> : <button onClick={() => { closeUpdateModel() }}>Update Pizza</button>}<div>{'Total:$' + pizza.price}</div></div>
                    </div>
                </div> : <></>
            }
            {
                !showCart ? <button id='cartButton' onClick={() => { setShowCart(true) }}>
                    <i class="fas fa-shopping-cart"></i>
                </button> : <></>
            }
            {
                showCart ? <div id='CartContainer'>
                    <div id='CartCloseButtonContainer'><CloseIcon onClick={() => { setShowCart(false) }} id='exitButtonCart' /></div>
                    <div id='CartItemsContainer'><ul>{allpizzas.map((pizza, i) => (
                        <div key={pizza.id} className='CartItemsAndToppings'><li key={pizza.id} className='Items' id={pizza.id}>
                            <div className='SingleItem'>
                                <span className='itemName' key={pizza.id + 'price'}>{'Pizza'}</span>
                                <div className='ButtonsAndQuantity'>
                                    <span key={pizza.id + 'quantity'}>{'Quantity: ' + pizza.total}</span>
                                    <div>
                                        <button key={pizza.id + 'add'} className={i} id={pizza.id} onClick={(e) => { ChangeNumOfPizza(1, e.target.id, e.target.className) }}>Add</button>
                                        <button key={pizza.id + 'edit'} id={pizza.id} onClick={(e) => { EditPizza(e.target.id) }}>Edit</button>
                                        <button key={pizza.id + 'remove'} className={i} id={pizza.id} onClick={(e) => { ChangeNumOfPizza(-1, e.target.id, e.target.className) }}>Remove</button>
                                    </div>
                                </div>
                                <ul className='ToppingsUl' key={pizza.id + 'toppings'}>
                                    {pizza.toppings.map((topping, i) => (
                                        <li key={topping.id + ' ' + topping.name}>{topping.name}</li>
                                    ))}
                                </ul>
                            </div>
                            <span key={pizza.id + 'total'}>{'$' + pizza.price * pizza.total}</span>
                        </li>
                        </div>
                    ))}</ul></div>
                    <div id='CartTotalContainer'><button id='CheckoutButton' onClick={() => { checkoutCart() }}>Checkout</button>{'Subtotal:$' + cart.total} </div>
                </div> : <></>
            }
        </div >
    );
}

export default HomePage;
