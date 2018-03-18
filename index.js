const fetch = require('node-fetch')
const qs = require('querystring')
const joinUrl = require('url-join')
const clean = require('clean-options')

module.exports = async function requestFacebook (options) {
  const {
    baseUrl = 'https://graph.facebook.com',
    apiVersion,
    method = 'GET',
    path,
    query,
    accessToken,
    body,
  } = clean(options)

  const queryObject = {
    access_token: accessToken,
    ...query,
  }
  const queryString = '?' + qs.stringify(queryObject)
  const url = joinUrl(baseUrl, apiVersion, path, queryString)

  const response = await fetch(url, {
    method,
    body: buildBody(body)
  })
  if (!response.ok) {
    const error = new Error('failed to request facebook')
    response.body = await response.text()
    error.response = response
    throw error
  }

  return await response.json()
}

function buildBody (params) {
  if (typeof params === 'object' && params !== null) {
    const body = {}
    Object.keys(params).forEach(key => {
      body[key] = typeof params[key] === 'string' ? params[key] : JSON.stringify(params[key])
    })
    return qs.stringify(body)
  }
  else return params
}