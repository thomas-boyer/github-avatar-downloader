let request = require('request');
let fs = require('fs');
let secrets = require('./secrets.js');
let args = process.argv.slice(2);

function getRepoContributors(repo, callback)
{
  //URL and headers for API request
  let options =
  {
    url: "https://api.github.com/repos/" + repo[0] + "/" + repo[1] + "/contributors",
    headers:
    {
      "Authorization": `token ${secrets.GITHUB_TOKEN}`,
      "User-Agent": "request"
    }
  };

  //Perform callback function on response
  request(options, function(err, result, body)
  {
    callback(err, body);
  });
}

function downloadImageByURL(url, dir, filePath)
{
  //If the target directory doesn't exist, create it
  if (!fs.existsSync(dir))
  {
    fs.mkdirSync(dir);
  }

  //Make GET request
  request.get(url)
    .on('error', function(err)
      {
        console.log(err);
      })
    .on('end', function(response)
      {
        console.log(`Avatar download complete`)
      })
    //Write each image to file using given directory and filepath
    .pipe(fs.createWriteStream(`${dir}/${filePath}`));
}

//////////Program start//////////

console.log('Welcome to the GitHub Avatar Downloader!');

//If there are more or fewer than 2 arguments, ask for two arguments
if (args.length !== 2)
{
  console.log("Please provide the repository owner and name as arguments as such:");
  console.log("<repoOwner> <repoName>");
}
//Otherwise, call getRepoContributors with callback
else
{
  getRepoContributors(args, function(err, result) {

    const resultObj = JSON.parse(result);
    //If there is no error
    //for each avatar, feed the avatar URL, target directory, and username to downloadImageByURL function
    if (err)
    {
      console.log("Errors:", err);
    }
    else
    {
      for (let obj of resultObj)
      {
        downloadImageByURL(obj.avatar_url, './avatars', obj.login);
      }
    }
  });
}

