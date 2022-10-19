import { envsafe, port, str } from 'envsafe';

export const env = envsafe({
	PORT: port(),
	JIRA_SECRET: str(),
	LINEAR_SECRET: str(),
	IMPACTED_SYSTEM: str(),
	DOMAIN: str(),
	PRODUCT_OWNER: str(),
	PARENT_LINK: str(),
	TEAM: str(),
});
