from app.models.user import User
from .db import db
from .cart import Cart
from .Saved_order import Saved_order


class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    price = db.Column(db.Integer)
    cartId = db.Column(db.Integer, db.ForeignKey(Cart.id), nullable=False)
    orderId = db.Column(db.Integer, db.ForeignKey(
        Saved_order.id), nullable=False)

    cart_relation = db.relationship("Cart", back_populates="product_relation")
    order_relation = db.relationship(
        "Saved_order", back_populates="product_relation")

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.name,
            'price': self.price,
            'cartId': self.cartId,
            'orderId': self.orderId
        }
