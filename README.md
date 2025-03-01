# Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
bun run dev
```

Docker Compose file for development:

```yaml
services:
  database:
    image: postgres
    restart: always
    shm_size: 128mb
    volumes:
      - ./postgres:/data/postgres
    environment:
      POSTGRES_USER: planner
      POSTGRES_PASSWORD: superpass
      POSTGRES_DB: planner
    network_mode: host
```

Dotenv file for development:

```bash
NUXT_SESSION_PASSWORD=0a021f1a745ff66a040e7321f6aff9992a3d95b516f59bdab7b887cc6b2b925b
SALT_ROUNDS=10
DB_HOST="127.0.0.1"
DB_PORT="5432"
DB_USER="planner"
DB_PASSWORD="superpass"
MOUNT="absolute/path/to/storage"
```

Execute command below to add example data:

```bash
curl -X POST http://localhost:3000/api/sample
```

**Scalar** is located at [http://localhost:3000/docs](http://localhost:3000/docs)

## Production

Build the application for production:

```bash
bun run build
```

Locally preview production build:

```bash
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
