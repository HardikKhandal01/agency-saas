from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# Shared properties
class LeadBase(BaseModel):
    name: str
    company: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    value: Optional[float] = 0.0
    status: Optional[str] = "new"

# Frontend se lead banate waqt jo data aayega
class LeadCreate(LeadBase):
    pass

# API jo data frontend ko wapas bhejegi
class LeadResponse(LeadBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True