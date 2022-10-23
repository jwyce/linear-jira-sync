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
```

2. Create a `jira.defaults.json` file in the root of the projects with any custom fields and their default creation values

3. Run `pnpm install` to install dependencies

4. Run `npx prisma db push` to init sqlite database

5. Run `pnpm start` to start the server

## Deploying

1. Railway.app
