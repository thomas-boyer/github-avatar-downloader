let request = require('request');
let secrets = require('./secrets.js')
let args = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');

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

  request(options, function(err, result, body)
  {
    callback(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  const resultObj = JSON.parse(result);
  console.log("Errors:", err);
  for (let obj of resultObj)
  {
    console.log(obj.avatar_url);
  }
});
