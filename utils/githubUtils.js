const atob = require('atob');
const fetch = require('node-fetch');

function getGithubDecodedData(data) {
    const { content, ...otherData } = data;
    const decodedConent = atob(content);
    return {
        ...otherData,
        content: decodedConent,
    }
}

function getGithubApiEndpoint({owner, repo, file}) {
    return `https://api.github.com/repos/${owner}/${repo}/contents/${file}`;
}

const githubApiEndpointOptions = {
    owner: 'KenticoAcademy',
    repo: 'ohp',
    file: 'package.json'
}

const githubApiEndpoint = getGithubApiEndpoint(githubApiEndpointOptions);

async function getGithubData() {
    const githubResponse = await fetch(githubApiEndpoint);
    const githubData = await githubResponse.json();
    const githubDataWithDecodedContent = getGithubDecodedData(githubData);
    return githubDataWithDecodedContent;
}

module.exports = getGithubData;
