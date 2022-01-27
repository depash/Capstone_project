from app.models import db, Cart


# Adds a demo user, you can add other users here if you want
def seed_carts():
    demo = Cart(
        userId=1, total=0)
    marnie = Cart(
        userId=2, total=0)
    bobbie = Cart(
        userId=3, total=0)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


def undo_carts():
    db.session.execute('TRUNCATE carts RESTART IDENTITY CASCADE;')
    db.session.commit()
