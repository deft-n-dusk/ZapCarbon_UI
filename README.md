# 🌱 ZapCarbon – Track the Path You Leave

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20Here-brightgreen?style=for-the-badge&logo=vercel)](https://zap-carbon-ui.vercel.app/)
[![React](https://img.shields.io/badge/Frontend-React%20(Vite)%20%2B%20Tailwind-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-brightgreen?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)
[![Deployment](https://img.shields.io/badge/Deployed%20On-Vercel%20%26%20Render-black?style=for-the-badge&logo=vercel)](https://zap-carbon-ui.vercel.app/)

ZapCarbon is a **MERN Stack carbon footprint tracker** that helps individuals monitor and reduce their **CO₂ emissions**.  
It allows users to **log activities, calculate emissions using Indian government (CEA) factors, track totals visually, and analyze patterns over time**.  

---

## ✨ Why ZapCarbon?

- **Real-world Impact** – Encourages eco-conscious living by quantifying your environmental footprint.  
- **Accurate Data** – Emission calculations based on **official Indian Central Electricity Authority (CEA)** factors.  
- **Clean UI + Engaging Analytics** – Interactive charts, history logs, and responsive design make it user-friendly.  
- **Scalable MERN Architecture** – Built for production deployment and portfolio-ready.

---

## 🚀 Live Demo  
👉 [**ZapCarbon is Live Here**](https://zap-carbon-ui.vercel.app/)

---

## 🔥 Key Features

- **Authentication (JWT + Cookies)**  
  - Secure login and signup system.

- **Activity Tracking (15 Choices)**  
  - Log activities like *Car Travel, Flights, LPG, Coal, Water, Meat, Paper, Public Transport,* etc.
  - Enter amount (km, kg, kWh) → See **CO₂ emission instantly**.

- **Interactive Dashboard**  
  - View individual emissions per activity.
  - Get **real-time results** using CEA-backed emission factors.

- **Analytics Summary Page**  
  - **Pie Chart:** Emission breakdown by activity.  
  - **Line Chart:** Emission trends over time.  
  - **Total Emissions Counter**.

- **Activity History (Paginated)**  
  - Complete record of all activities with:
    - Date  
    - Activity Type  
    - Input Value  
    - Emission (kg CO₂e)

- **Fully Responsive & Minimalist UI**  
  - Powered by Tailwind CSS with soft color palettes for a clean look.

---

## 🖼️ Screenshots

| Dashboard | Activity Selection | Emission Result |
|-----------|--------------------|-----------------|
| ![Dashboard](./screenshots/Screenshot-446.png) | ![Activity Selection](./screenshots/Screenshot-447.png) | ![Result](./screenshots/Screenshot-448.png) |

| Summary Page | Activity History | Auth Pages |
|--------------|------------------|------------|
| ![Summary](./screenshots/Screenshot-449.png) | ![History](./screenshots/Screenshot-450.png) | ![Auth](./screenshots/Screenshot-453.png) |

---

## 🛠️ Tech Stack

### **Frontend**
- React (Vite)
- Tailwind CSS  
- Chart.js (for Pie and Line Charts)

### **Backend**
- Node.js  
- Express.js  
- JWT for authentication (with cookies)

### **Database**
- MongoDB Atlas (Cloud)

### **Deployment**
- **Frontend:** Vercel  
- **Backend:** Render  

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/zapcarbon.git
cd zapcarbon

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd ../backend
npm install
npm start
