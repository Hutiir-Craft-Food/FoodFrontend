import axios from 'axios'

const ApiClient = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default ApiClient

/**
 * difference between URL and URI:
 *  - URL: http://localhost/api/v1/blah
 *  - URI: /api/v1/blah
 *
 *
 * const url = "/v1/blah";
 * const params = {filer: "name", offset: 5, ...}
 * client.get(url, paramas);
 */
