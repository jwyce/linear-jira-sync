import 'dotenv/config';

import axios from 'axios';
import express from 'express';
import cron from 'node-cron';

import { env } from './env';

const app = express(); // Initializing app

// Creating a cron job which runs on every 10 second
cron.schedule('*/10 * * * * *', function () {
	console.log('running a task every 10 second');
});

app.get('/getIssue', async (_req, res) => {
	const issue = await axios.get(
		'https://jira.cl.glhec.org/rest/api/2/issue/VEL-4657',
		{
			headers: {
				Authorization: `Bearer ${env.JIRA_SECRET}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}
	);

	console.log(issue.data);
	return res.json(issue.data);
});

app.get('/editIssue', (_req, _res) => {
	const bodyData = JSON.stringify({
		fields: {
			customfield_10200: env.TEAM,
			assignee: { name: 'jwyce' },
			customfield_10106: 5,
		},
	});

	axios
		.put('https://jira.cl.glhec.org/rest/api/2/issue/VEL-4889', bodyData, {
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

app.get('/createIssue', (_req, _res) => {
	const bodyData = JSON.stringify({
		fields: {
			project: {
				key: 'VEL',
			},
			summary: 'Testing Nothing to See Here 👀',
			description: 'Creating an issue via REST API',
			assignee: { name: 'jwyce' },
			customfield_15005: [{ value: env.IMPACTED_SYSTEM }],
			customfield_10106: 5,
			customfield_17200: { value: env.DOMAIN },
			customfield_16965: { name: env.PRODUCT_OWNER },
			customfield_10201: env.PARENT_LINK,
			customfield_10200: env.TEAM,
			issuetype: {
				name: 'Task',
			},
		},
	});

	axios
		.post('https://jira.cl.glhec.org/rest/api/2/issue/', bodyData, {
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

app.listen(env.PORT);
