let request = require('request');
let fs = require('fs');
let secrets = require('./secrets.js');
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

function downloadImageByURL(url, dir, filePath)
{
  if (!fs.existsSync(dir))
  {
    fs.mkdirSync(dir);
  }

  request.get(url)
    .on('error', function(err)
      {
        console.log(err);
      })
    .on('end', function(response)
      {
        console.log(`Avatar download complete`)
      })
    .pipe(fs.createWriteStream(`${dir}/${filePath}`));
}

getRepoContributors("jquery", "jquery", function(err, result) {
  const resultObj = JSON.parse(result);
  if (err)
  {
    console.log("Errors:", err);
  }
  for (let obj of resultObj)
  {
    downloadImageByURL(obj.avatar_url, './avatars', obj.login);
  }
});
