interface JiraIssue {
	id: string;
	key: string;
	fields: JiraField;
}

interface JiraField {
	assignee: string;
	issueType: string;
	domain: string;
	status: string;
	creator: string;
	parentLink: string;
	productOwner: string;
	labels: string[];
	summary: string;
	description: string;
	project: string;
	team: string;
	points: number;
	updated: Date;
	created: Date;
}

interface PaginatedIssues {
	startAt: number;
	maxResults: number;
	total: number;
	issues: JiraIssue[];
}
