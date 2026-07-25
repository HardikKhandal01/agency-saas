import os
from pydantic_settings import BaseSettings, SettingsConfigDict

# Root directory ka path nikalna taaki baahar wali .env file read ho sake
# app/core/config.py -> app/core -> app -> backend -> root (marketing-agency-saas)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
ENV_FILE_PATH = os.path.join(BASE_DIR, ".env")

class Settings(BaseSettings):
    # .env file se aane wale variables
    app_name: str = "Marketing Agency SaaS"
    app_env: str = "development"
    frontend_url: str = "http://localhost:5173"
    
    # Database Settings
    database_url: str
    
    # Security Settings
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int
    gemini_api_key: str | None = None  # Optional, agar Gemini integration nahi karna to None rehne do
    model_config =SettingsConfigDict(env_file=ENV_FILE_PATH, extra="ignore")

    # Pydantic config taaki wo .env file ko load kare
    model_config = SettingsConfigDict(env_file=ENV_FILE_PATH, extra="ignore")

# Settings ka instance banayenge jise hum pure project me import karenge
settings = Settings()