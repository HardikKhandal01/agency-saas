from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.session import Base

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    company = Column(String, nullable=True)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    
    # Lead ki monetary value (Jaise: $1200)
    value = Column(Float, default=0.0)
    
    # Kanban column state: "new", "contacted", "closed"
    status = Column(String, default="new") 
    
    # Ye link karega ki ye lead kis agency/user ki hai
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())