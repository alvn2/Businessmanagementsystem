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

@app.route('/get_products')
def get_products():
    products = ProductList.query.all()

    product_list = []

    for product in products:
        product_data = {
            'product_name': product.product_name,
            'quantity': product.quantity,
            'buying_price': product.buying_price,
            'selling_price': product.selling_price,
            'status': product.status
        }

        product_list.append(product_data)

    return jsonify({'products': product_list})

@app.route('/update_product/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()

    product = ProductList.query.get(id)

    product.product_name = data['product_name']
    product.quantity = data['quantity']
    product.buying_price = data['buying_price']
    product.selling_price = data['selling_price']
    product.status = data['status']

    db.session.commit()

    return jsonify({'message': 'Product updated successfully'})

@app.route('/delete_product/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = ProductList.query.get(id)

    db.session.delete(product)
    db.session.commit()

    return jsonify({'message': 'Product deleted successfully'})

@app.route('/sell_product/<int:id>', methods=['POST'])
def sell_product(id):
    data = request.get_json()

    product = ProductList.query.get(id)
    #add paying options in future

    if product.quantity < data['quantity']:
        return jsonify({'message': 'Not enough stock'})

    product.update_quantity(data['quantity'])

    db.session.commit()

    return jsonify({'message': 'Product sold successfully'})

@app.route('/dashboard', methods=['GET'])
def dashboard():
    products = ProductList.query.all()

    total_items = len(products)
    profit_this_month = 0
    low_stock_items = 0
    total_sales = 0
    total_orders = 0
    turnover_rate = 0

    for product in products:
        profit_this_month += product.calculate_total_amount_and_profit()
        if product.status == 'Low Stock':
            low_stock_items += 1
        
        total_sales += product.selling_price
        total_orders += product.quantity

    turnover_rate = total_sales / total_orders

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


@app.route('/restock_product', methods=['POST'])
def restock_product():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity')
    buying_price = data.get('buying_price')

    product = ProductList.query.filter_by(id=product_id).first()
    if not product:
        return jsonify({"message": "Product not found"}), 404

    restocked = product.restock_product(quantity, buying_price)
    if restocked:
        return jsonify({"message": "Product restocked successfully", "capital": str(TotalCapital.get_current_capital())}), 200
    else:
        return jsonify({"message": "Not enough capital to restock"}), 400