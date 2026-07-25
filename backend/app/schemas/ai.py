from pydantic import BaseModel

class AIGenerateRequest(BaseModel):
    content_type: str
    topic: str
    tone: str

class AIGenerateResponse(BaseModel):
    result: str