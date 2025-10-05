# 🚀 Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

It uses **[PGLite](https://electric-sql.com/docs/pglite)** — a lightweight, embedded PostgreSQL server — as the local development database.  
PGLite runs entirely in Node.js (and even in the browser), making it perfect for quick setups, testing, and local development **without needing a standalone PostgreSQL installation**.

---

## 🧑‍💻 Getting Started

### 1. Run the Development Server

Start the development server with **Turbopack** (a faster bundler for Next.js):

```bash
bun run dev
# or
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.  
The app automatically reloads when you edit a file.

---

### 2. Database Development Mode

Run both the **local PGLite database server** and the **Next.js dev server** together:

```bash
bun run dev:db
```

This command:

- Starts a **PGLite** database instance on port `5433`.
- Loads your `DATABASE_URL` automatically.
- Launches the Next.js development server once the database is ready.

💡 **PGLite** is used as a lightweight, embedded PostgreSQL replacement for local development — no Docker or external DB setup required.

---

### 3. Generate Better Auth Schema

Generate the authentication schema for [Better Auth](https://www.better-auth.com):

```bash
bun run db:auth:schema
```

This outputs the generated schema file to:

```
./src/db/schema/auth-schema.ts
```

You can modify it later to extend user or session models.

---

### 4. Generate Drizzle Migrations

Generate new Drizzle migration files based on your schema definitions:

```bash
bun run db:generate
```

This creates SQL migration files in your Drizzle output folder (usually `./drizzle`).

---

### 5. Run Database Migrations

Apply all pending database migrations to your **PGLite** database:

```bash
bun run db:migrate
```

This command:

- Starts the PGLite server if it’s not already running.
- Runs all pending Drizzle migrations.
- Keeps your local schema up to date.

---

### 6. Start Local Database Server

Start only the **PGLite** database server manually:

```bash
bun run db
```

This command:

- Uses the local `./data` directory for file persistence.
- Exposes the database on port `5433`.
- Makes it easy to inspect or connect manually from your app or tools.

---

### 7. Email Development Preview

Start the **email component preview server** for developing and testing email templates:

```bash
bun run email:dev
```

This command:

- Launches the local email preview UI.
- Serves all email templates found in `src/components/emails`.
- Allows live reloading while editing `.tsx` email components.

---

### 8. Build for Production

Build the app for production using **Turbopack**:

```bash
bun run build
```

This compiles and optimizes your Next.js application for deployment.

---

### 9. Start Production Server

Start the production server after building:

```bash
bun run start
```

Your app will be available at [http://localhost:3000](http://localhost:3000).

---

### 10. Lint the Project

Run ESLint to check your code for potential issues:

```bash
bun run lint
```

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) — Explore features and APIs.
- [Drizzle ORM Docs](https://orm.drizzle.team/docs) — Learn about schema and migrations.
- [Better Auth Docs](https://www.better-auth.com/docs) — Configure authentication easily.
- [PGLite Docs](https://electric-sql.com/docs/pglite) — Learn about the embedded PostgreSQL server used in this project.
- [React Email Docs](https://react.email/docs) — Learn more about building and previewing email templates.
