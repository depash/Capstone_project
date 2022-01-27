const GET_CART = "cart/GET_CART"

const getCart = (cart, pizzas) => ({
    type: GET_CART,
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

const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CART:
            return { cart: action.payload.cart, pizzas: action.payload.pizzas }
        default:
            return state;
    }
}

export default cartReducer
