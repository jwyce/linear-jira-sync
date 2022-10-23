# Linear-Jira Synchronization

This is a simple service that synchronizes Jira issues with Linear via cron job every 12 hours.

## Setup

1. Create a `.env` file in the root of the project with the following variables:

```
PORT=your_server_port
JIRA_HOST=your_jira_host
JIRA_SECRET=your_jira_public_access_token
LINEAR_SECRET=your_linear_api_key
JIRA_PROJECT=your_jira_project_key
PROJECT_QUERY=optional_jira_query_to_sync_projects
DATABASE_URL="file:./db.sqlite"
```

2. Create a `jira.defaults.json` file in the root of the projects with any custom fields and their default creation values

3. Run `pnpm install` to install dependencies

4. Run `npx prisma db push` to init sqlite database

5. Run `pnpm dev` to start the dev server

## Deploying to Railway.app

1. Fork this repository

2. Start a new project on [Railway.app](https://railway.app/)

3. Deploy from a GitHub repository

4. Make sure build with Dockerfile is selected
