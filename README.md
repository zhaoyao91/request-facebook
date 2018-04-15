# Request Facebook

Util function to help request facebook.

## Installation

```
npm i request-facebook
``` 

## Usage

```
const requestFacebook = require('request-facebook')

const firstPage = await requestFacebook({
  apiVersion: 'v2.12',
  accessToken: accessToken,
  path: `${adId}/insights`,
  query: {
    date_preset: 'lifetime',
    time_increment: 1,
    fields: 'spend,impressions'
  }
})

const secondPage = await requestFacebook({
  page: paging.next
})
```

## API

### requestFacebook

`async func(options) => data`

- options: `Object`
  - baseUrl?: `String` = https://graph.facebook.com
  - apiVersion: `String`
  - method?: `String` = GET
  - accessToken: `String`
  - path: `String`
  - query?: `Object`
  - body?: `String | Object`
  - page?: `String` - page url

Note: if `page` option is specified, all other options are ignored

## References:

- https://developers.facebook.com/docs/graph-api
- https://developers.facebook.com/tools/explorer

## License

MIT