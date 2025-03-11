import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN,
});

export const fetchIssues = async (language: string, page: number = 1) => {
  try {
    const response = await octokit.rest.search.issuesAndPullRequests({
      q: `is:issue label:"good first issue" language:${language} state:open`,
      per_page: 10,
      page: page,
    });

    return response.data.items;
  } catch (error) {
    console.error("GitHub API error:", error);
    return [];
  }
};



export const forkRepo = async (owner: string, repo: string) => {
  try {
    const response = await octokit.repos.createFork({
      owner,
      repo,
    });
    return response.data;
  } catch (error) {
    console.error("Error forking repo:", error);
  }
};
