from passlib.context import CryptContext

# Bcrypt algorithm use kar rahe hain password hash karne ke liye
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Check karega ki user ka dala hua password aur database ka hash match kar raha hai ya nahi"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Naye password ko secure hash me convert karega"""
    return pwd_context.hash(password)