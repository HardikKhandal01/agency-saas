from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.session import engine, Base
from app.models import user, lead  # Import kiya taaki tables create ho sake
from app.api.api import api_router  # Router import kiya

# Database Tables automatically create karne ke liye
Base.metadata.create_all(bind=engine)

def create_app() -> FastAPI:
    # 1. App initialize ho raha hai yahan
    app = FastAPI(
        title=settings.app_name,
        description="API for Complete Marketing Agency SaaS",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # 2. CORS (Security) setup
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Yahan aap specific origins bhi specify kar sakte ho
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # 3. Router attach ho raha hai (app create hone ke baad)
    app.include_router(api_router, prefix="/api/v1")

    # 4. App return ho raha hai
    return app

# Yahan create_app() function call hokar final 'app' ban raha hai
app = create_app()

# Base Health Check Route
@app.get("/")
def read_root():
    return {
        "message": "Welcome to Marketing Agency SaaS API",
        "environment": settings.app_env,
        "status": "Healthy and Running 🚀"
    }