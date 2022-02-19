const GET_ORDERS = "cart/GET_ORDERS"
const PUT_ORDERS = "cart/PUT_ORDERS"
const getOrders = (orders, pizzas) => ({
    type: GET_ORDERS,
    payload: { orders, pizzas }
})
const putOrders = (orders, pizzas) => ({
    type: PUT_ORDERS,
    payload: { orders, pizzas }
})

export const getPastOrdersThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/order/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const { orders, pizzas } = await response.json();
        dispatch(getOrders(orders, pizzas))
        return null;
    }
}

export const ReOrder = (orderId, userId) => async (dispatch) => {
    const response = await fetch(`/api/order/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderId
        })
    })
    if (response.ok) {
        const { cart, pizzas } = await response.json();
        dispatch(putOrders(cart, pizzas))
        return null;
    }
}

const ordersReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return { orders: action.payload.orders, pizzas: action.payload.pizzas }
        case PUT_ORDERS:
            return { orders: action.payload.orders, pizzas: action.payload.pizzas }
        default:
            return state;
    }
}

export default ordersReducer
