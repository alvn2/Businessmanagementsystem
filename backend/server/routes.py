from server import app, db, bcrypt
from server.models import Users, ProductList
from flask import request, jsonify
from flask_login import login_user, current_user, logout_user, login_required

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

@app.route('/add_products')
@login_required
def add_products():
    data = request.get_json()

    new_product = ProductList(
        product_name=data['product_name'],
        quantity=data['quantity'],
        buying_price=data['buying_price'],
        selling_price=data['selling_price'],
        status=data['status']
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify({'message': 'Product added successfully'})

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