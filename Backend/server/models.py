from server import db, login_manager
from flask_login import UserMixin
from datetime import datetime

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
    category = db.Column(db.String(120), nullable=False)
    status = db.Column(db.String(120), nullable=False, default='Available')
    quantity = db.Column(db.Integer, nullable=False)
    
    selling_price = db.relationship('ProductSalesDetails', backref='product_list', lazy=True)
    date_added = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    def update_stock(self):
        self.quantity += self.quantity
        self.status = 'Available'  

    def update_product_quantity(self, quantity_sold):
        """Update the overall quantity in ProductList after a sale."""
        self.quantity -= quantity_sold
        if self.quantity < 10:
            self.status = 'Low Stock'
        elif self.quantity == 0:
            self.status = 'Out of Stock'
        db.session.commit()

    def restock_product(self, quantity, buying_price):
        """Restock the product if there's enough capital."""
        total_cost = buying_price * quantity
        current_capital = TotalCapital.get_current_capital()

        if current_capital >= total_cost:
            TotalCapital.update_capital(-total_cost)
            self.quantity += quantity
            self.status = 'Available'
            db.session.commit()
            return True
        else:
            return False

class ProductSalesDetails(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product_list.id'), nullable=False)
    selling_price = db.Column(db.Numeric(12, 2), nullable=False)
    buying_price = db.Column(db.Numeric(12, 2), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    total_amount = db.Column(db.Numeric(12, 2), nullable=False) 
    profit = db.Column(db.Numeric(12, 2), nullable=False)  

    product = db.relationship('ProductList', backref=db.backref('sales_details', lazy=True))

    def __repr__(self):
        return f"ProductSalesDetails('{self.product.product_name}', '{self.quantity}', '{self.total_amount}', '{self.profit}')"

    def calculate_profit(self):
        """Calculate the profit for this sale."""
        return self.quantity * (self.selling_price - self.buying_price)

    def update_quantity(self, quantity_sold):
        """Update the quantity in ProductSalesDetails after a sale."""
        self.quantity -= quantity_sold
        db.session.commit()

    def calculate_total_amount_and_profit(self):
        """Calculate and update total amount and profit."""
        self.total_amount = self.quantity * self.selling_price
        self.profit = self.calculate_profit()
        db.session.commit()


class Sales(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product_list.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    total_amount = db.Column(db.Numeric(12, 2), nullable=False)
    profit = db.Column(db.Numeric(12, 2), nullable=False)
    date_sold = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    product = db.relationship('ProductList', backref=db.backref('sales', lazy=True))

    def __repr__(self):
        return f"Sales('{self.product.product_name}', '{self.quantity}', '{self.total_amount}', '{self.profit}', '{self.date_sold}')"

    def calculate_total_amount_and_profit(self):
        self.total_amount = self.quantity * self.product.selling_price
        self.profit = self.quantity * self.product.calculate_profit()

    def update_sale(self):
        self.calculate_total_amount_and_profit()
        TotalCapital.update_capital(self.profit)
        db.session.commit()


    

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    expense_name = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    date_spent = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Debt('{self.customer_name}', '{self.amount}', '{self.date_borrowed}', '{self.status}')"
    
class TotalCapital(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    capital = db.Column(db.Numeric(12, 2), nullable=False)  # Store as decimal for precision
    date_updated = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"TotalCapital('{self.capital}', '{self.date_updated}')"

    @staticmethod
    def get_current_capital():
        capital = db.session.query(TotalCapital).first()
        return capital.capital if capital else 0.0

    @staticmethod
    def update_capital(amount):
        capital = TotalCapital.query.first()
        if capital:
            capital.capital += amount
        else:
            capital = TotalCapital(capital=amount)
            db.session.add(capital)
        db.session.commit()
