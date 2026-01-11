# 🌙 Kundalix.AI

**AI‑Powered Vedic Kundali, Horoscope & Event‑Driven Astrology Platform**

Kundalix.AI is a **production‑grade, event‑driven full‑stack application** that blends **Vedic astrology**, **AI‑generated insights**, and **modern orchestration patterns** using **Next.js, Inngest, and Server Actions**.

The system is designed not just to *work*, but to **scale**, **orchestrate long‑running tasks**, and **separate concerns cleanly**—mirroring real‑world backend and system‑design practices.

---

## 🚀 Core Features

* 🔐 **Authentication (NextAuth)**
  Secure session‑based authentication and protected routes.

* 🧾 **Vedic Kundali Generation & Storage**
  Structured kundali data including signs, houses, planets, yogas, and life domains.

* 🌙 **Daily Horoscope (Moon‑Sign Based)**
  Personalized horoscope resolution based on the user’s Moon Sign.

* 🧠 **AI‑Generated Interpretations**
  LLM‑powered explanations and insights with schema‑first prompts.

* ⚙️ **Event‑Driven Orchestration (Inngest)**
  Background workflows for long‑running and async tasks.

* ⚡ **Next.js Server Actions**
  Secure, direct server mutations without excessive API boilerplate.

* 📱 **Installable Progressive Web App (PWA)**
  Installable on mobile and desktop for a native‑like experience.

* 🎨 **Modern Tailwind UI (Mobile‑First)**
  Responsive, dark‑themed, glassmorphism‑inspired interface.

---

## 🧠 Why This Project Is Different

This is **not a CRUD application**.

Kundalix.AI demonstrates:

* Event‑driven system thinking
* Async orchestration using background workflows
* Clear separation of UI, server actions, and business logic
* Real production constraints (serverless runtimes, scraping limitations, auth boundaries)

---

## 🧩 Tech Stack

### Frontend

* **Next.js (App Router)**
* **React**
* **Tailwind CSS**
* **Lucide Icons**

### Backend

* **Next.js API Routes**
* **Next.js Server Actions**
* **NextAuth.js**
* **MongoDB + Mongoose**
* **Cheerio** (serverless‑safe HTML parsing)

### Orchestration

* **Inngest**

  * Background jobs
  * Event‑based workflows
  * Async task execution
  * Retry & failure handling

### AI

* **LLM Integration** (Gemini / OpenAI‑style models)
* Structured, schema‑first prompts

### Deployment

* **Vercel**
* **Node.js Runtime** (explicitly forced where required)

---

## ⚙️ Event‑Driven Architecture (Inngest)

Kundalix.AI uses **Inngest** to orchestrate complex workflows that should **never block the UI**.

### Example Use Cases

* Kundali generation pipelines
* AI interpretation workflows
* Data normalization & enrichment
* Background processing triggered by user actions

### Why Inngest?

* Decouples UI from heavy backend logic
* Handles retries and transient failures
* Enables clean, observable async workflows
* Production‑grade orchestration patterns

---

## ⚡ Server Actions (Next.js)

Instead of routing every mutation through REST endpoints, the project uses **Next.js Server Actions** for:

* Secure server‑side mutations
* Triggering Inngest workflows
* Direct execution on the server
* Reducing client ↔ server boilerplate

### Typical Flow

```text
User Action (UI)
   ↓
Server Action
   ↓
Inngest Event
   ↓
Background Workflow
   ↓
Database Update
```

This approach keeps:

* UI fast
* Logic centralized
* Side‑effects controlled and observable

---

## 🌙 Horoscope Flow (Moon‑Sign Based)

1. User logs in
2. Server Action fetches authenticated session
3. Moon Sign extracted from stored kundali
4. External horoscope source resolved
5. Horoscope fetched server‑side (Node runtime)
6. Content parsed & cleaned
7. Frontend renders only meaningful content

### This avoids

* Client‑side scraping ❌
* CORS issues ❌
* Blocking UI ❌

---

## 🏗️ System Architecture Overview

```text
Client (React / UI)
   ↓
Server Actions
   ↓
Inngest Events
   ↓
Async Workflows
   ↓
MongoDB
```

API routes are used where necessary, but **Server Actions + Events** handle most orchestration.

---

## 📱 Progressive Web App (PWA)

Kundalix.AI is fully installable on:

* Android
* Desktop (Chrome / Edge)
* iOS (Add to Home Screen)

### PWA Stack

* `manifest.json`
* Service Worker
* Install prompt handling
* Custom **Install App** button

Once installed, the app runs in **standalone mode** without browser UI.

---

## 🔐 Authentication & Security

* Session‑based authentication via **NextAuth**
* Protected API routes
* Server Actions scoped to authenticated users
* Strict user‑specific data isolation

---

## 📂 Folder Structure (Simplified)

```text
app/
 ├─ layout.tsx
 ├─ dashboard/
 ├─ horoscope/
 ├─ api/
 │   ├─ me/
 │   └─ horoscope/
 ├─ actions/
 │   └─ kundali-actions.ts
 ├─ inngest/
 │   └─ workflows.ts

components/
 ├─ Navbar.tsx
 ├─ InstallButton.tsx

lib/
 ├─ db.ts
 ├─ models/
```

---

## 🧪 Local Setup

```bash
npm install

NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=your_mongo_uri
INNGEST_EVENT_KEY=your_key

npm run dev
```

---

## ⚠️ Production Considerations

* Serverless‑safe libraries only
* Node runtime forced for external fetches
* No browser‑emulated DOM in production
* Long‑running tasks offloaded to Inngest

---

## 🎯 What This Project Demonstrates

* Full‑stack ownership
* Event‑driven architecture
* Async orchestration
* AI integration with real constraints
* Production debugging & deployment maturity
* Installable, product‑level mindset

This is **system design**, not just feature coding.

---

## 👨‍💻 Author

Built with intent and iteration by **Sabyasachi Panda**
Focused on **AI + Full‑Stack + System Architecture**
