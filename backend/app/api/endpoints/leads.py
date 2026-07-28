from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.models.lead import Lead
from app.schemas.lead import LeadCreate, LeadResponse
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=LeadResponse)
def create_lead(
    lead_in: LeadCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user) # Protected Route!
):
    """Nayi Lead create karne ki API"""
    
    # Data me owner_id add karna taaki pata rahe ye lead kiski hai
    db_lead = Lead(**lead_in.model_dump(), owner_id=current_user.id)
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    
    return db_lead

@router.put("/{lead_id}")
def update_lead(
    lead_id: int,
    lead_in: schemas.LeadCreate, # 👈 Note: Jo schema tumhari POST request me (jaise LeadCreate) use hua hai, exact wahi yahan daalna
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
    # 1. Purani lead dhoondho
    lead = db.query(models.Lead).filter(models.Lead.id == lead_id, models.Lead.owner_id == current_user.id).first()
    
    # Agar na mile toh 404 error
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
        
    # 2. Naya data update karo
    lead.name = lead_in.name
    lead.company = lead_in.company
    lead.email = lead_in.email
    lead.value = lead_in.value
    lead.status = lead_in.status
    
    # 3. Database me save karo
    db.commit()
    db.refresh(lead)
    
    return lead

@router.get("/", response_model=List[LeadResponse])
def get_leads(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user) # Protected Route!
):
    """Current User ki saari leads fetch karne ki API"""
    
    # Sirf wahi leads filter hongi jinka owner_id current user ka hai
    leads = db.query(Lead).filter(Lead.owner_id == current_user.id).all()
    return leads