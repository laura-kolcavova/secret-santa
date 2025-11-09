# Secret-Santa

A Secret Santa application built with SolidJS frontend and Express.js backend.

Create profiles, groups and draw a random gift recipient.

## Architecture

- **Client**: SolidJS app built with Vite and styled with TailwindCSS
- **Server**: Express.js API with SQLite database that also serves the client in production

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

**Note**: In development, the server provides a proxy to the client development server by default. This allows you to access both the client and API through the server URL (`http://localhost:3100`). The server automatically forwards non-API requests to the client development server running on port 3200.

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

3. Build for production:
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

**Note**: In production, the server hosts both the API and the client application. The client will be available at `https://localhost:<PORT>/` (where `<PORT>` is your configured server port), and the API endpoints will be available at `https://localhost:<PORT>/api/*`.

## Environment Configuration

### Client Environment Variables

Ensure the following environment files exist in the `client` directory:

#### `.env` (Production)

```properties
VITE_APP_API_URL=/
```

#### `.env.development` (Development)

```properties
VITE_APP_API_URL=/
```

**Required Client Environment Variables:**

- `VITE_APP_API_URL`: The base URL of the server. In production, the server hosts both the client and API. In development, the server provides a proxy to the client and hosts the API therefore the value `/`

### Server Environment Variables

Ensure the following environment files exist in the `server` directory:

#### `.env` (Production)

```properties
PORT=<SERVER PORT HERE>
JWT_SECRET=<JWT SECRET HERE>
USE_HTTPS=true
HTTPS_CERT_PATH=./certs/cert.pem
HTTPS_KEY_PATH=./certs/key.pem
SQLITE_DB_FILE_PATH=./database/database.sqlite
SPA_STATIC_FILES_ROOT_PATH=../../client/build
USE_PROXY_TO_SPA_DEVELOPMENT_SERVER=false
PROXY_TO_SPA_DEVELOPMENT_SERVER_URL=
```

#### `.env.development` (Development)

```properties
PORT=3100
JWT_SECRET=f0e5ad01-2ef8-4304-8abb-14c51c9cbe56
USE_HTTPS=false
HTTPS_CERT_PATH=
HTTPS_KEY_PATH=
SQLITE_DB_FILE_PATH=./database/database.Development.sqlite
SPA_STATIC_FILES_ROOT_PATH=../../client/build
USE_PROXY_TO_SPA_DEVELOPMENT_SERVER=true
PROXY_TO_SPA_DEVELOPMENT_SERVER_URL=http://localhost:3200
```

**Required Server Environment Variables:**

- `PORT`: Port number for the server to listen on
- `JWT_SECRET`: Secret key for JWT token signing (use a secure random string in production)
- `USE_HTTPS`: Set to `true` to enable HTTPS, `false` to use HTTP
- `HTTPS_CERT_PATH`: Path to the SSL certificate file (required when `USE_HTTPS` is `true`)
- `HTTPS_KEY_PATH`: Path to the SSL private key file (required when `USE_HTTPS` is `true`)
- `SQLITE_DB_FILE_PATH`: Path to the SQLite database file
- `SPA_STATIC_FILES_ROOT_PATH`: Path to the built client files (the server serves the client from this directory in production)
- `USE_PROXY_TO_SPA_DEVELOPMENT_SERVER`: Set to `true` for development, `false` for production
- `PROXY_TO_SPA_DEVELOPMENT_SERVER_URL`: URL of the development client server (required when `USE_PROXY_TO_SPA_DEVELOPMENT_SERVER` is `true`)

## Database

- The SQLite database files will be created automatically when the server starts
- By default the database files will be created in the `server/database` folder:
  - Production: `database.sqlite`
  - Development: `database.Development.sqlite`
- Ensure the specified database directory exists and has write permissions

## HTTPS Setup

For production deployments with HTTPS support, you'll need to generate SSL certificates. Follow these steps from the `server/certs` directory:

### Generate SSL Certificates

1. **Create a private key:**

   ```bash
   openssl genrsa -out key.pem
   ```

2. **Generate a CSR (Certificate Signing Request):**

   ```bash
   openssl req -new -key key.pem -out csr.pem
   ```

3. **Generate a certificate:**
   ```bash
   openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
   ```

### Enable HTTPS in Environment Configuration

Update your `Server Environment Variables` with the following HTTPS settings:

```properties
USE_HTTPS=true
HTTPS_CERT_PATH=./certs/cert.pem
HTTPS_KEY_PATH=./certs/key.pem
```

**Note**: The generated certificate is self-signed and suitable for development or internal use. For production deployments, consider using certificates from a trusted Certificate Authority.

## Configuration

### Departments Configuration

The application uses a configurable departments list that appears in department selection dropdowns throughout the application.

**File Location**: `client/public/departments.json`

**Default Configuration**:

```json
{
  "departments": ["Department A", "Department B", "Department C"]
}
```

### Draw Group Managers Configuration

You can configure which users are allowed to manage (view, create, edit, delete) draw groups by editing the `drawGroupManagers.json` file.

**File Location**: `client/public/drawGroupManagers.json`

**Default Configuration Example**:

```json
{
  "drawGroupManagers": ["admin@secretsanta.com"]
}
```

**Note:** Changes take effect immediately without requiring a rebuild, but users must re-login for changes to apply.

## Features

- User authentication with JWT tokens
- Secret Santa assignment management
- Responsive design with TailwindCSS
- SQLite database for data persistence
