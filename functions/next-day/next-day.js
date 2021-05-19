const fetch = require('node-fetch')

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
let now = tomorrow.toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
let time = now.split(' ')[0].split('.').map(Function.prototype.call, String.prototype.trim)
time =time.map(t => t.length === 1 ? '0'+t : t).reverse().join('-')
//let time = now.split(' ')[0].split('.').map(Function.prototype.call, String.prototype.trim).map(t => t.length===1 ? '0'+t : t).reverse().join('-')
const url = `https://www.sodexo.fi/en/ruokalistat/output/daily_json/158/${time}`;

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
    data.url = url

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
