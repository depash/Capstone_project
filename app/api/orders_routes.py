from flask import Blueprint, jsonify, request
from app.models import Pizza, db, Cart, Saved_order, Topping


order_routes = Blueprint('order', __name__)


@order_routes.route('/<int:id>')
def getOrders(id):
    orders = Saved_order.query.filter(id == Saved_order.userId)
    orders_list = [{"id": order.id, "total": order.total,
                    "userId": order.userId} for order in orders]
    pizza_list = []
    for order in orders:
        pizzas = Pizza.query.filter(order.id == Pizza.orderId)
        for pizza in pizzas:
            toppings = Topping.query.filter(
                pizza.id == Topping.pizzaId).order_by(Topping.id)
            pizza_list.append({"id": pizza.id, "price": pizza.price,
                               "cartId": pizza.cartId, 'orderId': pizza.orderId, 'total': pizza.total, 'toppings': [{"id": topping.id, "name": topping.name,
                                                                                                                     "pizzaId": topping.pizzaId} for topping in toppings]})
    # pizza_list = [{"id": pizza.id, "price": pizza.price,
    #                "cartId": pizza.cartId, 'orderId': pizza.orderId, 'total': pizza.total} for pizza in pizzas]

    return jsonify({'orders': orders_list, 'pizzas': pizza_list})


@order_routes.route('/<int:id>', methods=['PUT'])
def re_order(id):
    data = request.json
    pizzas = Pizza.query.filter(Pizza.orderId == data['orderId'])
    length = Pizza.query.filter(Pizza.orderId == data['orderId']).count()
    order = Saved_order.query.filter(Saved_order.id == data['orderId']).first()
    cart = Cart.query.filter(Cart.id == id).first()
    for pizza in pizzas:
        cart.total += pizza.price
        pizza.cartId = cart.id
        pizza.orderId = None
    if length:
        pizza_list = [{"id": pizza.id, "price": pizza.price,
                       "cartId": pizza.cartId, 'orderId': pizza.orderId} for pizza in pizzas]
    db.session.delete(order)
    db.session.commit()
    return jsonify({'cart': cart.to_dict(), 'pizzas': pizza_list})
