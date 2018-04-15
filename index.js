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
    page
  } = clean(options)
  let response

  if (page) {
    response = await fetch(page)
  } else {
    const queryObject = {
      access_token: accessToken,
      ...query,
    }
    const queryString = '?' + buildParams(queryObject)
    const url = joinUrl(baseUrl, apiVersion, path, queryString)

    response = await fetch(url, {
      method,
      body: buildParams(body)
    })
  }

  if (!response.ok) {
    const error = new Error('failed to request facebook')
    let body = await response.text()
    try {
      body = JSON.parse(body)
    }
    catch (err) {
      // do nothing, keep body to be the string
    }

    error.response = {
      ...response,
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      body
    }
    throw error
  }

  return await response.json()
}

/**
 * facebook graph api params could be an object
 * but for http transferring, the first level of fields should be query string format
 * and the deeper fields should be JSON string
 *
 * @param {object | string} [params]
 * @return {string}
 */
function buildParams (params) {
  if (params === undefined) return params
  else if (typeof params === 'string') return params
  else if (typeof params === 'object' && params !== null) {
    const body = {}
    Object.keys(params).forEach(key => {
      body[key] = typeof params[key] === 'string'
        ? params[key]
        : JSON.stringify(params[key])
    })
    return qs.stringify(body)
  }
  else {
    throw new TypeError('params could only be string or object')
  }
}