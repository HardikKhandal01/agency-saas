# 🚀 AgencySaaS: The Operating System for Modern Agencies

![Version](https://img.shields.io/badge/version-2.0-blue.svg)
![React](https://img.shields.io/badge/Frontend-React_18-cyan.svg)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)
![AI](https://img.shields.io/badge/AI-Generative_Models-purple.svg)

An enterprise-grade, full-stack B2B SaaS platform designed to solve "tool fatigue" for digital marketing agencies. AgencySaaS combines a Kanban CRM, Omnichannel Ad Tracking, and an advanced Learning AI Studio into one seamless, high-performance dashboard.

---

## 🌟 The Vision
Modern digital agencies waste thousands of dollars and hours switching between Hubspot (CRM), Google Ads (Tracking), ChatGPT (Copywriting), and Intercom (Support). **AgencySaaS** is built with a single mission: *To provide one unified Operating System where agencies can manage leads, track ad spends, and generate AI assets under a single roof.*

---

## 🔥 Deep Dive: Platform Features (Module by Module)

### 1. 📊 Dashboard & Smart Notifications
*   **The Hub:** A high-level bird's-eye view of the agency's performance. 
*   **Real-Time Alerts:** Features a custom-built, Apple-styled notification center (Bell Icon) that alerts users about new leads, low campaign budgets, and completed AI tasks.

### 2. 🗂️ Smart Kanban CRM (Leads Management)
*   **Pipeline Tracking:** A highly interactive Drag-and-Drop styled Kanban board (New, In Progress, Won) to track prospective clients.
*   **Client Context:** Replaces messy Excel sheets with a clean UI to monitor which client needs follow-ups and who has successfully onboarded.

### 3. 📈 Omnichannel Campaigns (Google Ads Sync)
*   **API Simulation Engine:** A masterpiece frontend architecture that simulates a real-time Google Ads synchronization.
*   **Budget Pacing:** Visual progress bars alerting the agency if a campaign is exhausting its budget too fast (e.g., 85% spent).
*   **Key Metrics:** Beautiful bento-grid cards displaying ROI, Total Spend, Impressions, and a detailed Keyword Performance Table to track CPC and Conversion Rates.

### 4. 🤖 AI Studio 2.0 (Vision & Memory)
Not just a wrapper, but a highly contextual AI engine:
*   **Brand Memory:** The AI "learns" and remembers the specific tone, target audience, and rules of the agency. Every generated copy uses this context.
*   **Vision AI (Competitor Scan):** Users can upload a screenshot of a competitor's ad. The UI simulates an image scan and prompts the AI to generate a better, high-converting alternative.
*   **Text-to-Image Generation:** Integrated with image generation APIs to instantly create 3D renders, marketing banners, and logos directly within the dashboard.

### 5. 🎙️ AI Voice Receptionist
A futuristic client-support and operational agent:
*   **Real Text-to-Speech:** Configurable voice options (e.g., Sarah US, Marcus UK) utilizing native browser speech synthesis.
*   **Speech-to-Text (Mic Input):** Users can click the microphone to speak their commands, which are transcribed in real-time.
*   **Contextual Chat Interface:** A modern chat UI where the bot can read uploaded images (attachments) and respond to quick digital marketing command chips (e.g., "Analyze today's leads").

---

## 💻 Technical Architecture & Stack

**Frontend (Client-Side):**
*   **Framework:** React.js (Vite) for lightning-fast HMR and optimized builds.
*   **Routing:** React Router DOM v6 with protected private routes.
*   **Styling:** Custom CSS implementing a modern Bento-Grid UI, Apple-standard animations, and glassmorphism effects.
*   **Icons:** Lucide React.
*   **State Management:** React Hooks (`useState`, `useEffect`, `useRef`) + `localStorage` for JWT persistence.

**Backend (Server-Side):**
*   **Framework:** FastAPI (Python) for asynchronous, high-performance API endpoints.
*   **Database:** SQLite mapped with SQLAlchemy (ORM).
*   **Security:** OAuth2 with Password Flow (JWT Bearer Tokens) for secure, stateless authentication.
*   **AI Integration:** RESTful connections to generative models for copy and image rendering.

---

## 🛠️ Local Installation & Setup

Want to run this beast locally? Follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/YourUsername/agency-saas.git
cd agency-saas
```

### 2. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv

# Activate Virtual Environment
# For Windows: venv\Scripts\activate
# For Mac/Linux: source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```
*The backend will now be running on `[http://127.0.0.1:8000](http://127.0.0.1:8000)`*

### 3. Frontend Setup (React/Vite)
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will now be running on `http://localhost:5173`*

---

## 🚀 Future Roadmap
- [ ] **Stripe Integration:** Add automated billing and subscription tiers.
- [ ] **Real Google Ads API:** Replace the simulation with live OAuth2 Google Cloud integration.
- [ ] **WebSockets:** Implement real-time typing indicators and live notifications from the backend.

---
*Crafted with ❤️ by a Full-Stack Developer passionate about scalable SaaS architecture and AI-driven UX.*