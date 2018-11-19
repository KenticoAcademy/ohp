#r "Newtonsoft.Json"
#load "MyClass.csx"

using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System.Net.Http;
using KenticoCloud.Delivery;

public Dictionary<string, string> map = new Dictionary<string, string>();

public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    /*
        var client = new HttpClient();
        var res = client.PostAsync(
        "XXX",
        content
    );*/

    var dic = await GetCodenames();
    var json = JsonConvert.SerializeObject(dic, Formatting.Indented);

    return (ActionResult)new OkObjectResult($"{json}");
}

private static async Task<Dictionary<string, string>> GetCodenames() {
    var _deliveryClient = GetDeliveryClient();

    var codenames = new List<string>();
    DeliveryItemListingResponse<MyClass> result = await _deliveryClient.GetItemsAsync<MyClass>(
        new DepthParameter(3)
    );
    var dictionary = new Dictionary<string,string>();
    
    foreach (var item in result.Items)
    {
        if (!dictionary.ContainsKey(item.Url + "")){
            dictionary.Add(item.Url + "", item.System.Codename);
        }
    }

    return dictionary;
}

private static IDeliveryClient GetDeliveryClient() {
    return DeliveryClientBuilder
                .WithOptions(builder => 
                    builder
                        .WithProjectId("XXX")
                        .UsePreviewApi("XXX")
                        .Build())
                .Build();
}
