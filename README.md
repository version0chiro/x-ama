A simple website for you to get anonymous message and share them on your 𝕏 profile


Work in progress.... ⏳

## Getting Started: Running the Project Locally

## 💻 Prerequisites:

- [Docker](https://docs.docker.com/desktop/) - Docker helps developers build, share, run, and verify applications anywhere, without tedious environment configuration or management.
- [Supabase CLI](https://supabase.com/docs/guides/cli) - JYou can use the Supabase CLI to run the entire Supabase stack locally on your machine
- [NPX](https://docs.npmjs.com/cli/v10/commands/npx) - This command allows you to run an arbitrary command from an npm package

## 🏃 Steps:

**run the development server:**

- Spin up your docker desktop or cli

```
 cd x-ama
```
```
supabase start
```
 - Terminal Output should look something like this 
 ```
  API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
  S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
   S3 Access Key: 625729a08b95bf1b7ff351a663f3a23c
   S3 Secret Key: 850181e4652dd023b7a98c58ae0d2d34bd487ee0cc3254aed6eda37307425907
       S3 Region: local
 ```

- copy the `API URL` & `anon key` from the terminal output
- paste in the `.env.example` file and rename it to `.env.local`
- supabase instance will be running on `http://127.0.0.1:54323/`
```
npm run dev
```
- Next app will run on local host: 3000


## 💻 Tech Stack

> Frontend

- [NextJs](https://nextjs.org) - Next.js is an open-source web development framework.
- [TailwindCSS](https://tailwindcss.com) - Tailwind CSS is a utility-first CSS framework for rapidly building modern websites without ever leaving your HTML.
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components that you can copy and paste into your apps
- [Typescript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

> Backend

- [Supabase](https://supabase.com/) - Supabase is an open source Firebase alternative.