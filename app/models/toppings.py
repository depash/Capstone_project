from app.models.user import User
from .db import db
from .pizza import Pizza


class Topping(db.Model):
    __tablename__ = 'toppings'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    pizzaId = db.Column(db.Integer, db.ForeignKey(Pizza.id), nullable=False)

    pizza_relation = db.relationship(
        "Pizza", back_populates="toppings_relation")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'pizzaId': self.pizzaId
        }
