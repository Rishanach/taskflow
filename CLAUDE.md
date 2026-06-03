# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Languages

Two languages are used across the project: **Python** and **JavaScript (Node.js)**.

## Code Structure

```
├── calculator.py              # Standalone Python calculator (command-line)
├── sample-project/            # TaskFlow App — task manager REST API
│   ├── package.json           # Express, bcrypt, jsonwebtoken dependencies
│   ├── README.md              # API docs with example curl commands
│   └── src/
│       ├── index.js           # Express app entry point (port 3000)
│       ├── auth/
│       │   └── auth.js        # register(), login(), verifyToken()
│       ├── middleware/
│       │   └── requireAuth.js # JWT Bearer token middleware
│       ├── models/
│       │   ├── User.js        # In-memory user store
│       │   └── Task.js        # In-memory task store
│       └── routes/
│           ├── authRoutes.js  # POST /auth/register, POST /auth/login
│           └── taskRoutes.js  # CRUD /tasks (all require auth)
├── cc.png                     # Screenshot/logo image
├── HD-wallpaper-maroon-colors-solid.jpg  # Wallpaper image
└── rewind compact.mp4         # Video file
```

## Running

### Python calculator
```bash
python calculator.py
```

### TaskFlow API (Node/Express)
```bash
cd sample-project
npm install
npm start          # or: npm run dev (with nodemon)
```

The API runs on **http://localhost:3000**.

## Known Bug in sample-project

In `sample-project/src/auth/auth.js`, the `login()` function accesses `user.passwordHash` without first checking if `user` is `undefined`. Logging in with an unregistered email crashes with `TypeError` instead of returning a clean 401 response. The fix: add a null-check for `user` before comparing the password hash.

## Notes

- No linter, test runner, or TypeScript configuration is set up.
- Both models use in-memory storage (not a real database) — data resets when the server restarts.