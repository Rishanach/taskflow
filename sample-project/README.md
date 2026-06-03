# TaskFlow App

A simple task manager REST API built with Node.js and Express. Designed as a learning project for exploring Claude Code.

## Setup

```bash
npm install
npm start
```

The server runs on **http://localhost:3000**.

## API Endpoints

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/register` | Create a new account |
| POST | `/auth/login` | Log in and receive a JWT |

### Tasks (require `Authorization: Bearer <token>` header)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/tasks` | List your tasks |
| POST | `/tasks` | Create a task |
| PATCH | `/tasks/:id` | Update a task (e.g. `{ "completed": true }`) |
| DELETE | `/tasks/:id` | Delete a task |

## Example Usage

```bash
# Register
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret123"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret123"}'

# Create a task (use token from login response)
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{"title":"Buy groceries"}'
```

## Known Bug (for practice)

Try logging in with an email that was never registered:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"nobody@example.com","password":"whatever"}'
```

This crashes with a `TypeError` instead of returning a clean `401`. The bug is in `src/auth/auth.js` in the `login()` function.

## Project Structure

```
src/
├── index.js                  # Express app entry point
├── auth/
│   └── auth.js               # register, login, verifyToken — bug is here!
├── models/
│   ├── User.js               # In-memory user store
│   └── Task.js               # In-memory task store
├── middleware/
│   └── requireAuth.js        # JWT auth middleware
└── routes/
    ├── authRoutes.js         # /auth/* endpoints
    └── taskRoutes.js         # /tasks/* endpoints
```
