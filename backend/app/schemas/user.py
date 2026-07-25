from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from app.models.user import UserRole

# Shared properties
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

# Properties to receive via API on creation (User Registration)
class UserCreate(UserBase):
    password: str
    role: UserRole = UserRole.AGENCY  # Registration ke time role pass kar sakte hain

# Properties to return via API (Response) - Isme password nahi hai!
class UserResponse(UserBase):
    id: int
    role: UserRole
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True  # SQLAlchemy model ko Pydantic model me convert karne ke liye