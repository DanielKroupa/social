# Next.js Social Media Application

Light-weight social media application built with Next.js 15, featuring a clean UI, dark mode support, and secure authentication.

## 🌟 Features

- **Authentication** - Secure user authentication powered by Clerk
- **Dark/Light Mode** - System-aware theme switching with local storage persistence
- **Responsive Design** - Full mobile and desktop responsive layout
- **Real-time Updates** - Dynamic content loading and updates
- **Modern UI** - Clean interface built with Tailwind CSS
- **TypeScript** - Type-safe code implementation
- **Database Integration** - MySQL database with Prisma ORM

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Clerk](https://clerk.dev/) - Authentication
- [Prisma](https://www.prisma.io/) - Database ORM
- [MySQL](https://www.mysql.com/) - Database

## 📦 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── profile/           # Profile pages
│   ├── settings/          # Settings pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── feed/             # Feed related components
│   ├── leftMenu/         # Left sidebar components
│   └── rightMenu/        # Right sidebar components
├── context/              # React Context providers
└── lib/                  # Utility functions and configs
```

## 🚀 Getting Started

1. Clone the repository

```bash
git clone https://github.com/yourusername/next-social.git
cd next-social
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables
   Create a `.env` file in the root directory and add:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Database
DATABASE_URL="mysql://user:password@localhost:3306/your_database_name"

# Webhook Secret
WEBHOOK_SECRET=your_webhook_secret
```

4. Set up the database

```bash
npx prisma migrate dev
```

5. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Features in Detail

### Authentication

- Secure sign-up and sign-in with Clerk
- Protected routes and API endpoints
- User profile management

### Theme System

- Automatic system theme detection
- Manual theme toggle
- Persistent theme preference
- Smooth theme transitions

### User Interface

- Responsive navigation
- Mobile-friendly design
- Custom components for posts, stories, and user interactions
- Real-time notifications

### Database Schema

- User profiles
- Posts and comments
- Likes and interactions
- Friend relationships
- Stories

## 📄 License

This project is [MIT](LICENSE) licensed.
