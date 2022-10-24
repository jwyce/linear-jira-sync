import { flattenIssue } from './utils/flattenIssue';
import 'dotenv/config';

import axios from 'axios';
import Fastify from 'fastify';
import cron from 'node-cron';

// import { prisma } from './db/client';
import { env } from './env';
import { getJiraDefaults } from './utils/getJiraDefaults';

const app = Fastify({
	logger: true,
});

// Creating a cron job which runs on every 10 second
cron.schedule('*/10 * * * * *', async function () {
	console.log('running a task every 10 second');
	// const defaults = getJiraDefaults();
	// console.log(defaults);
});

app.get('/getIssue', async (_req, rep) => {
	const data = (
		await axios.get(`${env.JIRA_HOST}/rest/api/2/issue/VEL-4657`, {
			headers: {
				Authorization: `Bearer ${env.JIRA_SECRET}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
	).data;

	const issue = flattenIssue(data);
	return rep.send(issue);
});

app.get('/getIssues', async (_req, rep) => {
	const data = (
		await axios.get(
			`${env.JIRA_HOST}/rest/api/2/search?jql=${encodeURI(
				env.ISSUE_QUERY
			)}+ORDER+BY+created&maxResults=10`,
			{
				headers: {
					Authorization: `Bearer ${env.JIRA_SECRET}`,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		)
	).data;

	const issues: PaginatedIssues = {
		startAt: data.startAt,
		maxResults: data.maxResults,
		total: data.total,
		issues: data.issues.map((issue: any) => flattenIssue(issue)),
	};
	return rep.send(issues);
});

app.get('/getProjects', async (_req, rep) => {
	const data = (
		await axios.get(
			`${env.JIRA_HOST}/rest/api/2/search?jql=${encodeURI(
				env.PROJECT_QUERY
			)}+ORDER+BY+created&maxResults=10`,
			{
				headers: {
					Authorization: `Bearer ${env.JIRA_SECRET}`,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		)
	).data;

	const issues: PaginatedIssues = {
		startAt: data.startAt,
		maxResults: data.maxResults,
		total: data.total,
		issues: data.issues.map((issue: any) => flattenIssue(issue)),
	};

	return rep.send(issues);
});

app.get('/getLinearIssues', async (_req, rep) => {
	const bodyData = `
    query Issues {
      issues(first: 10) {
        edges {
          node {
            id
            title
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }`;
	const data = await axios.post(`https://api.linear.app/graphql`, bodyData, {
		headers: {
			Authorization: `Bearer ${env.LINEAR_SECRET}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
	return rep.send(data);
});

app.get('/createIssue', (_req, _rep) => {
	const defaults = getJiraDefaults();
	const bodyData = JSON.stringify({
		fields: {
			project: { key: env.JIRA_PROJECT },
			summary: 'Testing Nothing to See Here 👀',
			description: 'Creating an issue via REST API',
			assignee: { name: 'jwyce' },
			...defaults,
		},
	});

	axios
		.post(`${env.JIRA_HOST}/rest/api/2/issue/`, bodyData, {
			headers: {
				Authorization: `Bearer ${env.JIRA_SECRET}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
		.then((res) => {
			console.log(`Response: ${res.status} ${res.statusText}`);
			console.log('data', res.data);
			return res.data;
		});
});

// Run the server!
app.listen({ port: env.PORT }, function (err) {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
});
