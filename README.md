# React Chat Application

This is a **React-based Chat Application** built with **Vite**, **React Router**, **MobX**, and **Axios**. It allows users to send and receive messages, maintain unique chats per contact, and persist data in local storage.

## **Tech Stack**
- **Vite** - Fast build tool for modern frontend projects.
- **React** - UI library for building components.
- **React Router** - Client-side routing.
- **MobX** - State management.
- **MobX-React-Lite** - MobX bindings for React.
- **Axios** - HTTP client for API communication.

---

## **Getting Started**

### **1. Clone the Repository**
```sh
git clone https://github.com/adilzhanshukenov/green-api.git
cd green-api
cd green-api-wa
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Start the Development Server**
```sh
npm run dev
```
Then, open [http://localhost:5173/auth/login](http://localhost:5173/auth/login) in your browser.

---

## **Project Structure**
```
/green-api-wa
│── src/
│   │── components/       # Reusable UI components
│   │── pages/            # App pages (Home, Chat, etc.)
│   │── stores/           # MobX stores for state management
│   │── utils/            # API services using Axios
│   │── layouts/          # Layouts for login and main interface
│   │── App.tsx           # Main App component
│   │── main.tsx          # Entry point
│── public/               # Static assets
│── package.json          # Dependencies and scripts
│── vite.config.ts        # Vite configuration
│── README.md             # Project documentation
```

---


## **Available Scripts**

### **Run Development Server**
```sh
npm run dev
```

### **Build for Production**
```sh
npm run build
```

### **Preview Production Build**
```sh
npm run preview
```

### **Format Code (Prettier)**
```sh
npm run format
```

---

## **Features**
- 🟢 **Fast Vite-based setup**
- 🔄 **Client-side routing with React Router**
- 📦 **State management using MobX**
- 🔗 **API calls with Axios**
- 💾 **Local storage support**
- 💬 **WhatsApp-like messaging UI**

---

## **License**
This project is licensed under the MIT License.

