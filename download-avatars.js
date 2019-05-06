let request = require('request');
let fs = require('fs');
let secrets = require('./secrets.js');
let args = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repo, callback)
{
  let options =
  {
    url: "https://api.github.com/repos/" + repo[0] + "/" + repo[1] + "/contributors",
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

if (args.length !== 2)
{
  console.log("Please provide the repository owner and name as arguments as such:");
  console.log("<repoOwner> <repoName>");
}
else
{
  getRepoContributors(args, function(err, result) {

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
}

