import chalk from 'chalk';
import fs from 'fs-extra';
import { JsonObject } from 'type-fest';

export const getJiraDefaults = () => {
	try {
		const jiraDefaults = fs.readJSONSync('jira.defaults.json') as JsonObject;

		return jiraDefaults;
	} catch {
		console.log(chalk.redBright('jira.defaults.json not found'));
		process.exit(1);
	}
};
