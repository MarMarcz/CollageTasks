import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI', 'sqlite:///cars.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
