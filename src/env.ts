import { envsafe, port, str, url } from 'envsafe';

export const env = envsafe({
	PORT: port(),
	JIRA_HOST: url(),
	JIRA_SECRET: str(),
	LINEAR_SECRET: str(),
	JIRA_PROJECT: str(),
	PROJECT_QUERY: str({ allowEmpty: true }),
});
