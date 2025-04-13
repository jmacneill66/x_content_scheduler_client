# 🧠 X Content Scheduler — Front-End Client

This is the desktop front-end for the **X Content Scheduler**, a tool to draft, schedule, and publish content to [X.com](https://x.com) using an Electron + React stack.
Project is still under development (i.e. Electron UI functionality)

## 🚀 Tech Stack

- **Electron** — Desktop app shell
- **React + TypeScript** — UI layer
- **Vite** — Ultra-fast bundler and dev server
- **Tailwind CSS** — Modern utility-first styling
- **WebSocket** — Real-time post updates
- **Axios** — API communication

---

## 📁 Project Structure

```
src/
├── components/         # UI: PostForm, PostList, etc.
├── services/           # API + WebSocket clients
│   ├── api.ts
│   └── websocket.ts
├── App.tsx             # Root React component
├── main.tsx            # React + Vite entry
├── index.css           # Tailwind setup
ui/electron/
├── main.ts             # Electron main process
├── preload.ts          # Secure IPC (optional)
```

---

## 🛠️ Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app in dev mode (Electron + Vite)

```bash
npm run dev
```

This will:
- Start Vite on [http://localhost:5173](http://localhost:5173)
- Launch Electron and load the Vite app inside a native window

---

## 🔧 Environment Variables

Create a `.env` file with:

```
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws
```

---

## 🔨 Build for Production

```bash
npm run build
```

Then:

```bash
npm run start
```

To launch the built Electron app with compiled assets.

---

## 🧪 Features

- ✍ Draft posts with text, media, and schedule
- 📡 Real-time updates via WebSocket
- 🖼️ Drag-and-drop media uploads (optional)
- ⚡ Inline post editing
- 📆 Live status syncing from Celery backend

---

## 🧙 Author

Jeff MacNeill

---

## 📜 License

MIT
