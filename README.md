# Feedback Form Application

A modern, responsive feedback form built with Next.js 15, TypeScript, and PostgreSQL that allows users to submit feedback directly to a database using server actions.

## Features

- ⭐ **Star Rating System**: Interactive 5-star rating component
- 📝 **Comprehensive Form**: Name, email, improvement areas, and additional suggestions
- 🗄️ **Database Storage**: Automatic storage in PostgreSQL using Prisma ORM
- 🔄 **Server Actions**: Modern Next.js server actions for form submission
- 📱 **Responsive Design**: Beautiful UI that works on all device sizes
- ✅ **Form Validation**: Client and server-side validation
- 📊 **Admin Panel**: View all submitted feedback at `/admin`
- 🎨 **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Package Manager**: Bun

## Database Schema

The feedback is stored with the following structure:

```prisma
model Feedback {
  id              String   @id @default(cuid())
  name            String
  email           String
  rating          Int      @db.SmallInt
  improvements    String[] // Array of selected improvement areas
  otherSuggestion String?  // Optional additional suggestions
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

## Setup Instructions

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd feedback-form
   bun install
   ```

2. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Update the `DATABASE_URL` with your PostgreSQL connection string

3. **Database Setup**
   ```bash
   bunx prisma generate
   bunx prisma migrate dev --name init
   ```

4. **Run Development Server**
   ```bash
   bun run dev
   ```

5. **Access the Application**
   - Main form: `http://localhost:3000`
   - Admin panel: `http://localhost:3000/admin`

## API Endpoints

### Server Actions

- **`submitFeedback(data)`**: Submits new feedback to the database
- **`getFeedbacks()`**: Retrieves all feedback submissions (used in admin panel)

## Form Fields

1. **Star Rating** (required): 1-5 star rating
2. **Name** (required): User's full name
3. **Email** (required): User's email address
4. **Improvement Areas** (optional): Multiple choice checkboxes for:
   - Topic & Content
   - Accommodation
   - Pacing & Time Management
   - Audience Interaction
   - Logistics
   - No improvements needed
   - Other (with text input)
5. **Additional Suggestions** (optional): Free text for other suggestions

## File Structure

```
src/
├── app/
│   ├── admin/page.tsx          # Admin panel for viewing feedback
│   ├── page.tsx                # Main page with feedback form
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── global/
│   │   └── Feedback-form.tsx   # Main feedback form component
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── actions.ts              # Server actions for database operations
│   ├── prisma.ts               # Prisma client instance
│   └── utils.ts                # Utility functions
└── prisma/
    ├── schema.prisma           # Database schema
    └── migrations/             # Database migrations
```

## Development

- **Linting**: `bun run lint`
- **Build**: `bun run build`
- **Start**: `bun run start`

## Database Operations

### View Database with Prisma Studio
```bash
bunx prisma studio
```

### Reset Database (Development Only)
```bash
bunx prisma migrate reset
```

### Generate Prisma Client
```bash
bunx prisma generate
```

## Production Deployment

1. Set production `DATABASE_URL` in environment variables
2. Run production build: `bun run build`
3. Deploy to your preferred platform (Vercel, Railway, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - See LICENSE file for details
