import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../../store/cart';
import { getPastOrdersThunk } from '../../store/Orders';
import './OrderPage.css'

function Order() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user);
    const orders = useSelector(state => state.orders.orders)
    const pizzas = useSelector(state => state.orders.pizzas)
    useEffect(() => {
        async function fetchData() {
            await dispatch(getCartThunk(user.id))
            await dispatch(getPastOrdersThunk(user.id))
        }
        fetchData()
    }, [])
    const ReorderButton = (id) => {

    }
    return (
        <div id='OrdersContainer'>
            <ul id='orders'>
                {orders?.map((order, i) => (
                    <li className='order'>
                        <div className='InfoAndDropdownContainer'>
                            <div>
                                <span>{'Order#' + order.id}</span>
                                <span>{"Price: $" + order.total}</span>
                            </div>
                            <div>
                                {pizzas?.map((pizza) => (
                                    pizza.orderId === order.id && <span>{pizza.total + " pizzas for $" + pizza.price + " with " + pizza.toppings.map((topping) => (
                                        topping.name)
                                    )}</span>
                                ))}
                            </div>
                        </div>
                        <div className='ReorderButtonContainer'>
                            <button id={order.id} onClick={(e) => { ReorderButton(e.target.id) }}>Reorder</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Order;
