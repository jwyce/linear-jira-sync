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

app.get('/test', (_req, _res) => {
	const bodyData = JSON.stringify({
		fields: {
			project: {
				key: 'VEL',
			},
			summary: 'Testing Nothing to See Here 👀',
			description: 'Creating an issue via REST API',
			customfield_15005: 'Velocity Originations', // Impacted System
			customfield_17200: 'Platform', // Domain
			customfield_16965: 'Dennis Shebesta', // Product Owner
			customfield_10201: 'VEL-3398', // Parent Link
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
