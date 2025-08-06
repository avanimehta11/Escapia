<img src="public/logo.png" alt="Escapia Logo" width="150" height="150" />

# Escapia — Your Digital Travel Planner 



**Escapia** is a modern travel planning web app that helps you explore destinations, visualize them on a globe, and plan trips seamlessly with maps and media. It's built to be fast, beautiful, and easy to use — perfect for wanderlusters and casual travelers alike.

---

## ✨ Features

- 🧭 Interactive 3D globe to explore travel destinations
- 🔍 Location search with OpenCage geocoding
- 🗺️ Map rendering with Leaflet for each location
- 📸 Upload and manage travel media
- 🔐 Secure login with GitHub OAuth
- 📝 Save and revisit planned trips

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: Prisma + PostgreSQL
- **Auth**: Auth.js (OAuth via GitHub)
- **Geocoding**: [OpenCage API](https://opencagedata.com/)
- **Maps**: Leaflet.js
- **Uploads**: UploadThing

---

## 📸 Screenshots & Demo

### 1. Homepage Overview

![Home Page](image-3.png)

### 2. Create Trip Page

_Create your upcoming trip!_

![Create Trips](image-4.png)

### 3. Trip Planning Interface

_Save and manage your planned trips._
![My Trips Page](image-2.png)

### 4. Trip Overview Page

_Visualize and manage your itinerary._
![Japan Trip page](image-1.png)

### 5. Interactive 3D Globe

_Visualize your adventures!_
![Globe Page](image.png)

🎥 **Demo Video:**  
Watch the walkthrough of Escapia on [Loom](https://www.loom.com/share/095f9ff140134914b1274e284e2110ce?sid=74235bb0-6cb3-441d-89fa-13ed24dedb7b)

---

## 🗺️ How Mapping Works

- 🌐 Geocoding is done using the **OpenCage API**, ensuring reliable and international-friendly results.
- 🗺️ Maps are rendered using **Leaflet**, providing a lightweight and customizable mapping experience.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/avanimehta11/escapia
cd escapia
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a .env.local file based on .env.example:

```bash
cp .env.example .env.local
```

Then fill in the following fields:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
AUTH_SECRET=""
UPLOADTHING_TOKEN=""
MAPS_API_KEY=""  # OpenCage API Key
```

### 4. Set Up Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser to get started.
