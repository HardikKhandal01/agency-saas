from datetime import datetime, timedelta
from typing import Optional
from jose import jwt
from app.core.config import settings

def create_access_token(subject: str, expires_delta: Optional[timedelta] = None) -> str:
    """User ke liye ek secure JWT access token generate karta hai"""
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        # Default expiry `.env` file se li jayegi
        expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    
    # Token me hum data ('sub' = subject = email/user_id) aur expiry time bhejte hain
    to_encode = {"exp": expire, "sub": str(subject)}
    
    # Token ko encode aur sign karna
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    
    return encoded_jwt