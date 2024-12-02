from server import app, db
from server.models import ProductList, Sales,Expense, TotalCapital, ProductSalesDetails

from datetime import datetime
from decimal import Decimal

def seed_data():
    with app.app_context():
        # Delete existing data
        print("Deleting existing data...")
        ProductList.query.delete()
        ProductSalesDetails.query.delete()
        Expense.query.delete()
        TotalCapital.query.delete()

        # Create Products
        print("Creating products...")
        products = [
            ProductList(product_name="Laptop", category="Electronics", quantity=10,brand="HP, model-HP Elitebook 840 G3"),
            ProductList(product_name="Smartphone", category="Electronics", quantity=20,brand="Samsung, model-Samsung Galaxy S10"),
            ProductList(product_name="Office Chair", category="Furniture", quantity=5,brand="IKEA, model-Office Chair"),
            ProductList(product_name="Projector", category="Electronics", quantity=3,brand="Epson, model-Epson EB-S41"),
            ProductList(product_name="Desk", category="Furniture", quantity=7,brand="IKEA, model-Desk"),
            ProductList(product_name="Mouse", category="Electronics", quantity=15,brand="Logitech, model-Logitech M185"),
            ProductList(product_name="Keyboard", category="Electronics", quantity=18,brand="Logitech, model-Logitech K120"),
            ProductList(product_name="Monitor", category="Electronics", quantity=10,brand="Dell, model-Dell E1916HV"),
            ProductList(product_name="Desk Lamp", category="Furniture", quantity=4,brand="IKEA, model-Desk Lamp"),
            ProductList(product_name="Printer", category="Electronics", quantity=69,brand="HP, model-HP LaserJet Pro MFP M130a"),
            ProductList(product_name="Table", category="Furniture", quantity=10,brand="IKEA, model-Table"),
            ProductList(product_name="Chair", category="Furniture", quantity=20,brand="IKEA, model-Chair"),
            ProductList(product_name="Bookshelf", category="Furniture", quantity=5,brand="IKEA, model-Bookshelf"),
            ProductList(product_name="Sofa", category="Furniture", quantity=3,brand="IKEA, model-Sofa"),
            ProductList(product_name="Bed", category="Furniture", quantity=7,brand="IKEA, model-Bed"),
            ProductList(product_name="Cabinet", category="Furniture", quantity=15,brand="IKEA, model-Cabinet"),
            ProductList(product_name="Television", category="Electronics", quantity=18,brand="Samsung, model-Samsung 55 inch 4K UHD TV"),
            ProductList(product_name="Soundbar", category="Electronics", quantity=10,brand="Sony, model-Sony HT-S100F"),
            ProductList(product_name="Refrigerator", category="Electronics", quantity=4,brand="Samsung, model-Samsung RT28M3022S8"),
            ProductList(product_name="Air Conditioner", category="Electronics", quantity=7,brand="Samsung, model-Samsung AR12NV3HFTR"),
            ProductList(product_name="Washing Machine", category="Electronics", quantity=15,brand="Samsung, model-Samsung WA70H4000SG"),
            ProductList(product_name="Microwave", category="Electronics", quantity=18,brand="Samsung, model-Samsung MS23K3513AK"),
            ProductList(product_name="Oven", category="Electronics", quantity=10,brand="Samsung, model-Samsung NV66M3571BS"),
            ProductList(product_name="Blender", category="Electronics", quantity=4,brand="Philips, model-Philips HR2056/00"),
            ProductList(product_name="Toaster", category="Electronics", quantity=7,brand="Philips, model-Philips HD2582/00"),
            ProductList(product_name="Kettle", category="Electronics", quantity=15,brand="Philips, model-Philips HD9306/03"),
            ProductList(product_name="Fan", category="Electronics", quantity=18,brand="Philips, model-Philips HR3705/10"),
            ProductList(product_name="Iron", category="Electronics", quantity=10,brand="Philips, model-Philips GC181"),
            ProductList(product_name="Shirt", category="Mens Wear", quantity=7,brand="Zara, model-Z"),
            ProductList(product_name="T-Shirt", category="Mens Wear", quantity=15,brand="Zara, model-Z"),
            ProductList(product_name="Jeans", category="Mens Wear", quantity=18,brand="Zara, model-Z"),
            ProductList(product_name="Shoes", category="Mens Wear", quantity=10,brand="Zara, model-Z"),
            ProductList(product_name="Socks", category="Mens Wear", quantity=4,brand="Zara, model-Z"),
            ProductList(product_name="Dress", category="Womens Wear", quantity=7,brand="Zara, model-Z"),
            ProductList(product_name="T-Shirt", category="Womens Wear", quantity=15,brand="Zara, model-Z"),
            ProductList(product_name="Jeans", category="Womens Wear", quantity=18,brand="Zara, model-Z"),
            ProductList(product_name="Shoes", category="Womens Wear", quantity=10,brand="Zara, model-Z"),
            ProductList(product_name="Socks", category="Womens Wear", quantity=4,brand="Zara, model-Z"),
            ProductList(product_name="Skirt", category="Womens Wear", quantity=7,brand="Zara, model-Z"),
            ProductList(product_name="Blouse", category="Womens Wear", quantity=15,brand="Zara, model-Z"),
            ProductList(product_name="Scarf", category="Womens Wear", quantity=18,brand="Zara, model-Z"),
            ProductList(product_name="Hat", category="Womens Wear", quantity=10,brand="Zara, model-Z"),
            ProductList(product_name="Gloves", category="Womens Wear", quantity=4,brand="Zara, model-Z"),
        ]
        db.session.add_all(products)

        # Create TotalCapital record
        print("Creating total capital record...")
        total_capital = TotalCapital(capital=float(Decimal("100000.00")))  # Convert Decimal to float
        db.session.add(total_capital)

        # Create Expenses
        print("Creating expenses...")
        expenses = [
            Expense(expense_name="Office Supplies", amount=float(Decimal("500.00"))),
            Expense(expense_name="Rent", amount=float(Decimal("2000.00"))),
            Expense(expense_name="Utilities", amount=float(Decimal("150.00"))),
            Expense(expense_name="Marketing Campaign", amount=float(Decimal("5000.00"))),
            Expense(expense_name="Salaries", amount=float(Decimal("20000.00"))),
            Expense(expense_name="Insurance", amount=float(Decimal("1200.00"))),
            Expense(expense_name="Equipment Maintenance", amount=float(Decimal("1500.00"))),
            Expense(expense_name="Transportation", amount=float(Decimal("800.00"))),
            Expense(expense_name="Taxes", amount=float(Decimal("4000.00"))),
            Expense(expense_name="Legal Fees", amount=float(Decimal("1000.00")))
        ]
        db.session.add_all(expenses)

        # Commit initial data
        db.session.commit()

        # Create Sales records in ProductSalesDetails
        print("Creating sales records...")
        sales = [
            ProductSalesDetails(product_id=1, selling_price=float(Decimal("800.00")), 
                                buying_price=float(Decimal("500.00")), quantity=5),
            ProductSalesDetails(product_id=2, selling_price=float(Decimal("500.00")), 
                                buying_price=float(Decimal("300.00")), quantity=10),
            ProductSalesDetails(product_id=3, selling_price=float(Decimal("120.00")), 
                                buying_price=float(Decimal("50.00")), quantity=2),
            ProductSalesDetails(product_id=4, selling_price=float(Decimal("400.00")), 
                                buying_price=float(Decimal("200.00")), quantity=3),
            ProductSalesDetails(product_id=5, selling_price=float(Decimal("250.00")), 
                                buying_price=float(Decimal("120.00")), quantity=1),
            ProductSalesDetails(product_id=6, selling_price=float(Decimal("30.00")), 
                                buying_price=float(Decimal("10.00")), quantity=7),
            ProductSalesDetails(product_id=7, selling_price=float(Decimal("40.00")), 
                                buying_price=float(Decimal("15.00")), quantity=5),
            ProductSalesDetails(product_id=8, selling_price=float(Decimal("250.00")), 
                                buying_price=float(Decimal("150.00")), quantity=4),
            ProductSalesDetails(product_id=9, selling_price=float(Decimal("70.00")), 
                                buying_price=float(Decimal("25.00")), quantity=6),
            ProductSalesDetails(product_id=10, selling_price=float(Decimal("200.00")), 
                                buying_price=float(Decimal("100.00")), quantity=3),
            ProductSalesDetails(product_id=11, selling_price=float(Decimal("100.00")),
                                buying_price=float(Decimal("50.00")), quantity=5),
            ProductSalesDetails(product_id=12, selling_price=float(Decimal("50.00")),
                                buying_price=float(Decimal("20.00")), quantity=10),
            ProductSalesDetails(product_id=13, selling_price=float(Decimal("80.00")),
                                buying_price=float(Decimal("30.00")), quantity=2),
            ProductSalesDetails(product_id=14, selling_price=float(Decimal("300.00")),
                                buying_price=float(Decimal("150.00")), quantity=3),
            ProductSalesDetails(product_id=15, selling_price=float(Decimal("200.00")),
                                buying_price=float(Decimal("100.00")), quantity=1),
            ProductSalesDetails(product_id=16, selling_price=float(Decimal("30.00")),
                                buying_price=float(Decimal("10.00")), quantity=7),
            ProductSalesDetails(product_id=17, selling_price=float(Decimal("40.00")),
                                buying_price=float(Decimal("1500.00")), quantity=5),
            ProductSalesDetails(product_id=18, selling_price=float(Decimal("250.00")),
                                buying_price=float(Decimal("350.00")), quantity=4),
            ProductSalesDetails(product_id=19, selling_price=float(Decimal("70.00")),
                                buying_price=float(Decimal("250.00")), quantity=6),
            ProductSalesDetails(product_id=20, selling_price=float(Decimal("200.00")),
                                buying_price=float(Decimal("1000.00")), quantity=3),
            ProductSalesDetails(product_id=21, selling_price=float(Decimal("100.00")),
                                buying_price=float(Decimal("500.00")), quantity=5),
            ProductSalesDetails(product_id=22, selling_price=float(Decimal("50.00")),
                                buying_price=float(Decimal("200.00")), quantity=10),
            ProductSalesDetails(product_id=23, selling_price=float(Decimal("80.00")),
                                buying_price=float(Decimal("300.00")), quantity=2),
            ProductSalesDetails(product_id=24, selling_price=float(Decimal("300.00")),
                                buying_price=float(Decimal("1500.00")), quantity=3),
            ProductSalesDetails(product_id=25, selling_price=float(Decimal("200.00")),
                                buying_price=float(Decimal("700.00")), quantity=1),
            ProductSalesDetails(product_id=26, selling_price=float(Decimal("30.00")),
                                buying_price=float(Decimal("1000.00")), quantity=7),
            ProductSalesDetails(product_id=27, selling_price=float(Decimal("40.00")),
                                buying_price=float(Decimal("1500.00")), quantity=5),
            ProductSalesDetails(product_id=28, selling_price=float(Decimal("250.00")),
                                buying_price=float(Decimal("350.00")), quantity=4),
            ProductSalesDetails(product_id=29, selling_price=float(Decimal("70.00")),
                                buying_price=float(Decimal("250.00")), quantity=6),
            ProductSalesDetails(product_id=30, selling_price=float(Decimal("200.00")),
                                buying_price=float(Decimal("1000.00")), quantity=3),
            ProductSalesDetails(product_id=31, selling_price=float(Decimal("100.00")),
                                buying_price=float(Decimal("500.00")), quantity=5),
            ProductSalesDetails(product_id=32, selling_price=float(Decimal("50.00")),
                                buying_price=float(Decimal("200.00")), quantity=10),
            ProductSalesDetails(product_id=33, selling_price=float(Decimal("80.00")),
                                buying_price=float(Decimal("300.00")), quantity=2),
            ProductSalesDetails(product_id=34, selling_price=float(Decimal("300.00")),
                                buying_price=float(Decimal("1500.00")), quantity=3),
            ProductSalesDetails(product_id=35, selling_price=float(Decimal("200.00")),
                                buying_price=float(Decimal("700.00")), quantity=1),
            ProductSalesDetails(product_id=36, selling_price=float(Decimal("30.00")),
                                buying_price=float(Decimal("1000.00")), quantity=7),
            ProductSalesDetails(product_id=37, selling_price=float(Decimal("40.00")),
                                buying_price=float(Decimal("1500.00")), quantity=5),
            ProductSalesDetails(product_id=38, selling_price=float(Decimal("250.00")),
                                buying_price=float(Decimal("350.00")), quantity=4),
            ProductSalesDetails(product_id=39, selling_price=float(Decimal("70.00")),
                                buying_price=float(Decimal("250.00")), quantity=6),
            ProductSalesDetails(product_id=40, selling_price=float(Decimal("200.00")),
                                buying_price=float(Decimal("1000.00")), quantity=3),
            ProductSalesDetails(product_id=41, selling_price=float(Decimal("100.00")),
                                buying_price=float(Decimal("500.00")), quantity=5),
            ProductSalesDetails(product_id=42, selling_price=float(Decimal("50.00")),
                                buying_price=float(Decimal("200.00")), quantity=10)
        ]
        # Calculate total_amount and profit for each sale before adding to db
        for sale in sales:
            sale.calculate_total_amount_and_profit()
        
        db.session.add_all(sales)

        # Commit Sales data
        db.session.commit()

        # Update quantity for products after sales
        print("Updating product quantities...")
        for sale in sales:
            sale.update_quantity(sale.quantity)
            product = ProductList.query.get(sale.product_id)
            product.update_product_quantity(sale.quantity)  # This updates the product quantity


        salesTable = [
            Sales(product_id=1, quantity=5, total_amount=4000, profit=1500, date_sold=datetime.now()),
            Sales(product_id=2, quantity=10, total_amount=5000, profit=2000, date_sold=datetime.now()),
            Sales(product_id=3, quantity=2, total_amount=240, profit=140, date_sold=datetime.now()),
            Sales(product_id=4, quantity=3, total_amount=1200, profit=600, date_sold=datetime.now()),
            Sales(product_id=5, quantity=1, total_amount=250, profit=130, date_sold=datetime.now()),
            Sales(product_id=6, quantity=7, total_amount=210, profit=140, date_sold=datetime.now()),
            Sales(product_id=7, quantity=5, total_amount=200, profit=125, date_sold=datetime.now()),
            Sales(product_id=8, quantity=4, total_amount=1000, profit=400, date_sold=datetime.now()),
            Sales(product_id=9, quantity=6, total_amount=420, profit=270, date_sold=datetime.now()),
            Sales(product_id=10, quantity=3, total_amount=600, profit=300, date_sold=datetime.now()),
            Sales(product_id=11, quantity=5, total_amount=500, profit=250, date_sold=datetime.now()),
            Sales(product_id=12, quantity=10, total_amount=500, profit=300, date_sold=datetime.now()),
            Sales(product_id=13, quantity=2, total_amount=160, profit=100, date_sold=datetime.now()),
            Sales(product_id=14, quantity=3, total_amount=900, profit=450, date_sold=datetime.now()),
            Sales(product_id=15, quantity=1, total_amount=200, profit=100, date_sold=datetime.now()),
            Sales(product_id=16, quantity=7, total_amount=210, profit=140, date_sold=datetime.now()),
            Sales(product_id=17, quantity=5, total_amount=200, profit=125, date_sold=datetime.now()),
            Sales(product_id=18, quantity=4, total_amount=1000, profit=400, date_sold=datetime.now()),
            Sales(product_id=19, quantity=6, total_amount=420, profit=270, date_sold=datetime.now()),
            Sales(product_id=20, quantity=3, total_amount=600, profit=300, date_sold=datetime.now()),
            Sales(product_id=21, quantity=5, total_amount=500, profit=250, date_sold=datetime.now()),
            Sales(product_id=22, quantity=10, total_amount=500, profit=300, date_sold=datetime.now()),
            Sales(product_id=23, quantity=2, total_amount=160, profit=100, date_sold=datetime.now()),
            Sales(product_id=24, quantity=3, total_amount=900, profit=450, date_sold=datetime.now()),
            Sales(product_id=25, quantity=1, total_amount=200, profit=100, date_sold=datetime.now()),
            Sales(product_id=26, quantity=7, total_amount=210, profit=140, date_sold=datetime.now()),
            Sales(product_id=27, quantity=5, total_amount=200, profit=125, date_sold=datetime.now()),
            Sales(product_id=28, quantity=4, total_amount=1000, profit=400, date_sold=datetime.now()),
            Sales(product_id=29, quantity=6, total_amount=420, profit=270, date_sold=datetime.now()),
            Sales(product_id=30, quantity=3, total_amount=600, profit=300, date_sold=datetime.now()),
            Sales(product_id=31, quantity=5, total_amount=500, profit=250, date_sold=datetime.now()),
            Sales(product_id=32, quantity=10, total_amount=500, profit=300, date_sold=datetime.now()),
            Sales(product_id=33, quantity=2, total_amount=160, profit=100, date_sold=datetime.now()),
            Sales(product_id=34, quantity=3, total_amount=900, profit=450, date_sold=datetime.now()),
            Sales(product_id=35, quantity=1, total_amount=200, profit=100, date_sold=datetime.now()),
            Sales(product_id=36, quantity=7, total_amount=210, profit=140, date_sold=datetime.now()),
            Sales(product_id=37, quantity=5, total_amount=200, profit=125, date_sold=datetime.now()),
            Sales(product_id=38, quantity=4, total_amount=1000, profit=400, date_sold=datetime.now()),
            Sales(product_id=39, quantity=6, total_amount=420, profit=270, date_sold=datetime.now()),
            Sales(product_id=40, quantity=3, total_amount=600, profit=300, date_sold=datetime.now()),
            Sales(product_id=41, quantity=5, total_amount=500, profit=250, date_sold=datetime.now()),
            Sales(product_id=42, quantity=10, total_amount=500, profit=300, date_sold=datetime.now())
        ]

        db.session.add_all(salesTable)

        db.session.commit()

        print("Seeding done!")

seed_data()

if __name__ == '__main__':
    app.run(debug=True)
