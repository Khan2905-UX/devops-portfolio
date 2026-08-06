# DevOps Portfolio API

A Node.js Express API scaffold built with best practices for structure, configuration, logging, error handling, and testing.

## Features

- Express application structure with `src/` separation
- Environment-based configuration using `.env`
- Request logging middleware
- 404 and centralized error handling
- Automated tests with Jest and SuperTest
- ESLint for code quality

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file:

```bash
cp .env.example .env
```

3. Run the app in development mode:

```bash
npm run dev
```

4. Run tests:

```bash
npm test
```

## API Endpoints

- `GET /` - health endpoint with environment info
- `GET /api/health` - health check endpoint
