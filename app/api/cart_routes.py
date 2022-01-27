from flask import Blueprint, jsonify
from app.models import Cart, db, Pizza, Topping


cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/<int:id>')
def getcarts(id):
    cart = Cart.query.filter(id == Cart.userId).first()
    pizzas = Pizza.query.filter(Pizza.cartId == id).order_by(Pizza.id)
    pizza_list = []
    for pizza in pizzas:
        toppings = Topping.query.filter(
            pizza.id == Topping.pizzaId).order_by(Topping.id)
        pizza_list.append({"id": pizza.id, "price": pizza.price,
                           "cartId": pizza.cartId, 'orderId': pizza.orderId, 'total': pizza.total, 'toppings': [{"id": topping.id, "name": topping.name,
                                                                                                                 "pizzaId": topping.pizzaId} for topping in toppings]})
    # pizza_list = [{"id": pizza.id, "price": pizza.price,
    #                "cartId": pizza.cartId, 'orderId': pizza.orderId, 'total': pizza.total} for pizza in pizzas]

    return jsonify({'cart': cart.to_dict(), 'pizzas': pizza_list})
