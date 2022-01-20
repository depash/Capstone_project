from app.models.user import User
from .db import db
from .cart import Cart
from .Saved_order import Saved_order


class Pizza(db.Model):
    __tablename__ = 'pizzas'

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer)
    cartId = db.Column(db.Integer, db.ForeignKey(Cart.id), nullable=False)
    orderId = db.Column(db.Integer, db.ForeignKey(
        Saved_order.id), nullable=False)

    cart_relation = db.relationship("Cart", back_populates="pizza_relation")
    order_relation = db.relationship(
        "Saved_order", back_populates="pizza_relation")
    toppings_relation = db.relationship(
        "Topping", back_populates="pizza_relation", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'price': self.price,
            'cartId': self.cartId,
            'orderId': self.orderId
        }
