from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.sql import func
import enum
from app.db.session import Base

# User Roles define kar rahe hain
class UserRole(str, enum.Enum):
    ADMIN = "admin"       # Super Admin (Tum)
    AGENCY = "agency"     # Jo agency is SaaS ko kharidegi / use karegi
    TEAM = "team"         # Agency ke employees
    CLIENT = "client"     # Agency ke actual clients (Jinhe report/dashboard dikhega)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=True)
    hashed_password = Column(String, nullable=False)
    
    # By default naya user ek Client hoga
    role = Column(Enum(UserRole), default=UserRole.CLIENT)
    is_active = Column(Boolean, default=True)
    
    # Automatically time save karne ke liye
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())