const fetch = require('node-fetch')

/* let now = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
let time = now.split(' ')[0].split('.').map(Function.prototype.call, String.prototype.trim).map(t => t.length===1 ? '0'+t : t).reverse().join('-') */
const sdxUrl = `https://www.sodexo.fi/en/ruokalistat/output/daily_json/158/`;
const fncUrl =  `https://www.foodandco.fi/modules/json/json/Index?costNumber=3208`

const handler = async function ( event ) {
  const {date,location} = event.queryStringParameters

  if(location==='sodexo'){
    const url = `${sdxUrl}${date}`
    try {
      const responseFi = await fetch(url, {
        headers: { Accept: 'application/json' },
      })
      if (!responseFi.ok) {
        // NOT res.status >= 200 && res.status < 300
        return { statusCode: responseFi.status, body: responseFi.statusText }
      }
      const data = await responseFi.json()
      data.url=url
  
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
  } else if (location==='foodnco'){
    try {
      const responseFi = await fetch(`${fncUrl}&language=fi`, {
        headers: { Accept: 'application/json' },
      })
      if (!responseFi.ok) {
        // NOT res.status >= 200 && res.status < 300
        return { statusCode: responseFi.status, body: responseFi.statusText }
      }
      const responseEn = await fetch(`${fncUrl}&language=en`, {
        headers: { Accept: 'application/json' },
      })
      if (!responseEn.ok) {
        // NOT res.status >= 200 && res.status < 300
        return { statusCode: responseEn.status, body: responseEn.statusText }
      }
      const data = {} 
      data.fi= await responseFi.json()
      data.en= await responseEn.json()
  
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
  
}

module.exports = { handler }
