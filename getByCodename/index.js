const getGithubData = require('../utils/githubUtils.js');
const fetch = require('node-fetch');


function getDeliverApiEndpoint({projectId, codename}) {
    return `https://deliver.kenticocloud.com/${projectId}/items/${codename}`
}

const projectId = "7c943364-918e-0173-f4e5-58bda8f20736"


module.exports = async function (context, req) {
    const { codename } = req.query;

    if (codename) {
        const deliverApiEndpoint = getDeliverApiEndpoint({projectId, codename});
        const response = await fetch(deliverApiEndpoint);
        const data = await response.json();
        const githubData = getGithubData();

        return {
            data,
            githubData
        }
    }
};