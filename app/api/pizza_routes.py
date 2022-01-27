from os import name
from flask import Blueprint, jsonify, request
from app.models import Pizza, db, Cart, Saved_order, Topping

pizza_routes = Blueprint('pizza', __name__)


@pizza_routes.route('/', methods=['POST'])
def PostPizzas():

    data = request.json
    pizza = Pizza(
        price=10.0,
        cartId=data['cartId'],
        total=1
    )
    cart = Cart.query.filter(Cart.id == data['cartId']).first()
    cart.total = cart.total + 10
    db.session.add(pizza)
    db.session.commit()
    return pizza.to_dict()


@pizza_routes.route('/<int:id>/')
def GetPizzas(id):
    pizzas = Pizza.query.filter(Pizza.cartId == id)
    length = Pizza.query.filter(Pizza.cartId == id).count()
    if length:
        pizza_list = [{"id": pizza.id, "price": pizza.price,
                       "cartId": pizza.cartId, 'orderId': pizza.orderId} for pizza in pizzas]
        return {pizza_list}
    else:
        return {'errors': ['No Pizza']}, 401


@pizza_routes.route('/<int:id>/', methods=['DELETE'])
def DeletePizzas(id):
    pizza = Pizza.query.filter(Pizza.id == id).first()
    cart = Cart.query.filter(Cart.id == pizza.cartId).first()
    cart.total = cart.total - pizza.price
    db.session.delete(pizza)
    db.session.commit()
    return jsonify("Deleted")


@pizza_routes.route('/<int:id>/total/', methods=['PUT'])
def PutPizzaTotal(id):
    data = request.json
    pizza = Pizza.query.filter(Pizza.id == id).first()
    oldTotal = pizza.total
    pizza.total = pizza.total + data['total']
    cart = Cart.query.filter(Cart.id == pizza.cartId).first()
    if data['total'] == 1:
        cart.total = cart.total + pizza.price
    else:
        cart.total = cart.total - pizza.price
    db.session.commit()
    return pizza.to_dict()


@pizza_routes.route('/<int:id>/', methods=['PUT'])
def PutPizzas(id):
    data = request.json
    pizza = Pizza.query.filter(Pizza.id == id).first()
    pizza.price = pizza.price + data['price']
    toping = Topping.query.filter(
        Topping.pizzaId == id).filter(Topping.name == data['Ingredient']).first()
    if data['whatToDo'] == 'remove':
        db.session.delete(toping)
        db.session.commit()
    elif data['whatToDo'] == 'add':
        NewToping = Topping(
            name=data['Ingredient'],
            pizzaId=id,
        )
        db.session.add(NewToping)
    db.session.commit()
    cart = Cart.query.filter(Cart.id == pizza.cartId).first()
    cart.total = cart.total + data['price']
    db.session.commit()
    toppings = Topping.query.filter(
        pizza.id == Topping.pizzaId).order_by(Topping.id)
    pizza_list = {"id": pizza.id, "price": pizza.price,
                  "cartId": pizza.cartId, 'orderId': pizza.orderId, 'total': pizza.total, 'toppings': [{"id": topping.id, "name": topping.name, "pizzaId": topping.pizzaId} for topping in toppings]}
    return pizza_list


@pizza_routes.route('/<int:id>/checkout/', methods=['PUT'])
def CheckoutPizzas(id):
    data = request.json
    pizzas = Pizza.query.filter(Pizza.cartId == id)
    length = Pizza.query.filter(Pizza.cartId == id).count()
    Order = Saved_order(
        total=data['price'],
        userId=data['userId'],
    )
    db.session.add(Order)
    db.session.commit()
    if length:
        pizza_list = [{"id": pizza.id, "price": pizza.price,
                       "cartId": pizza.cartId, 'orderId': pizza.orderId} for pizza in pizzas]
    for pizza in pizza_list:
        cart = Cart.query.filter(Cart.id == pizza.cartId).first()
        cart.total = cart.total - data['price']
        pizza.cartId = None

    db.session.commit()
    return pizza.to_dict()


@pizza_routes.route('/<int:id>/edit/')
def GetonePizza(id):
    pizza = Pizza.query.filter(Pizza.id == id).first()
    toppings = Topping.query.filter(
        pizza.id == Topping.pizzaId).order_by(Topping.id)
    pizza_list = {"id": pizza.id, "price": pizza.price,
                  "cartId": pizza.cartId, 'orderId': pizza.orderId, 'total': pizza.total, 'toppings': [{"id": topping.id, "name": topping.name, "pizzaId": topping.pizzaId} for topping in toppings]}

    return pizza_list
