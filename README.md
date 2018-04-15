# Request Facebook

Util function to help request facebook.

## Installation

```
npm i request-facebook
``` 

## Usage

```
const requestFacebook = require('request-facebook')

await data = requestFacebook({
  accessToken: accessToken,
  apiVersion: 'v2.12'
  path: `${adId}`,
  query: {
    fields: 'name,status'
  }
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
  - query?: `String | Object`
  - body?: `String | Object`

## References:

- https://developers.facebook.com/docs/graph-api
- https://developers.facebook.com/tools/explorer

## License

MIT