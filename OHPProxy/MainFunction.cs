using System;
using System.Text;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;

namespace OHPProxy
{
    public static class MainFunction
    {
        private const string SdkId = "X-Kc-Sdkid";
        private const string UserAgent = "User-Agent";
        private const string KenticoCloudEnpoint = "https://preview-deliver.kenticocloud.com/<PROJECT_ID>/items";
        private static readonly HttpClient HttpClient = new HttpClient();

        [FunctionName("MainFunction")]
        public static async Task<object> Run([HttpTrigger(WebHookType = "genericJson")]HttpRequestMessage request, TraceWriter log)
        {
            AddHeadersFromRequest(request);

            var githubCodeSampleTask = GetContentFromGitHubFile(owner: "KenticoAcademy", repository: "ohp", file: "package.json");
            var kenticoCloudResponseTask = GetDataFromKenticoCloud(request);

            var githubCodeSample = await githubCodeSampleTask;
            var kenticoCloudResponse = await kenticoCloudResponseTask;

            if (kenticoCloudResponse.StatusCode != HttpStatusCode.OK)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest);
            }

            var responseBody = kenticoCloudResponse.Content.ReadAsStringAsync().Result;
            dynamic json = JsonConvert.DeserializeObject(responseBody);

            json.github = githubCodeSample;

            return request.CreateResponse(HttpStatusCode.OK, (object)json);
        }

        private static async Task<HttpResponseMessage> GetDataFromKenticoCloud(HttpRequestMessage requestMessage)
        {
            var url = KenticoCloudEnpoint + requestMessage.RequestUri.Query;
            var uri = new Uri(url);
            var request = new HttpRequestMessage
            {
                RequestUri = uri,
                Method = HttpMethod.Get,
            };

            request.Headers.Authorization = requestMessage.Headers.Authorization;
            
            var response = await HttpClient.SendAsync(request);

            return response;
        }

        private static string DecodeContentFromBase64(string content)
        {
            var data = Convert.FromBase64String(content);
            var decodedContent = Encoding.UTF8.GetString(data);

            return decodedContent;
        }

        private static async Task<string> GetContentFromGitHubFile(string owner, string repository, string file)
        {
            var uriString = $"https://api.github.com/repos/{owner}/{repository}/contents/{file}";
            var githubResponse = await HttpClient.GetAsync(new Uri(uriString));
            var githubResponseBody = githubResponse.Content.ReadAsStringAsync().Result;

            var jObject = JObject.Parse(githubResponseBody);
            var content = (string)jObject.SelectToken("content");

            return DecodeContentFromBase64(content);
        }

        private static void AddHeadersFromRequest(HttpRequestMessage req)
        {
            HttpClient.DefaultRequestHeaders.Add("Accept", req.Headers.Accept.ToString());
            HttpClient.DefaultRequestHeaders.Add(SdkId, req.Headers.GetValues(SdkId));
            HttpClient.DefaultRequestHeaders.Add(UserAgent, req.Headers.GetValues(UserAgent));
        }
    }
}
