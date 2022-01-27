const GET_CART = "cart/GET_CART"
const PUT_CART = "cart/PUT_CART"

const getCart = (cart, pizzas) => ({
    type: GET_CART,
    payload: { cart, pizzas }
})
const putCart = (cart, pizzas) => ({
    type: PUT_CART,
    payload: { cart, pizzas }
})

export const getCartThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/cart/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const { cart, pizzas } = await response.json();
        dispatch(getCart(cart, pizzas))
        return null;
    }
}

export const Checkout = (cartId, price, userId) => async (dispatch) => {
    const response = await fetch(`/api/cart/${cartId}/checkout/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            price
        })
    })
    if (response.ok) {
        const { cart, pizzas } = await response.json();
        dispatch(putCart(cart, pizzas))
        return null;
    }
}

const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CART:
            return { cart: action.payload.cart, pizzas: action.payload.pizzas }
        case PUT_CART:
            return { cart: action.payload.cart, pizzas: action.payload.pizzas }
        default:
            return state;
    }
}

export default cartReducer
