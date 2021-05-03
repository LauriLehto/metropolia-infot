const fetch = require('node-fetch')

const url = 'https://www.sodexo.fi/en/ruokalistat/output/daily_json/158/2021-05-03';

const handler = async function () {
  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ data: data }),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ data: error.message }),
    }
  }
}

module.exports = { handler }
