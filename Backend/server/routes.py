from server import app, db, bcrypt
from server.models import Users, ProductList
from flask import request, jsonify
from flask_login import login_user, current_user, logout_user, login_required
from datetime import datetime
from server.models import Users, ProductList, Sales, TotalCapital

@app.route('/')
def home():
    return '<h1>Home Page <h1>'

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    new_user = Users(
        username=data['username'],
        email=data['email'],
        password=hashed_password,
        role=data['role']
    )
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    user = Users.query.filter_by(email=data['email']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        login_user(user)
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Login failed unsuccessful please check your credentials'})
    
@app.route('/logout')
def logout():
    logout_user()
    return jsonify({'message': 'User logged out'})

from flask import jsonify
from datetime import datetime

@app.route('/dashboard', methods=['GET'])
def dashboard():
    # Get all products
    products = ProductList.query.all()

    # Get the current month and year
    current_month = datetime.now().month
    current_year = datetime.now().year

    # Get sales for this month
    sales_this_month = Sales.query.filter(
        db.extract('month', Sales.date_sold) == current_month,
        db.extract('year', Sales.date_sold) == current_year
    ).all()

    # Calculate profit for this month
    profit_this_month = sum(sale.profit for sale in sales_this_month)

    # Total number of items
    total_items = ProductList.query.count()

    # Count of low stock items
    low_stock_items = ProductList.query.filter_by(status='Low Stock').count()

    # Total sales amount
    total_sales = db.session.query(db.func.sum(Sales.total_amount)).scalar()

    # Total number of orders (total number of sales entries)
    total_orders = Sales.query.filter(
        db.extract('month', Sales.date_sold) == current_month,
        db.extract('year', Sales.date_sold) == current_year
    ).count()

    # Turnover rate calculation
    total_quantity_sold = db.session.query(db.func.sum(Sales.quantity)).filter(
        db.extract('month', Sales.date_sold) == current_month,
        db.extract('year', Sales.date_sold) == current_year
    ).scalar()

    total_quantity_sold = total_quantity_sold if total_quantity_sold is not None else 0
    average_stock = db.session.query(db.func.avg(ProductList.quantity)).scalar()

    average_stock = average_stock if average_stock is not None else 0

    # Calculate turnover rate
    if average_stock > 0:
        turnover_rate = total_quantity_sold / average_stock
    else:
        turnover_rate = 0

    return jsonify({
        'total_items': total_items,
        'profit_this_month': profit_this_month,
        'low_stock_items': low_stock_items,
        'total_sales': total_sales,
        'total_orders': total_orders,
        'turnover_rate': turnover_rate
    })

@app.route('/capital', methods=['GET'])
def get_current_capital():
    current_capital = TotalCapital.get_current_capital()
    return jsonify({"capital": str(current_capital)})


@app.route('/reports', methods=['GET'])
def get_reports():
    sales = Sales.query.all()

    # Get the current month and year
    current_month = datetime.now().month
    current_year = datetime.now().year

    # Get sales for this month
    sales_this_month = Sales.query.filter(
        db.extract('month', Sales.date_sold) == current_month,
        db.extract('year', Sales.date_sold) == current_year
    ).all()

    # Calculate profit for this month
    profit_this_month = sum(sale.profit for sale in sales_this_month)

    # Get the total sales for this month
    total_sales_this_month = sum(sale.total_amount for sale in sales_this_month)

    # Get the total number of items sold this month
    total_items_sold_this_month = sum(sale.quantity for sale in sales_this_month)

    # Get the total number of items sold
    total_items_sold = sum(sale.quantity for sale in sales)

    # Get the total sales
    total_sales = sum(sale.total_amount for sale in sales)

    # Get the total profit
    total_profit = sum(sale.profit for sale in sales)

    return jsonify({
        'total_sales': total_sales,
        'total_profit': total_profit,
        'total_items_sold': total_items_sold,
        'total_sales_this_month': total_sales_this_month,
        'total_items_sold_this_month': total_items_sold_this_month,
        'profit_this_month': profit_this_month
    })