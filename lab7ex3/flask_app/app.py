from flask import Flask, request, jsonify
from config import Config
from models import db, Car

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/cars', methods=['GET'])
def get_cars():
    year = request.args.get('year')
    if year:
        cars = Car.query.filter_by(year=year).all()
    else:
        cars = Car.query.all()
    return jsonify([{'id': car.id, 'make': car.make, 'model': car.model, 'year': car.year} for car in cars])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
