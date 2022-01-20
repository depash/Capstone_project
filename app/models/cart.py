from app.models.user import User
from .db import db
from .user import User


class Cart(db.Model):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    total = db.Column(db.Integer)

    user_relation = db.relationship("User", back_populates="cart_relation")
    pizza_relation = db.relationship(
        "Pizza", back_populates="cart_relation", cascade="all, delete")
    product_relation = db.relationship(
        "Product", back_populates="cart_relation", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'total': self.total
        }
