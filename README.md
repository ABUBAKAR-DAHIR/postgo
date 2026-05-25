# PostGo

<p align="center">
  <img src="public/logo.svg" alt="PostGo Logo" width="250"/>
</p>

A modern fullstack content management platform built with **Next.js** for creating, editing, and publishing rich blog posts with a powerful editor, authentication, and category system.

**🌐LIVE DEMO**: [postgo](https://postgo-two.vercel.app)

## Status

This project is currently in active development.

## Vision

PostGo aims to become a complete publishing system with:

- Rich text blog post creation
- SEO-friendly URLs and metadata support
- Category and tag system
- Secure authentication with Kinde
- Media upload support (images via S3)
- Draft, scheduled, and published posts
- Admin dashboard for content management
- Comment system (planned)

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Editor:** Tiptap rich text editor
- **State Management:** React Query (@tanstack/react-query)
- **Backend:** Next.js Server Actions + API Routes
- **Database:** PostgreSQL with Prisma ORM hosted on Neon
- **Auth:** Kinde Authentication
- **Storage:** AWS S3 (for media uploads)
- **UI/UX:** shadcn/ui components, web haptics
- **Notifications:** Sonner toast system

## 📂 Project Structure
```text
postgo/
│
├── app/                            # App Router directory
│   ├── api/
│   │   ├── auth/
│   │   ├── posts/
│   │   └── comments/
│   │
│   ├── dashboard/                  # Admin dashboard
│   │   ├── create-post/
│   │   ├── Sidebar.tsx
│   │   ├── DashboardHeader.tsx
│   │   └── page.tsx
│   │
│   ├── login/
│   ├── auth-callback/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/                     # Reusable UI components
│   ├── ui/                         # shadcn UI components
│   ├── Editor.tsx
│   ├── CustomInput.tsx
│   ├── AuthProvider.tsx
│   ├── QueryProvider.tsx
│   ├── ThemeProviderComponent.tsx
│   ├── TopPostCard.tsx
│   ├── TopCommentCard.tsx
│   └── DashComponent.tsx
│
├── lib/
│   ├── prisma.ts                   # Prisma client
│   ├── S3Client.ts                 # AWS S3 upload logic
│   └── utils.ts
│
├── hooks/
│   └── theme.ts
│
├── prisma/                         # Database schema
│
├── public/
│   ├── dashboard/
│   ├── icons/
│   ├── logo.svg
│   └── img.png
│
├── types/
│   └── types.ts
│
├── actions/
│   └── posts.action.ts
│
├── .gitignore
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
└── README.md

```



## Getting Started

1. **Clone the project**
   ```bash
   git clone https://github.com/ABUBAKAR-DAHIR/postgo.git
   cd postgo
   ```
2. **Install dependencies**
   ```bash
   pnpm install
   pnpm dev
   ```
3. **Open the project in localhost**
   open http://localhost:3000 in your browser

## Scripts
- pnpm dev - Start development server
- pnpm build - Build for production
- pnpm start - Start production server
- pnpm lint - Run ESLint

## 👤 Author

Built as part of **[Graphicshaala](https://graphicshaala.com) Internship**.

## 📄 License

This project is proprietary!
