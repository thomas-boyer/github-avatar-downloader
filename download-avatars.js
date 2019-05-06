let request = require('request');
let args = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');
console.log(args);

function getRepoContributors(repoOwner, repoName, callback) {
  return callback;
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
