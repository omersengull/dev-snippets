![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

# 🧩 DevSnippets - Modern Code Sharing Hub
DevSnippets is a modern hub for developers to showcase their code genius. Securely store, share with beautiful themes, and discover community insights. Built for developers, by developers in a sleek, dark-themed environment.

🚀 **[View Live Demo](https://dev-snippets-eta.vercel.app/)**

---

## 📸 Screenshots

| | |
| :---: | :---: |
| <img src="./public/Screenshots/LandingPage.png" width="400"> | <img src="./public/Screenshots/CreateSnippetPage.png" width="400"> |
| <img src="./public/Screenshots/ExplorePage.png" width="400"> | <img src="./public/Screenshots/SnippetPage.png" width="400"> |
| <img src="./public/Screenshots/AuthModal.png" width="400"> | |

---

## ✨ Features

- 🎨 **Syntax Highlighting:** Beautiful code rendering with React Syntax Highlighter & Prism.js, supporting 22+ languages.

- 🔐 **Secure Auth:** Sign in with OAuth to manage your personal snippet collection.

- 🌍 **Public & Private Snippets:** Control visibility — share with the community or keep it private.

- 🔍 **Explore & Discover:** Browse and filter community snippets by language, category, and more.

- 📋 **Instant Copy:** One-click copy to clipboard with smooth visual feedback via React Hot Toast.

- 📱 **Fully Responsive:** Flawless experience across all screen sizes.

- ⚡ **Fast & Modern:** Built on Next.js App Router with server components for optimal performance.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (App Router), React, Tailwind CSS, Lucide React
- **Backend:** Next.js API Routes, Supabase (PostgreSQL)
- **Language:** TypeScript
- **Auth:** OAuth (via Supabase Auth)
- **Code Rendering:** React Syntax Highlighter, Prism.js
- **Notifications:** React Hot Toast
- **Deployment:** Vercel

---

## ⚙️ Installation

**1. Clone the repository:**
```bash
git clone https://github.com/omersengull/dev-snippets.git
```

**2. Install dependencies:**
```bash
bun install  # or npm install
```

**3. Set up environment variables:**

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**4. Run the development server:**
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

This project is licensed under the MIT License.
