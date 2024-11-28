from server import db, login_manager
from flask_login import UserMixin

@login_manager.user_loader
def load_user(id):
    return Users.query.get(int(id))

class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    role = db.Column(db.String(30), nullable=False, default='User')
    password = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

class ProductList(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    buying_price = db.Column(db.Integer, nullable=False)
    selling_price = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(120), nullable=False, default='Available')

    def __repr__(self):
        return f"Product('{self.product_name}', '{self.quantity}', '{self.buying_price}', '{self.selling_price}', '{self.status}')"
