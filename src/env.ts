import { envsafe, port, str } from 'envsafe';

export const env = envsafe({
	PORT: port(),
	JIRA_SECRET: str(),
	LINEAR_SECRET: str(),
});
