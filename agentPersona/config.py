# Flask 설정
import os
from dotenv import load_dotenv

load_dotenv()
DB_PASSWORD = os.getenv("DB_PASSWORD")

# SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://admin:{DB_PASSWORD}@tamtam-db.cj2y4auwm7gh.ap-northeast-2.rds.amazonaws.com:3306/tamtamdb5'
SQLALCHEMY_DATABASE_URI ='sqlite:///C:/codespace/projects/capstone/data/testdb.sqlite'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")
SESSION_COOKIE_SECURE = False
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
PERMANENT_SESSION_LIFETIME = 3600  # 1시간
