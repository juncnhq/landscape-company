# Database Setup Guide

Stack: **PostgreSQL** + **Prisma ORM** (v7 with `@prisma/adapter-pg`)

---

## Local Development (Docker)

### 1. Start PostgreSQL with Docker Compose

```bash
docker compose up -d
```

This spins up PostgreSQL on port **5433** (avoids conflict with any local Postgres on 5432).

Credentials:
- User: `landscape`
- Password: `landscape123`
- Database: `landscape_company`
- Port: `5433`

### 2. Configure environment

Create `.env` in the project root (already committed as a template):

```env
DATABASE_URL="postgresql://landscape:landscape123@localhost:5433/landscape_company?schema=public"
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run migrations

```bash
npx prisma migrate deploy
```

This applies all migrations in `prisma/migrations/` to the database.

### 5. Generate Prisma client

```bash
npx prisma generate
```

> **Note:** `npx prisma migrate deploy` automatically runs generate, but run it manually if you only pulled schema changes without migrating.

### 6. Verify

```bash
npx prisma studio
```

Opens a browser UI at `http://localhost:5555` to inspect the database.

---

## Server / Production

### 1. Install PostgreSQL

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

**Check version:**

```bash
psql --version
```

### 2. Create database user and database

```bash
sudo -u postgres psql
```

Inside the psql prompt:

```sql
CREATE USER landscape WITH PASSWORD 'your_strong_password_here';
CREATE DATABASE landscape_company OWNER landscape;
GRANT ALL PRIVILEGES ON DATABASE landscape_company TO landscape;
\q
```

### 3. Configure environment

On the server, set the `DATABASE_URL` environment variable. Use your server's actual host/IP:

```env
DATABASE_URL="postgresql://landscape:your_strong_password_here@localhost:5432/landscape_company?schema=public"
```

> Production uses port **5432** (default). The `5433` in local dev is only to avoid conflicts with a local Postgres installation.

Set this in your deployment environment:
- **Vercel / Railway / Render**: Add `DATABASE_URL` in the project's environment variable settings
- **VPS / self-hosted**: Add to `/etc/environment`, `.env.production`, or your process manager config (PM2, systemd)
- **Docker on server**: Pass via `-e DATABASE_URL=...` or `docker-compose.yml` env section

### 4. Allow remote connections (VPS only)

If your Next.js app and PostgreSQL are on separate machines, edit `pg_hba.conf`:

```bash
sudo nano /etc/postgresql/*/main/pg_hba.conf
```

Add a line for your app server IP:

```
host  landscape_company  landscape  <app-server-ip>/32  md5
```

Then edit `postgresql.conf` to listen on all interfaces (or the specific IP):

```bash
sudo nano /etc/postgresql/*/main/postgresql.conf
```

```
listen_addresses = '*'
```

Restart PostgreSQL:

```bash
sudo systemctl restart postgresql
```

### 5. Run migrations on server

```bash
npx prisma migrate deploy
```

Run this as part of your deployment pipeline — after pulling new code and before starting the app.

### 6. Generate Prisma client

```bash
npx prisma generate
```

---

## Common Commands

| Task | Command |
|------|---------|
| Apply all pending migrations | `npx prisma migrate deploy` |
| Create a new migration (dev only) | `npx prisma migrate dev --name <name>` |
| Generate Prisma client | `npx prisma generate` |
| Open Prisma Studio | `npx prisma studio` |
| Reset DB and re-run migrations | `npx prisma migrate reset` ⚠️ destroys data |
| Check migration status | `npx prisma migrate status` |

---

## Deployment Checklist

- [ ] `DATABASE_URL` is set in production environment
- [ ] `npx prisma migrate deploy` runs after each deployment with new migrations
- [ ] `npx prisma generate` runs during the build step (`npm run build`)
- [ ] Database is not publicly accessible (firewall rules in place)
- [ ] Password is strong and not the dev default

---

## Troubleshooting

**`Can't reach database server`**
- Local: check `docker compose ps` — container must be `Up`
- Server: check `sudo systemctl status postgresql`

**`Authentication failed`**
- Verify `DATABASE_URL` credentials match the created user/password
- On Ubuntu, check `pg_hba.conf` auth method is `md5` or `scram-sha-256`

**`Migration failed`**
- Run `npx prisma migrate status` to see which migrations are pending
- Never edit files inside `prisma/migrations/` manually

**`PrismaClient is not generated`**
- Run `npx prisma generate` then restart the dev server
