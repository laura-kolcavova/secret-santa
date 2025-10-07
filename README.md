# Santa-los

A Secret Santa application built with SolidJS frontend and Express.js backend.

## Architecture

- **Client**: SolidJS app built with Vite and styled with TailwindCSS
- **Server**: Express.js API with SQLite database

## Prerequisites

- Node.js (version 18 or higher)
- npm or pnpm

## Development Setup

### Client Setup

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

### Server Setup

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Production Deployment

### Client (Frontend) Production Build

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install production dependencies:

   ```bash
   npm ci --production=false
   ```

3. Update the following environment files in the `client` directory:

   #### `.env` (Production)

   ```properties
   VITE_APP_API_URL=<SERVER URL HERE>
   ```

4. Build for production:
   ```bash
   npm run build:prod
   ```

### Server (Backend) Production Deployment

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install production dependencies:

   ```bash
   npm ci --production
   ```

3. Update the following environment files in the `server` directory:

   #### `.env` (Production)

   ```properties
   PORT=<SERVER PORT HERE>
   JWT_SECRET=<JWT SECRET HERE>
   ```

4. Build and start production server:
   ```bash
   npm run prod
   ```

## Environment Configuration

### Client Environment Variables

Ensure the following environment files exist in the `client` directory:

#### `.env` (Production)

```properties
VITE_APP_API_URL=<SERVER URL HERE>
```

#### `.env.development` (Development)

```properties
VITE_APP_API_URL=/
```

**Required Client Environment Variables:**

- `VITE_APP_API_URL`: The base URL of the server

### Server Environment Variables

Ensure the following environment files exist in the `server` directory:

#### `.env` (Production)

```properties
PORT=<SERVER PORT HERE>
JWT_SECRET=<JWT SECRET HERE>
SQLITE_DB_FILE_PATH=database/database.sqlite
SPA_STATIC_FILES_ROOT_PATH=../../client/build
USE_PROXY_TO_SPA_DEVELOPMENT_SERVER=false
PROXY_TO_SPA_DEVELOPMENT_SERVER_URL=
```

#### `.env.development` (Development)

```properties
PORT=3100
JWT_SECRET=f0e5ad01-2ef8-4304-8abb-14c51c9cbe56
SQLITE_DB_FILE_PATH=database/database.Development.sqlite
SPA_STATIC_FILES_ROOT_PATH=../../client/build
USE_PROXY_TO_SPA_DEVELOPMENT_SERVER=true
PROXY_TO_SPA_DEVELOPMENT_SERVER_URL=http://localhost:3200
```

**Required Server Environment Variables:**

- `PORT`: Port number for the server to listen on
- `JWT_SECRET`: Secret key for JWT token signing (use a secure random string in production)
- `SQLITE_DB_FILE_PATH`: Path to the SQLite database file
- `SPA_STATIC_FILES_ROOT_PATH`: Path to the built client files
- `USE_PROXY_TO_SPA_DEVELOPMENT_SERVER`: Set to `true` for development, `false` for production
- `PROXY_TO_SPA_DEVELOPMENT_SERVER_URL`: URL of the development client server (only needed for development)

## Database

- The SQLite database will be created automatically at the specified path
- Ensure the database directory exists and has write permissions

## Features

- User authentication with JWT tokens
- Secret Santa assignment management
- Responsive design with TailwindCSS
- SQLite database for data persistence
