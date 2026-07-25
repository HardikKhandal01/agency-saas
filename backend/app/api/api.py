from fastapi import APIRouter
from app.api.endpoints import auth, leads, ai #leads and ai import kiya

api_router = APIRouter()

# Auth wali saari routes ko /auth prefix ke sath add kar diya
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
# Leads wali saari routes ko /leads prefix ke sath add kar diya
api_router.include_router(leads.router, prefix="/leads", tags=["Leads"])
# AI wali saari routes ko /ai prefix ke sath add kar diya
api_router.include_router(ai.router, prefix="/ai", tags=["AI Studio"])