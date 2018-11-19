var KenticoCloud = require('kentico-cloud-delivery');
var axios = require('axios');

const DeliveryClient = new KenticoCloud.DeliveryClient({
    projectId: 'xxx',
    previewApiKey: 'xxx',
    enablePreviewMode: true
});

const parseNavigationItems = (navigationItems) => {
    let routes = {};
    
    navigationItems.forEach(item => {
      item.children.forEach(base => {
        base.children.forEach(child =>
          routes[`${item.url.value}/${base.url.value}/${child.url.value}`] = child.system.codename
        );
        routes[`${item.url.value}/${base.url.value}`] = base.system.codename
      });
      routes[`${item.url.value}`] = item.system.codename
    });

    return routes;
};

module.exports = async function (context, req) {
    let routeMap = {};

    return DeliveryClient
        .items()
        .type('navigation_item')
        .depthParameter(4)
        .getPromise()
        .then(response => {
            routeMap = parseNavigationItems(response.items);
        })
        .then(() => axios.post(
            'https://webhook.site/26348a12-dd88-4c90-868d-0ae9933a7f6f',
            routeMap
        ))
        .then(() => {
            return {
                status: 200,
                body: routeMap
            };
        });
};