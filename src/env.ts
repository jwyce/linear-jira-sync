import { envsafe, port, str, url } from 'envsafe';

export const env = envsafe({
	PORT: port(),
	NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
	JIRA_HOST: url(),
	JIRA_SECRET: str(),
	LINEAR_SECRET: str(),
	JIRA_PROJECT: str(),
	PROJECT_QUERY: str({ allowEmpty: true }),
	ISSUE_QUERY: str({ allowEmpty: true }),
});
