from .db import db


class Progress(db.Model):
    __tablename__ = 'progress'

    id = db.Column(db.Integer, primary_key=True)
    stage = db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'total': self.total
        }
