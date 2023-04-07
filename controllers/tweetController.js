const BigPromise = require("../middlewares/bigPromise");


// Get User mentions timeline by user ID
// https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/quick-start

const needle = require("needle");

const userId = "1443953949627854854";
const url = `https://api.twitter.com/2/users/${userId}/mentions?max_results=50`;
// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const bearerToken = process.env.BEARER;


// GET All tweets
exports.getTweets = BigPromise(async (req, res, next) => {
  let params = {
    max_results: 50,
    "tweet.fields": "created_at",
  };
  const options = {
    headers: {
      "User-Agent": "v2UserMentionssJS",
      authorization: `Bearer ${bearerToken}`,
    },
  };
  try {
    const resp = await needle("get", url, params, options);

    if (resp.statusCode != 200) {
      console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
      // return;
    }
    // return resp.body;
    res.status(200).json({
      success: true,
      data:resp.body
    });
  } catch (err) {
    throw new Error(`Request failed: ${err}`);
  }

});
