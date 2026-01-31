# Deployment Guide for Your Contact Form App

## Frontend (React) → Netlify
## Backend (Django) → Render.com (Free)

---

## Step 1: Deploy Django Backend to Render

### 1.1 Create Render Account
- Go to https://render.com and sign up

### 1.2 Prepare Django for Production

**Create `Procfile`:**
```
web: gunicorn contact_backend.wsgi
```

**Update `contact_backend/settings.py`:**
```python
import os
import dj_database_url

# Security for production
DEBUG = os.getenv('DEBUG', 'False') == 'True'
SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')

ALLOWED_HOSTS = ['*']

# Database - Use PostgreSQL on Render
DATABASES = {
    'default': dj_database_url.config(
        default='sqlite:///db.sqlite3',
        conn_max_age=600
    )
}

# CORS - Allow your Netlify domain
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://your-app.netlify.app",  # Update with your actual domain
]
```

### 1.3 Deploy to Render

1. Push code to GitHub
2. On Render, click "New +" → "Web Service"
3. Connect your GitHub repo
4. Set these environment variables:
   - `DEBUG`: False
   - `SECRET_KEY`: (generate a new one)
   - `DATABASE_URL`: (Render auto-provides this)

5. Build Command: `pip install -r requirements.txt && python manage.py migrate`
6. Start Command: `gunicorn contact_backend.wsgi`

### 1.4 Get Your Backend URL
- After deployment, you'll get a URL like: `https://your-app.onrender.com`
- Copy this URL

---

## Step 2: Update Frontend to Use New Backend URL

### 2.1 Update Contact.tsx
Replace `http://localhost:8000` with your Render URL:

```typescript
const response = await fetch('https://your-app.onrender.com/api/contact-messages/', {
```

Or create a `.env` file:
```
VITE_API_URL=https://your-app.onrender.com
```

Then use:
```typescript
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact-messages/`, {
```

### 2.2 Build React App
```bash
npm run build
```

---

## Step 3: Deploy Frontend to Netlify

1. Go to https://netlify.com and sign up
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the `dist` folder (created by `npm run build`)
4. Set build command: `npm run build`
5. Publish directory: `dist`

Done! 🎉

---

## Troubleshooting

**CORS Error?**
- Check `CORS_ALLOWED_ORIGINS` includes your Netlify domain
- Restart the Render service

**Database not saving?**
- Make sure migrations ran on Render
- Check logs on Render dashboard

**Frontend can't reach backend?**
- Check the URL in Contact.tsx matches your Render domain
- Make sure backend is running on Render dashboard
