export const flattenIssue = (issue: any): JiraIssue => {
	return {
		id: issue.id,
		key: issue.key,
		fields: {
			assignee: issue.fields.assignee?.name,
			creator: issue.fields.creator?.name,
			domain: issue.fields.customfield_17200?.value,
			issueType: issue.fields.issuetype?.name,
			labels: issue.fields.labels,
			parentLink: issue.fields.customfield_10201?.value,
			points: issue.fields.customfield_10106,
			productOwner: issue.fields.customfield_16965?.name,
			project: issue.fields.project?.name,
			status: issue.fields.status?.name,
			team: issue.fields.customfield_10200,
			description: issue.fields.description,
			summary: issue.fields.summary,
			created: issue.fields.created,
			updated: issue.fields.updated,
		},
	};
};
