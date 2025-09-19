# Multilingual Dynamic Website Starter 🌍

A **Next.js 15 multilingual website** built with **App Router**, **Tailwind CSS**, and **Markdown/JSON content**.  
This project demonstrates how to structure and deliver a **content-driven dynamic website** that supports multiple languages (EN/FA), centralized design tokens, and SEO best practices.
[![Live Demo](https://img.shields.io/badge/Demo-Heymo.ca-blue?style=for-the-badge&logo=vercel)](https://heymo.ca)



---

## 🔑 Overview
This repository is not just a template — it’s a **production-ready starter** showing how to build dynamic, multilingual websites without relying on heavy CMS platforms.

Core highlights:
- 🌐 **Internationalization (i18n)** – EN/FA support with dictionary JSON files and middleware redirects.
- 📝 **Markdown/JSON content system** – Blog posts, programs, and static pages are written in Markdown or JSON, compiled at build time.
- 🎨 **Centralized theming** – `theme.ts`, `formStyles.ts`, and Tailwind config manage design tokens (colors, typography, spacing).
- ⚡ **Next.js 15 App Router** – Modern React features, streaming, server actions.
- 🔍 **SEO-ready** – per-page metadata, hreflang alternates, sitemap/robots.
- 🧩 **Reusable UI components** – HeroSection, FormWrapper, LogoMarquee, ProductGrid.

---

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router, TypeScript, Turbopack)
- **Styling**: Tailwind CSS, design tokens (`theme.ts`, `globals.css`)
- **Content Layer**: Markdown (MD/MDX), JSON dictionaries
- **i18n**: Custom middleware + dictionary-based translations
- **UI**: shadcn/ui components + custom reusable blocks
- **Deployment**: Vercel (Edge Middleware, Analytics)

---

## ✨ Features
- Fully **bilingual** (English + Persian) with middleware redirect (`/ → /en`).
- Dynamic content from Markdown & JSON:
  - `content/{locale}/blog/*.md`
  - `content/{locale}/programs.json`
  - `dictionaries/en.ts` / `fa.ts`
- Hero section with animated background + CTAs.
- Centralized form & button styling (via `formStyles.ts`).
- SEO metadata per page, structured data, sitemap.ts & robots.ts.
- Mobile-first responsive design.

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/<your-username>/<repo>.git
cd <repo>
npm install
npm run dev
