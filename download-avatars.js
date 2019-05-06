let request = require('request');
let secrets = require('./secrets.js')
let args = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');
console.log(args);

function getRepoContributors(repoOwner, repoName, callback)
{
  let options =
  {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers:
    {
      "Authorization": `token ${secrets.GITHUB_TOKEN}`,
      "User-Agent": "request"
    }
  };

  request(options.url, function(err, result, body)
  {
    callback(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
