# Chat App

## Getting Started - Development

If you wish to develop using all of the packages locally you can perform the following steps:

### Locally

1. Install packages with `pnpm install` from the root folder.
2. Setup postgres:
    * cd into server folder and make a copy of [.env.template](./server/.env.template) and rename it to `.env`.
    * Update `DATABASE_URL` according to where your Database is hosted.
    * Once postgres is up and running, create migrations with `pnpm prisma:migrate`

3. Run both client and server with `pnpm start` or `pnpm dev`.
4. Access server with `http://localhost:4000/graphql`
5. Access client with `http://localhost:3000/`

### Tech

1. Frontend
    * ReactJS (create react app)
    * Tailwindcss
    * VanillaJS
2. Backend
    * NodeJS
    * ExpressJS
    * GraphQL
3. Database
    * Postgres
    * Prisma (ORM)
