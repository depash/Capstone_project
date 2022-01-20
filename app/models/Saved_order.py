from .db import db
from .user import User


class Saved_order(db.Model):
    __tablename__ = 'saved_orders'

    id = db.Column(db.Integer, primary_key=True)
    total = db.Column(db.Integer, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)

    pizza_relation = db.relationship(
        "Pizza", back_populates="order_relation", cascade="all, delete")
    product_relation = db.relationship(
        "Product", back_populates="order_relation", cascade="all, delete")
    user_relation = db.relationship("User", back_populates="order_relation")

    def to_dict(self):
        return {
            'id': self.id,
            'total': self.total
        }
