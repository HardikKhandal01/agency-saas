from fastapi import APIRouter, Depends, HTTPException
from app.schemas.ai import AIGenerateRequest, AIGenerateResponse
from app.api.deps import get_current_user
from app.models.user import User
from app.core.config import settings
import google.generativeai as genai

router = APIRouter()

@router.post("/generate", response_model=AIGenerateResponse)
async def generate_content(
    request: AIGenerateRequest,
    current_user: User = Depends(get_current_user)
):
    # Professional Mock Response jo UI me ekdum real lagega
    fallback_text = f"🚀 **[AI GENERATED MOCK]**\n\nHere is your **{request.tone}** content for **{request.content_type}** about '{request.topic}'.\n\n1. **Headline:** Supercharge Your Workflow Today!\n2. **Description:** Stop wasting time. Automate your agency with our powerful AI tools.\n3. **Keywords:** SaaS, Marketing, Automation."

    if not settings.gemini_api_key:
        return AIGenerateResponse(result=fallback_text)

    try:
        genai.configure(api_key=settings.gemini_api_key)
        prompt = f"Act as an expert marketing copywriter for an agency. Generate high-quality {request.content_type} based on the following topic/product: '{request.topic}'. The tone of voice must be strictly {request.tone}. Format the output cleanly with appropriate headings or bullet points."
        
        try:
            # Try 1: Latest Model
            model = genai.GenerativeModel('gemini-1.5-flash')
            response = model.generate_content(prompt)
            return AIGenerateResponse(result=response.text)
        except Exception as e1:
            print(f"Model 1.5 failed, trying fallback model... Error: {e1}")
            try:
                # Try 2: Older Stable Model
                model = genai.GenerativeModel('gemini-1.0-pro')
                response = model.generate_content(prompt)
                return AIGenerateResponse(result=response.text)
            except Exception as e2:
                print(f"Model 1.0 failed too... Error: {e2}")
                # Try 3: Agar Google fail ho jaye, toh App crash nahi hogi, Fallback text de degi!
                return AIGenerateResponse(result=fallback_text)

    except Exception as e:
        print(f"Fatal AI Error: {e}")
        # Return fallback instead of 500 Error
        return AIGenerateResponse(result=fallback_text)