const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");

// Get User mentions timeline by user ID
// https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/quick-start

const needle = require("needle");

const userId = "1443953949627854854";
const url = `https://api.twitter.com/2/users/${userId}/mentions`;
const url1 = "https://api.twitter.com/2/users/:hacktheleague";

const gestch =async ( )=> {
  const options = {
    headers: {
      "User-Agent": "v2UserMentionssJS",
      authorization: `Bearer ${process.env.BEARER}`,
    },
  };
  try {
    const resp = await needle("get", url1, params, options);

    if (resp.statusCode != 200) {
      console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
      // return;
    }
    // return resp.body;
  } catch (err) {

  }
}




// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const bearerToken = process.env.BEARER;

// this is the ID for @TwitterDev
const getUserMentions = async () => {
  gestch();
  let userMentions = [];
  let params = {
    max_results: 100,
    "tweet.fields": "created_at",
  };
  const options = {
    headers: {
      "User-Agent": "v2UserMentionssJS",
      authorization: `Bearer ${bearerToken}`,
    },
  };

  let hasNextPage = true;
  let nextToken = null;
  console.log("Retrieving mentions...");
  while (hasNextPage) {
    let resp = await getPage(params, options, nextToken);
    if (
      resp &&
      resp.meta &&
      resp.meta.result_count &&
      resp.meta.result_count > 0
    ) {
      if (resp.data) {
        userMentions.push.apply(userMentions, resp.data);
      }
      if (resp.meta.next_token) {
        nextToken = resp.meta.next_token;
      } else {
        hasNextPage = false;
      }
    } else {
      hasNextPage = false;
    }
  }

  console.dir(userMentions, {
    depth: null,
  });

  console.log(`Got ${userMentions.length} mentions for user ID ${userId}!`);
  return userMentions;
};

const getPage = async (params, options, nextToken) => {
  if (nextToken) {
    params.pagination_token = nextToken;
  }

  try {
    const resp = await needle("get", url, params, options);

    if (resp.statusCode != 200) {
      console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
      return;
    }
    return resp.body;
  } catch (err) {
    throw new Error(`Request failed: ${err}`);
  }
};
// GET All tweets
exports.getTweets = BigPromise(async (req, res, next) => {
  const response = await getUserMentions();

  res.status(200).json({
    success: true,
    data:response
  });
});
