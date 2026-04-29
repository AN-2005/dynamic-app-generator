# 🚀 Dynamic App Generator (Config Driven)

A full-stack **config-driven mini app generator** built using **Next.js, Prisma, and PostgreSQL (Supabase)**.

This project dynamically renders forms, tables, and features based on a JSON configuration — allowing rapid app creation without hardcoding UI.

---

## 🔥 Live Demo
👉 https://dynamic-app-generator-kappa.vercel.app/

---

## 🧠 Core Idea

Instead of writing UI manually, this system:
- Reads a JSON config
- Generates forms dynamically
- Stores data in database
- Displays data in tables
- Supports extensions like CSV import/export

---

## ⚙️ Tech Stack

- **Frontend:** Next.js (App Router)
- **Backend:** API Routes (Next.js)
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Styling:** Tailwind CSS

---

## 📦 Features Implemented

### ✅ 1. Config-Driven UI (Core Feature)
- Forms generated dynamically from config
- Tables rendered dynamically
- Fully reusable architecture

---

### ✅ 2. CSV Import System
- Upload CSV file
- Parse data in browser
- Send to backend
- Store in database
- Automatically reflected in UI

---

### ✅ 3. CSV Export
- Export table data to CSV
- Handles empty data safely
- Download ready file

---

### ✅ 4. Search & Filter
- Search across all fields
- Real-time filtering

---

### ✅ 5. Responsive UI
- Mobile-friendly layout
- Clean modern UI with Tailwind

---

## 📁 Project Structure
dynamic-app/
│── app/
│ ├── api/
│ │ └── data/[collection]/route.ts
│ ├── page.tsx
│
│── components/
│ ├── FormRenderer.js
│ ├── TableRenderer.js
│ ├── CSVUploader.js
│ └── Toast.js
│
│── prisma/
│ └── schema.prisma
│
│── config/
│ └── app.json
│
│── .env
│── package.json

---

## ⚡ How It Works

1. Config file (`app.json`) defines UI
2. FormRenderer reads config → builds form
3. Data submitted → API → Prisma → DB
4. TableRenderer fetches → displays data
5. CSV Import adds bulk data
6. CSV Export downloads data

---

## 🧪 Sample Config

```json
{
  "pages": [
    {
      "type": "form",
      "collection": "users",
      "fields": [
        { "name": "name", "type": "text" },
        { "name": "email", "type": "email" }
      ]
    },
    {
      "type": "table",
      "collection": "users"
    }
  ]
}
---

## 🛠️ Setup Instructions

```bash
git clone https://github.com/YOUR_USERNAME/dynamic-app-generator.git
cd dynamic-app-generator
npm install
```

Create `.env` file:

```
DATABASE_URL=your_database_url
```

Run project:

```bash
npx prisma generate
npx prisma db push
npm run dev
```
---

## ⚠️ Edge Cases Handled

- Handles empty data safely
- Prevents crash when no records exist
- Ignores invalid CSV rows
- Safe API error handling using try/catch
---

## 🎥 Demo Video

👉 https://www.loom.com/share/d34e527f21d54dbf95f2b09ecebd0671
