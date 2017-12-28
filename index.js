const fetch = require('node-fetch')
const qs = require('querystring')
const joinUrl = require('url-join')

const defaultOptions = {
  baseUrl: 'https://graph.facebook.com',
  method: 'GET',
}

module.exports = async function requestFacebook (options) {
  const {baseUrl, apiVersion, method, path, query, accessToken} = {
    ...defaultOptions,
    ...options,
  }

  const queryObject = {
    access_token: accessToken,
    ...query,
  }
  const queryString = '?' + qs.stringify(queryObject)
  const url = joinUrl(baseUrl, apiVersion, path, queryString)

  const response = await fetch(url, {method})
  if (!response.ok) {
    const error = new Error('failed to request facebook')
    response.body = await response.text()
    error.response = response
    throw error
  }

  return await response.json()
}
