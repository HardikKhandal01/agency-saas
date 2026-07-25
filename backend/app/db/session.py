from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# Engine database ke sath connection banata hai
# SQLite use karte waqt "check_same_thread": False zaroori hota hai
engine = create_engine(
    settings.database_url, 
    connect_args={"check_same_thread": False} if "sqlite" in settings.database_url else {}
)

# SessionLocal database ke sath actual query execute karne ke kaam aayega
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class jisse humare sabhi database models (Tables) inherit honge
Base = declarative_base()

# Ye dependency function hum FastAPI routes me use karenge
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()