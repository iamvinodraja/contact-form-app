# Django API Setup for Contact Form

## ✅ What's Been Set Up

A complete Django REST API backend has been created to handle your contact form submissions. Form data is now saved to a database and can be retrieved from the Django admin panel.

## 📁 Project Structure

```
app 2/
├── contact_backend/          # Django project settings
├── contacts/                 # Django app for contact management
│   ├── models.py            # ContactMessage model
│   ├── serializers.py       # API serializer
│   ├── views.py             # API viewset
│   ├── urls.py              # API routes
│   └── migrations/          # Database migrations
├── manage.py                # Django management script
├── db.sqlite3              # SQLite database (auto-created)
└── backend_env/            # Python virtual environment
```

## 🚀 How to Start the Backend

1. **Activate the virtual environment:**
   ```bash
   cd "/Users/vinod-raja/Downloads/app 2"
   source backend_env/bin/activate
   ```

2. **Start the Django development server:**
   ```bash
   python manage.py runserver
   ```
   
   The API will run on: `http://localhost:8000`

## 📊 API Endpoints

- **POST** `/api/contact-messages/` - Create a new contact message
- **GET** `/api/contact-messages/` - Retrieve all contact messages
- **GET** `/api/contact-messages/all_messages/` - Alternative endpoint to get all messages

### Example Request (cURL):
```bash
curl -X POST http://localhost:8000/api/contact-messages/ \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Hello!"}'
```

## 👨‍💼 Django Admin Panel

To view and manage all contact submissions:

1. Create a superuser account:
   ```bash
   python manage.py createsuperuser
   ```

2. Access admin panel: `http://localhost:8000/admin/`

## 🔧 Frontend Configuration

The React Contact.tsx has been updated to send data to:
```
http://localhost:8000/api/contact-messages/
```

Make sure both servers are running:
- React dev server: `npm run dev` (port 5173)
- Django server: `python manage.py runserver` (port 8000)

## 📋 Database Details

- **Database Type:** SQLite
- **Database File:** `db.sqlite3`
- **Model:** ContactMessage
  - Fields: name, email, message, created_at, updated_at

## ⚙️ Configuration Files Modified

- `contact_backend/settings.py` - Added apps and CORS settings
- `contact_backend/urls.py` - Added API routes
- `src/sections/Contact.tsx` - Updated form submission logic

## 🛠️ Troubleshooting

**Error: "Connection refused" when submitting form?**
- Make sure Django server is running: `python manage.py runserver`

**Error: CORS issue?**
- CORS is already configured for localhost ports (3000, 5173, 8000)

**Database locked?**
- Stop all Django processes and delete `db.sqlite3`, then run migrations again
