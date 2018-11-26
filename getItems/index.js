const getGithubData = require('../utils/githubUtils.js');
const fetch = require('node-fetch');


function getDeliverApiEndpoint({projectId, queryString}) {
    return `https://deliver.kenticocloud.com/${projectId}/items?${queryString}`
}

const projectId = "7c943364-918e-0173-f4e5-58bda8f20736"

function toQueryString(queryObject) {
    return Object.keys(queryObject)
        .map(key => Array.isArray(queryObject[key])
            ? `${key}=${queryObject[key].join(',')}`
            : `${key}=${queryObject[key]}`)
        .join("&")
}


module.exports = async function (context, req) {
    const { body: requestBody } = req;
    const queryString = toQueryString(requestBody);

    if (queryString) {
        const deliverApiEndpoint = getDeliverApiEndpoint({projectId, queryString});
        const response = await fetch(deliverApiEndpoint);
        const data = await response.json();
        const githubData = getGithubData();

        return {
            data,
            githubData
        }
    }
};