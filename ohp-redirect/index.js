const routeToCodename = new Map([
    ['route1', 'codename1'],
    ['route2', 'url/codename2'],
    ['route3', 'url/codename3'],
])

module.exports = async function (context, req) {
    const newPath = routeToCodename.get(req.params.path);

    if (newPath) {
        context.res = {
            status: 301,
            headers: {
                "location": "https://deliver.kenticocloud.com/7c943364-918e-0173-f4e5-58bda8f20736/items/building_your_first_app__net"
            },
            body: null,
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Article not found"
        };
    }
};